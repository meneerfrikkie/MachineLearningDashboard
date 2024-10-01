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
  IonButtons,
  IonMenuButton,
  IonText,
  IonList,
  IonLabel,
  IonItem,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import './Home.css';
import WristPredictionAnimation from '../components/WristPredictionAnimation';
import {analyticsOutline, fingerPrintOutline, filterOutline, constructOutline } from 'ionicons/icons'; // Icons used in the menu
import CircularChart from '../components/CircularChart';
import Menu from './Menu';

const Home: React.FC = () => {
  // Function to handle pull-to-refresh
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      event.detail.complete(); // Complete the refresher action
    }, 2000);
  };

  return (
    <>
      <Menu />
      <IonPage className="ion-page" id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle className="header-title">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          {/* Pull-to-refresh */}
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent pullingText="Pull to refresh" refreshingSpinner="bubbles" />
          </IonRefresher>

          <IonHeader collapse="condense">
            <IonToolbar className="condensed-toolbar">
              <IonTitle size="large" className="condensed-title">Dashboard</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonGrid>
            <IonRow>
          
              <IonCol size="12" size-md="6">
              <IonCard className="custom-card ml-model-card">
    <IonCardHeader className="card-header">
      <IonCardTitle>Machine Learning Model</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <IonList>
        {/* Classifier */}
        <IonItem lines="none" className="model-item">
          <IonIcon slot="start" icon={analyticsOutline} className="model-icon" />
          <IonLabel>
            <h2 className="detail-heading">Classifier</h2>
            <p className="detail-description">Support Vector Machine (SVM)</p>
          </IonLabel>
        </IonItem>

        {/* Feature Extraction */}
        <IonItem lines="none" className="model-item">
          <IonIcon slot="start" icon={fingerPrintOutline} className="model-icon" />
          <IonLabel>
            <h2 className="detail-heading">Feature Extraction</h2>
            <p className="detail-description">Principal Component Analysis (PCA)</p>
          </IonLabel>
        </IonItem>

        {/* Feature Selection */}
        <IonItem lines="none" className="model-item">
          <IonIcon slot="start" icon={filterOutline} className="model-icon" />
          <IonLabel>
            <h2 className="detail-heading">Feature Selection</h2>
            <p className="detail-description">Recursive Feature Elimination (RFE)</p>
          </IonLabel>
        </IonItem>

        {/* Hyperparameter Tuning */}
        <IonItem lines="none" className="model-item">
          <IonIcon slot="start" icon={constructOutline} className="model-icon" />
          <IonLabel>
            <h2 className="detail-heading">Hyperparameter Tuning</h2>
            <p className="detail-description">Grid Search with Cross Validation</p>
          </IonLabel>
        </IonItem>
      </IonList>
    </IonCardContent>
  </IonCard>

                {/* Wrist Prediction Animation */}
                <WristPredictionAnimation />
              </IonCol>

              {/* Model Metrics Card */}
              <IonCol size="12" size-md="6">
                <IonCard className="custom-card">
                  <IonCardHeader>
                    <IonCardTitle>Model Metrics</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p className="metric-description">
                      The model metrics provide an overview of the model's performance.
                    </p>
                    <IonGrid>
                      <IonRow className="metric-row">
                        <IonCol size="4">
                          <CircularChart percentage={77.29} />
                        </IonCol>
                        <IonCol size="8">
                          <IonCardTitle>Accuracy</IonCardTitle>
                          <p>Accuracy refers to the percentage of correct predictions out of all predictions made.</p>
                        </IonCol>
                      </IonRow>
                      <IonRow className="metric-row">
                        <IonCol size="4">
                          <CircularChart percentage={78.29} />
                        </IonCol>
                        <IonCol size="8">
                          <IonCardTitle>Precision</IonCardTitle>
                          <p>Precision is the percentage of true positive predictions among all positive predictions.</p>
                        </IonCol>
                      </IonRow>
                      <IonRow className="metric-row">
                        <IonCol size="4">
                          <CircularChart percentage={77.23} />
                        </IonCol>
                        <IonCol size="8">
                          <IonCardTitle>Recall</IonCardTitle>
                          <p>Recall is the percentage of true positive predictions among all actual positive instances.</p>
                        </IonCol>
                      </IonRow>
                      <IonRow className="metric-row">
                        <IonCol size="4">
                          <CircularChart percentage={77.01} />
                        </IonCol>
                        <IonCol size="8">
                          <IonCardTitle>F1 Score</IonCardTitle>
                          <p>The F1 score is the harmonic mean of precision and recall, providing a balance between the two.</p>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
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
                      <img src="./images/ChannelPair2.png" alt="EEG Channels Used" className="eeg-image" />
                    </div>
                    <IonText>
                      The metrics displayed are calculated using specific EEG channels. The channels used in this experiment include x, y, and z, which help capture relevant brain activity.
                    </IonText>
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