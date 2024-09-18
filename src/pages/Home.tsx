import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonModal,
  IonButton,
  IonButtons,
  IonMenu,
  IonMenuButton,
  IonList,
  IonItem,
  IonText,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import { speedometerOutline, checkmarkCircleOutline, pulseOutline, statsChartOutline, clipboardOutline, closeOutline } from 'ionicons/icons'; // Import icons
import { useState } from 'react';
import './Home.css';
import WristPredictionAnimation from './WristPredictionAnimation'; // Import the new component

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [modalContent, setModalContent] = useState(''); // Modal content

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

  // Function to handle pull-to-refresh
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    // Simulate refreshing data (e.g., API call, update state)
    setTimeout(() => {
      event.detail.complete(); // Complete the refresher action
    }, 2000); // Simulated delay (e.g., fetching data)
  };

  return (
    <>
      {/* Side Menu */}
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem routerLink="/">Dashboard</IonItem>
            <IonItem routerLink="/results">Results Table</IonItem>
            <IonItem routerLink="/channels">EEG Channels</IonItem> {/* New Page Link */}
          </IonList>
        </IonContent>
      </IonMenu>

      <IonPage className="ion-page" id="main-content">
        {/* Main Header */}
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle className="header-title">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Collapsible Header when scrolling */}
        <IonContent fullscreen>

          {/* Pull-to-refresh */}
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent pullingText="Pull to refresh" refreshingSpinner="bubbles"></IonRefresherContent>
          </IonRefresher>

          <IonHeader collapse="condense">
            <IonToolbar className="condensed-toolbar">
              <IonTitle size="large" className="condensed-title">Dashboard</IonTitle>
            </IonToolbar>
          </IonHeader>
          
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
          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} className="custom-modal">
            <IonHeader>
              <IonToolbar className="modal-toolbar">
                <IonButtons slot="start">
                  <IonButton onClick={() => setShowModal(false)}>
                    <IonIcon icon={closeOutline} />
                  </IonButton>
                </IonButtons>
                <IonTitle className="modal-title">Metric Information</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding modal-content">
              <div className="modal-body">
                <p className="modal-text">{modalContent}</p>
              </div>
            </IonContent>
          </IonModal>

          <IonGrid>
            <IonRow>
              {/* Left Side: Wrist Animation Block */}
              <IonCol size="12" size-md="6">
                    <WristPredictionAnimation />
              </IonCol>

              {/* Right Side: EEG Channels Image and Description in one card */}
              <IonCol size="12" size-md="6">
                <IonCard className="custom-card">
                  <IonCardHeader className="card-header">
                    <IonCardTitle>EEG Channels Used</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="image-wrapper">
                      <img
                        src="./images/ChannelPair2.png"
                        alt="EEG Channels Used"
                        className="eeg-image"
                      />
                    </div>
                    <div className="custom-description-card">
                        <IonText style={{ textAlign: 'left' }}>
                          The metrics displayed are calculated using specific EEG channels.
                          The channels used in this experiment include x, y, and z, which help capture relevant brain activity.
                        </IonText>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>

        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;