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
import Menu from './Menu';

const ResultsTable: React.FC = () => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('ExperimentResultsSummary'); // Default table

  // Function to fetch and parse CSV data based on selected table
  const fetchCsvData = async (fileName: string) => {
    try {
      const response = await fetch(`./data/${fileName}.csv`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const reader = response.body?.getReader();
      const result = await reader?.read();
      if (!result || !result.value) throw new Error('Failed to read CSV data.');
      const decoder = new TextDecoder('utf-8');
      const csvText = decoder.decode(result.value);
      Papa.parse(csvText, {
        header: true,
        complete: (results: ParseResult<any>) => {
          setCsvData(results.data);
        },
      });
    } catch (error) {
      console.error('Error fetching or parsing CSV:', error);
    }
  };

  useEffect(() => {
    // Fetch CSV data based on selected table
    fetchCsvData(selectedTable);
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
                onIonChange={(e: CustomEvent) => setSelectedTable(e.detail.value)} // Type the event here
              >
                <IonSelectOption value="ExperimentResultsSummary">
                  Experiment Results Summary
                </IonSelectOption>
                <IonSelectOption value="OtherTable1">Other Table 1</IonSelectOption>
                <IonSelectOption value="OtherTable2">Other Table 2</IonSelectOption>
              </IonSelect>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Table Display */}
          <IonGrid className="csv-table">
            <IonRow>
              <IonCol>
                <table className="csv-data-table">
                  <thead>
                    <tr>
                      <th>Model</th>
                      <th>Feature Selection</th>
                      <th>Feature Extraction</th>
                      <th>Channel Pair Set</th>
                      <th>Sliding Window Used</th>
                      <th>Reduced Pairs Greater Than</th>
                      <th>Mean Accuracy</th>
                      <th>Mean Precision</th>
                      <th>Mean Recall</th>
                      <th>Mean F1 Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.map((row, index) => (
                      <tr key={index}>
                        <td data-label="Model">{row.Model}</td>
                        <td data-label="Feature Selection">{row.FeatureSelection}</td>
                        <td data-label="Feature Extraction">{row.FeatureExtraction}</td>
                        <td data-label="Channel Pair Set">{row.ChannelPair}</td>
                        <td data-label="Sliding Window Used">{row.SlidingWindow}</td>
                        <td data-label="Reduced Pairs Greater Than">{row.ReducedPairsGreaterThan}</td>
                        <td data-label="Mean Accuracy">
                          {parseFloat(row.OverallMeanAccuracy).toFixed(2)}%
                        </td>
                        <td data-label="Mean Precision">
                          {parseFloat(row.OverallMeanPrecision).toFixed(2)}%
                        </td>
                        <td data-label="Mean Recall">
                          {parseFloat(row.OverallMeanRecall).toFixed(2)}%
                        </td>
                        <td data-label="Mean F1 Score">
                          {parseFloat(row.OverallMeanF1Score).toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ResultsTable;