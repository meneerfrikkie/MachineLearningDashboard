import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/react';
import { speedometerOutline, checkmarkCircleOutline, pulseOutline, statsChartOutline, clipboardOutline } from 'ionicons/icons';  // Import icons
import Papa, { ParseResult } from 'papaparse';  // Import PapaParse and types
import { useState, useEffect } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [csvData, setCsvData] = useState<any[]>([]); // To store CSV data

  // Updated fetchCsvData function
  const fetchCsvData = async () => {
    try {
      // Fetch the CSV file
      const response = await fetch('./ExperimentResultsSummary.csv');  // Ensure correct path to CSV file
      
      // Check if the response is okay (status 200)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Read the response stream
      const reader = response.body?.getReader();
      const result = await reader?.read();

      // Check if result exists and has data
      if (!result || !result.value) {
        throw new Error("Failed to read CSV data.");
      }

      // Decode the response as a string
      const decoder = new TextDecoder('utf-8');
      const csvText = decoder.decode(result.value);

      // Log the CSV text to verify it's loaded correctly
      console.log('CSV Text Loaded:', csvText);

      // Parse the CSV text using PapaParse
      Papa.parse(csvText, {
        header: true, // Ensure headers are processed
        complete: (results: ParseResult<any>) => {
          // Log the parsed data to verify correct parsing
          console.log('Parsed CSV Data:', results.data);

          // Set CSV data in state
          setCsvData(results.data);
        }
      });
    } catch (error) {
      // Log any errors encountered during the fetch process
      console.error('Error fetching or parsing CSV:', error);
    }
  };

  // Use Effect to fetch CSV data when the component mounts
  useEffect(() => {
    fetchCsvData();
  }, []); // Empty dependency array means this effect runs once, when the component mounts

  return (
    <IonPage className='ion-page'>
      {/* Main Header */}
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <div className="header-content">
            <IonIcon icon={clipboardOutline} className="header-icon" />  {/* Icon or Logo */}
            <IonTitle className="header-title">Dashboard</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>

      {/* Collapsible Header when scrolling */}
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar className="condensed-toolbar">
            <IonTitle size="large" className="condensed-title">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Grid layout for the tile cards */}
        <IonGrid>
          <IonRow>
            {/* Metric 1 */}
            <IonCol size="6" size-md="3">
              <IonCard className="custom-card">
                <IonCardHeader className="card-header">
                  <IonIcon icon={speedometerOutline} className="card-icon" />
                  <IonCardTitle>Accuracy</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <span className="card-metric">92.5%</span>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Metric 2 */}
            <IonCol size="6" size-md="3">
              <IonCard className="custom-card">
                <IonCardHeader className="card-header">
                  <IonIcon icon={checkmarkCircleOutline} className="card-icon" />
                  <IonCardTitle>Precision</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <span className="card-metric">89.7%</span>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Metric 3 */}
            <IonCol size="6" size-md="3">
              <IonCard className="custom-card">
                <IonCardHeader className="card-header">
                  <IonIcon icon={pulseOutline} className="card-icon" />
                  <IonCardTitle>Recall</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <span className="card-metric">87.3%</span>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Metric 4 */}
            <IonCol size="6" size-md="3">
              <IonCard className="custom-card">
                <IonCardHeader className="card-header">
                  <IonIcon icon={statsChartOutline} className="card-icon" />
                  <IonCardTitle>F1 Score</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <span className="card-metric">88.5%</span>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Display CSV data */}
        <IonGrid className="csv-table">
          <IonRow>
            <IonCol>
              <h2>Experiment Results</h2>
              <table className="csv-data-table">
                <thead>
                  <tr>
                    <th>Experiment Name</th>
                    <th>Overall Mean Accuracy</th>
                    <th>Max Accuracy</th>
                    <th>Min Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {csvData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.ExperimentName}</td>
                      <td>{parseFloat(row.OverallMeanAccuracy).toFixed(2)}%</td>
                      <td>{parseFloat(row.MaxAccuracy).toFixed(2)}%</td>
                      <td>{parseFloat(row.MinAccuracy).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Home;
