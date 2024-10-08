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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import Papa, { ParseResult } from 'papaparse';
import './Home.css';
import './InvestigationResults.css';
import Menu from './Menu';

const ResultsTable: React.FC = () => {
  // Manually input the paths to your CSV files here
  const csvFiles = [
    { label: 'Getting Ready Results', path: './data/GettingReadyResultsSummary.csv' },
    { label: 'Holding Movement Results', path: './data/HoldingResultsSummary.csv' },
    { label: 'Getting Ready + Holding Movement Results', path: './data/GettingReadyHoldingSummary.csv' },
  ];

  const [csvData, setCsvData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]); // Store the filtered data
  const [headers, setHeaders] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>(csvFiles[0].label); // Auto-select the first table
  const [filterCriteria, setFilterCriteria] = useState<{ [key: string]: string }>({}); // Store filter values per column

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
            setHeaders(Object.keys(results.data[0])); // Set headers based on CSV keys
            setCsvData(results.data);
            setFilteredData(results.data); // Initialize filtered data to be the same as csvData
          }
        },
      });
    } catch (error) {
      console.error('Error fetching or parsing CSV:', error);
    }
  };

  // Update filtered data when filter criteria or CSV data changes
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...csvData]; // Start with the full data set
      Object.keys(filterCriteria).forEach((header) => {
        if (filterCriteria[header]) {
          // Filter the data based on user input
          filtered = filtered.filter((row) =>
            String(row[header])
              .toLowerCase()
              .includes(filterCriteria[header].toLowerCase())
          );
        }
      });
      setFilteredData(filtered); // Update filtered data
    };

    applyFilters();
  }, [filterCriteria, csvData]);

  useEffect(() => {
    // Fetch CSV data based on selected table
    if (selectedTable) {
      const selectedFile = csvFiles.find((file) => file.label === selectedTable);
      if (selectedFile) {
        fetchCsvData(selectedFile.path);
      }
    }
  }, [selectedTable]);

  // Helper function to get unique values for a given column to display in the filter dropdown
  const getUniqueColumnValues = (column: string) => {
    const values = csvData.map((row) => row[column]).filter((value, index, self) => self.indexOf(value) === index);
    return values;
  };

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

          {/* Card to Select Table */}
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <IonCard className="table-selection-card">
                  <IonCardHeader>
                    <IonCardTitle>Select a Table 📝</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {/* Select Table */}
                    <IonSelect
                      value={selectedTable}
                      placeholder="Select Table"
                      onIonChange={(e: CustomEvent) => setSelectedTable(e.detail.value)}
                      interfaceOptions={{
                        header: 'Select Table',
                      }}
                    >
                      {csvFiles.map((file, index) => (
                        <IonSelectOption key={index} value={file.label}>
                          {file.label}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                    </IonCardContent>
                    <IonCardHeader>
                    <IonCardTitle>Filter a Table 📝</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>

                    {/* Filtering Inputs for First 4 Columns */}
                    {headers.length > 0 && (
                      <IonRow>
                        {headers.slice(0, 4).map((header) => (
                          <IonCol key={header} size="12" size-md="3">
                            <IonLabel>{header}</IonLabel>
                            <IonSelect
                              placeholder={`Filter by ${header}`}
                              onIonChange={(e: CustomEvent) => setFilterCriteria({ ...filterCriteria, [header]: e.detail.value! })}
                              value={filterCriteria[header] || ''}
                            >
                              <IonSelectOption value="">All</IonSelectOption>
                              {getUniqueColumnValues(header).map((value, index) => (
                                <IonSelectOption key={index} value={value}>
                                  {value}
                                </IonSelectOption>
                              ))}
                            </IonSelect>
                          </IonCol>
                        ))}
                      </IonRow>
                    )}
                  </IonCardContent>
                </IonCard>
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
                      {filteredData.map((row, index) => (
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