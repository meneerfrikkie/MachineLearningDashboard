import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonModal, IonButton } from '@ionic/react';
import { speedometerOutline, checkmarkCircleOutline, pulseOutline, statsChartOutline, clipboardOutline } from 'ionicons/icons';  // Import icons
import Papa, { ParseResult } from 'papaparse';  // Import PapaParse and types
import { useState, useEffect } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [csvData, setCsvData] = useState<any[]>([]); // To store CSV data
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [modalContent, setModalContent] = useState(''); // Modal content

  // Updated fetchCsvData function
  const fetchCsvData = async () => {
    try {
      // Fetch the CSV file
      const response = await fetch('./data/ExperimentResultsSummary.csv');  // Ensure correct path to CSV file
      
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

  // Function to handle card click
  const handleCardClick = (metric: string) => {
    let content = '';
    switch (metric) {
      case 'Accuracy':
        content = 'Accuracy refers to the percentage of correct predictions out of all predictions made.';
        break;
      case 'Precision':
        content = 'Precision is the percentage of true positive predictions among all positive predictions.';
        break;
      case 'Recall':
        content = 'Recall is the percentage of true positive predictions among all actual positive instances.';
        break;
      case 'F1 Score':
        content = 'The F1 score is the harmonic mean of precision and recall, providing a balance between the two.';
        break;
      default:
        content = '';
    }
    setModalContent(content); // Set the modal content based on clicked metric
    setShowModal(true); 
  };

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
        {/* Grid layout for the tile cards */}
        <IonGrid>
          <IonRow>
            {/* Metric 1: Accuracy */}
            <IonCol size="6" size-md="3">
              <IonCard className="custom-card" onClick={() => handleCardClick('Accuracy')}>
                <IonCardHeader className="card-header">
                  <IonIcon icon={speedometerOutline} className="card-icon" />
                  <IonCardTitle>Accuracy</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <span className="card-metric">77.29%</span>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Metric 2: Precision */}
            <IonCol size="6" size-md="3">
              <IonCard className="custom-card" onClick={() => handleCardClick('Precision')}>
                <IonCardHeader className="card-header">
                  <IonIcon icon={checkmarkCircleOutline} className="card-icon" />
                  <IonCardTitle>Precision</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <span className="card-metric">78.29%</span>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Metric 3: Recall */}
            <IonCol size="6" size-md="3">
              <IonCard className="custom-card" onClick={() => handleCardClick('Recall')}>
                <IonCardHeader className="card-header">
                  <IonIcon icon={pulseOutline} className="card-icon" />
                  <IonCardTitle>Recall</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <span className="card-metric">77.23%</span>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Metric 4: F1 Score */}
            <IonCol size="6" size-md="3">
              <IonCard className="custom-card" onClick={() => handleCardClick('F1 Score')}>
                <IonCardHeader className="card-header">
                  <IonIcon icon={statsChartOutline} className="card-icon" />
                  <IonCardTitle>F1 Score</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <span className="card-metric">77.01%</span>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Modal for Metric Info */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Metric Information</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>{modalContent}</p>
            <IonButton expand="full" onClick={() => setShowModal(false)}>
              Close
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Display CSV data */}
        <IonGrid className="csv-table">
          <IonRow>
            <IonCol>
              <table className="csv-data-table">
                <thead>
                  <tr>
                    <th>Experiment Name</th>
                    <th>Mean Accuracy</th>
                    <th>Mean Precision</th>
                    <th>Mean Recall</th>
                    <th>Mean F1 Score</th>
                  </tr>
                </thead>
                <tbody>
                  {csvData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.ExperimentName}</td>
                      <td>{parseFloat(row.OverallMeanAccuracy).toFixed(2)}%</td>
                      <td>{parseFloat(row.OverallMeanPrecision).toFixed(2)}%</td>
                      <td>{parseFloat(row.OverallMeanRecall).toFixed(2)}%</td>
                      <td>{parseFloat(row.OverallMeanF1Score).toFixed(2)}%</td>
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
