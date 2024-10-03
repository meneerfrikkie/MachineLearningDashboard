import React from 'react';
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
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import './Home.css';
import '../theme/variables.css';
import WristPredictionAnimation from '../components/WristPredictionAnimation';
import { analyticsOutline, fingerPrintOutline, filterOutline, homeOutline, statsChartOutline, pulseOutline } from 'ionicons/icons';
import CircularChart from '../components/CircularChart';
import { motion } from 'framer-motion';

const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main-content" side="start" menuId="main-menu">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu 🍔</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem button routerLink="/home">
            <IonIcon slot="start" icon={homeOutline} />
            <IonLabel>Dashboard 📊</IonLabel>
          </IonItem>
          <IonItem button routerLink="/results">
            <IonIcon slot="start" icon={statsChartOutline} />
            <IonLabel>Results Table 📋</IonLabel>
          </IonItem>
          <IonItem button routerLink="/interactive-model">
            <IonIcon slot="start" icon={pulseOutline} />
            <IonLabel>Interactive Model 🤖</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

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
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>
            <IonTitle className="header-title">Dashboard 🎉</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          {/* Pull-to-refresh */}
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent pullingText="Pull to refresh" refreshingSpinner="bubbles" />
          </IonRefresher>

          <IonGrid>
            <IonRow>
              <IonCol size="12" size-md="6">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <IonCard className="custom-card playful-card">
                    <IonCardHeader className="card-header">
                      <IonCardTitle className="card-title">Machine Learning Model 🤓</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <div className="model-details">
                        {/* Classifier */}
                        <div className="model-item playful-item">
                          <IonIcon icon={analyticsOutline} className="model-icon" />
                          <div className="model-info">
                            <h2 className="detail-heading">Classifier 🎯</h2>
                            <p className="detail-description">Linear Discriminant Analysis (LDA)</p>
                          </div>
                        </div>

                        {/* Feature Extraction */}
                        <div className="model-item playful-item">
                          <IonIcon icon={fingerPrintOutline} className="model-icon" />
                          <div className="model-info">
                            <h2 className="detail-heading">Feature Extraction 🔍</h2>
                            <p className="detail-description">Instantaneous Phase Difference (IPD)</p>
                          </div>
                        </div>

                        {/* Feature Selection */}
                        <div className="model-item playful-item">
                          <IonIcon icon={filterOutline} className="model-icon" />
                          <div className="model-info">
                            <h2 className="detail-heading">Feature Selection 🔬</h2>
                            <p className="detail-description">Analysis of Variance (ANOVA)</p>
                          </div>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </motion.div>

                {/* Wrist Prediction Animation */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <WristPredictionAnimation />
                </motion.div>
              </IonCol>

              {/* Model Metrics Card */}
              <IonCol size="12" size-md="6">
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <IonCard className="custom-card playful-card">
                    <IonCardHeader className="card-header">
                      <IonCardTitle className="card-title">Model Metrics 📈</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText className="metric-description">
                        Interested in some cool stats about our model's performance? Check out the metrics below!
                      </IonText>
                      <IonGrid>
                        <IonRow className="metric-row">
                          <IonCol size="4">
                            <CircularChart percentage={77.29} />
                          </IonCol>
                          <IonCol size="8">
                            <IonCardTitle>Accuracy 🎯</IonCardTitle>
                            <IonText>
                              Accuracy refers to the percentage of correct predictions out of all predictions made.
                            </IonText>
                          </IonCol>
                        </IonRow>
                        <IonRow className="metric-row">
                          <IonCol size="4">
                            <CircularChart percentage={78.29} />
                          </IonCol>
                          <IonCol size="8">
                            <IonCardTitle>Precision ⚙️</IonCardTitle>
                            <IonText>
                              Precision is the percentage of true positive predictions among all positive predictions.
                            </IonText>
                          </IonCol>
                        </IonRow>
                        <IonRow className="metric-row">
                          <IonCol size="4">
                            <CircularChart percentage={77.23} />
                          </IonCol>
                          <IonCol size="8">
                            <IonCardTitle>Recall 🔍</IonCardTitle>
                            <IonText>
                              Recall is the percentage of true positive predictions among all actual positive instances.
                            </IonText>
                          </IonCol>
                        </IonRow>
                        <IonRow className="metric-row">
                          <IonCol size="4">
                            <CircularChart percentage={77.01} />
                          </IonCol>
                          <IonCol size="8">
                            <IonCardTitle>F1 Score ⚖️</IonCardTitle>
                            <IonText>
                              The F1 score is the harmonic mean of precision and recall, providing a balance between the two.
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </motion.div>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonGrid>
            <IonRow>
              {/* Right Side: EEG Channels Image and Description in one card */}
              <IonCol size="12" size-md="6">
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <IonCard className="custom-card playful-card">
                    <IonCardHeader className="card-header">
                      <IonCardTitle className="card-title">EEG Channels Used 🧠</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <div className="image-wrapper">
                        <img src="./images/ChannelPair2.png" alt="EEG Channels Used" className="eeg-image" />
                      </div>
                      <IonText>
                        We use various EEG channels to understand brain activity better. Channels x, y, and z help us
                        capture the coolest brain waves!
                      </IonText>
                    </IonCardContent>
                  </IonCard>
                </motion.div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;