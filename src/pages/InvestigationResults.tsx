import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonMenuButton,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import Papa, { ParseResult } from 'papaparse';
import './Home.css';
import './InvestigationResults.css';
import Menu from './Menu';

const ResultsTable: React.FC = () => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null); // Selected table

  // Manually input the paths to your CSV files here
  const csvFiles = [
    { label: 'Experiment Results Summary', path: './data/ExperimentResultsSummary.csv' },
    { label: 'Getting Ready Results Summary', path: './data/GettingReadyResultsSummary.csv' },
    { label: 'Cross Validation Results', path: './data/CrossValidationResults.csv' },
  ];

  // Function to fetch and parse CSV data based on the path provided
  const fetchCsvData = async (filePath: string) => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const reader = response.body?.getReader();
      const result = await reader?.read();
      if (!result || !result.value) throw new Error('Failed to read CSV data.');
      const decoder = new TextDecoder('utf-8');
      const csvText = decoder.decode(result.value);
      Papa.parse(csvText, {
        header: true,
        complete: (results: ParseResult<any>) => {
          if (results.data.length > 0) {
            // Set headers based on CSV keys
            setHeaders(Object.keys(results.data[0]));
          }
          setCsvData(results.data);
        },
      });
    } catch (error) {
      console.error('Error fetching or parsing CSV:', error);
    }
  };

  useEffect(() => {
    // Fetch CSV data based on selected table
    if (selectedTable) {
      const selectedFile = csvFiles.find((file) => file.label === selectedTable);
      if (selectedFile) {
        fetchCsvData(selectedFile.path);
      }
    }
  }, [selectedTable]);

  return (
    <>
      {/* Side Menu */}
      <Menu />

      <IonPage className="ion-page" id="main-content">
        {/* Main Header */}
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle className="header-title">Results</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Collapsible Header when scrolling */}
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar className="condensed-toolbar">
              <IonTitle size="large" className="condensed-title">
                Results
              </IonTitle>
            </IonToolbar>
          </IonHeader>

          {/* Dropdown to Select Table */}
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonSelect
                  value={selectedTable}
                  placeholder="Select Table"
                  onIonChange={(e: CustomEvent) => setSelectedTable(e.detail.value)}
                >
                  {csvFiles.map((file, index) => (
                    <IonSelectOption key={index} value={file.label}>
                      {file.label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Table Display */}
          <IonGrid className="csv-table">
            <IonRow>
              <IonCol>
                {headers.length > 0 && (
                  <table className="csv-data-table">
                    <thead>
                      <tr>
                        {headers.map((header) => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.map((row, index) => (
                        <tr key={index}>
                          {headers.map((header) => (
                            <td key={header} data-label={header}>
                              {row[header] !== undefined ? row[header] : 'N/A'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ResultsTable;