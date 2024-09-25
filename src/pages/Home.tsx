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
  IonMenuButton,
  IonText,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import { speedometerOutline, checkmarkCircleOutline, pulseOutline, statsChartOutline, clipboardOutline, closeOutline, homeOutline } from 'ionicons/icons'; // Import icons
import './Home.css';
import WristPredictionAnimation from '../components/WristPredictionAnimation'; // Import the new component
import CircularChart from '../components/CircularChart';
import Menu from './Menu';

const Home: React.FC = () => {
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
      <Menu />

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
                <IonCard className="custom-card" style={{ height: '100%' }}>
                  <IonCardContent>
                    <CircularChart percentage={77.29} baseColor="#007BFF"/>
                  </IonCardContent>
                  <IonCardHeader className="card-header">
                    <IonCardTitle>Accuracy</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p className="metric-description">
                      Accuracy refers to the percentage of correct predictions out of all predictions made.
                    </p>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              {/* Metric 2: Precision */}
              <IonCol size="6" size-md="3">
                <IonCard className="custom-card" style={{ height: '100%' }}>
                  <IonCardContent>
                    <CircularChart percentage={78.29} baseColor="#007BFF"/>
                  </IonCardContent>
                  <IonCardHeader className="card-header">
                    <IonCardTitle>Precision</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p className="metric-description">
                      Precision is the percentage of true positive predictions among all positive predictions.
                    </p>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              {/* Metric 3: Recall */}
              <IonCol size="6" size-md="3">
                <IonCard className="custom-card" style={{ height: '100%' }}>
                  <IonCardContent>
                    <CircularChart percentage={77.23} baseColor="#007BFF"/>
                  </IonCardContent>
                  <IonCardHeader className="card-header">
                    <IonCardTitle>Recall</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p className="metric-description">
                      Recall is the percentage of true positive predictions among all actual positive instances.
                    </p>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              {/* Metric 4: F1 Score */}
              <IonCol size="6" size-md="3">
                <IonCard className="custom-card" style={{ height: '100%' }}>
                  <IonCardContent>
                    <CircularChart percentage={77.01} baseColor="#007BFF"/>
                  </IonCardContent>
                  <IonCardHeader className="card-header">
                    <IonCardTitle>F1 Score</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p className="metric-description">
                      The F1 score is the harmonic mean of precision and recall, providing a balance between the two.
                    </p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>

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