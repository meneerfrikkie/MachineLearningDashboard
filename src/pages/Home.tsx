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
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import './Home.css';
import '../theme/variables.css';
import WristPredictionAnimation from '../components/WristPredictionAnimation';
import { analyticsOutline, fingerPrintOutline, filterOutline } from 'ionicons/icons';
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
        <IonHeader className='ion-header'>
          <IonToolbar className='ion-toolbar'>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
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
              <IonTitle className="header-title">Dashboard</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonGrid>
            <IonRow>

              <IonCol size="12" size-md="6">
                <IonCard className="custom-card">
                  <IonCardHeader className="card-header">
                    <IonCardTitle className="card-title">Machine Learning Model</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="model-details">
                      {/* Classifier */}
                      <div className="model-item">
                        <IonIcon icon={analyticsOutline} className="model-icon" />
                        <div className="model-info">
                          <h2 className="detail-heading">Classifier</h2>
                          <p className="detail-description">Linear Discriminant Analysis (LDA)</p>
                        </div>
                      </div>

                      {/* Feature Extraction */}
                      <div className="model-item">
                        <IonIcon icon={fingerPrintOutline} className="model-icon" />
                        <div className="model-info">
                          <h2 className="detail-heading">Feature Extraction</h2>
                          <p className="detail-description">Instantaneous Phase Difference (IPD)</p>
                        </div>
                      </div>

                      {/* Feature Selection */}
                      <div className="model-item">
                        <IonIcon icon={filterOutline} className="model-icon" />
                        <div className="model-info">
                          <h2 className="detail-heading">Feature Selection</h2>
                          <p className="detail-description">Analysis of Variance (ANOVA)</p>
                        </div>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>

                {/* Wrist Prediction Animation */}
                <WristPredictionAnimation />
              </IonCol>

              {/* Model Metrics Card */}
              <IonCol size="12" size-md="6">
                <IonCard className="custom-card">
                  <IonCardHeader className="card-header">
                    <IonCardTitle className="card-title">Model Metrics</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonText className="metric-description">
                      The model metrics provide an overview of the model's performance.
                    </IonText>
                    <IonGrid>
                      <IonRow className="metric-row">
                        <IonCol size="4">
                          <CircularChart percentage={77.29} />
                        </IonCol>
                        <IonCol size="8">
                          <IonCardTitle>Accuracy</IonCardTitle>
                          <IonText>Accuracy refers to the percentage of correct predictions out of all predictions made.</IonText>
                        </IonCol>
                      </IonRow>
                      <IonRow className="metric-row">
                        <IonCol size="4">
                          <CircularChart percentage={78.29} />
                        </IonCol>
                        <IonCol size="8">
                          <IonCardTitle>Precision</IonCardTitle>
                          <IonText>Precision is the percentage of true positive predictions among all positive predictions.</IonText>
                        </IonCol>
                      </IonRow>
                      <IonRow className="metric-row">
                        <IonCol size="4">
                          <CircularChart percentage={77.23} />
                        </IonCol>
                        <IonCol size="8">
                          <IonCardTitle>Recall</IonCardTitle>
                          <IonText>Recall is the percentage of true positive predictions among all actual positive instances.</IonText>
                        </IonCol>
                      </IonRow>
                      <IonRow className="metric-row">
                        <IonCol size="4">
                          <CircularChart percentage={77.01} />
                        </IonCol>
                        <IonCol size="8">
                          <IonCardTitle>F1 Score</IonCardTitle>
                          <IonText>The F1 score is the harmonic mean of precision and recall, providing a balance between the two.</IonText>
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
              {/* Left Side*/}

              {/* Right Side: EEG Channels Image and Description in one card */}
              <IonCol size="12" size-md="6">
                <IonCard className="custom-card">
                  <IonCardHeader className="card-header">
                    <IonCardTitle className="card-title">EEG Channels Used</IonCardTitle>
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
