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
} from '@ionic/react';
import './Home.css';
import '../theme/variables.css';
import WristPredictionAnimation from '../components/WristPredictionAnimation';
import { analyticsOutline, fingerPrintOutline, filterOutline } from 'ionicons/icons';
import CircularChart from '../components/CircularChart';
import { motion } from 'framer-motion';
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
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
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
                            <p className="metric-description">Support Vector Machine (SVM)</p>
                          </div>
                        </div>

                        {/* Feature Extraction */}
                        <div className="model-item playful-item">
                          <IonIcon icon={fingerPrintOutline} className="model-icon" />
                          <div className="model-info">
                            <h2 className="detail-heading">Feature Extraction 🔍</h2>
                            <p className="detail-description">Phase-Locked Value (PLV)</p>
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
                <IonCard className="custom-card playful-card">
                  <IonCardHeader className="card-header">
                    <IonCardTitle className="card-title">Live Model Prediction 🫴</IonCardTitle>
                  </IonCardHeader>
                  <WristPredictionAnimation />
                </IonCard>

                {/* EEG Channels Image and Description in one card */}
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
                        <img src="./images/ChannelPair3.png" alt="EEG Channels Used" className="eeg-image" />
                      </div>
                      <IonText>
                        The select EEG channels used in our top performing Machine Learning Model.
                      </IonText>
                    </IonCardContent>
                  </IonCard>
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
                            <CircularChart percentage={85.27} />
                          </IonCol>
                          <IonCol size="8" className="metric-description-col">
                            <IonCardTitle>Accuracy 🎯</IonCardTitle>
                            <IonText className="metric-description">
                              Accuracy refers to the percentage of correct predictions out of all predictions made.
                            </IonText>
                          </IonCol>
                        </IonRow>
                        <IonRow className="metric-row">
                          <IonCol size="4">
                            <CircularChart percentage={4.11} />
                          </IonCol>
                          <IonCol size="8" className="metric-description-col">
                            <IonCardTitle>Standard Deviation 🎯</IonCardTitle>
                            <IonText className="metric-description">
                              Standard deviation is a measure of the amount of variation or dispersion of a set of values.
                            </IonText>
                          </IonCol>
                        </IonRow>
                        <IonRow className="metric-row">
                          <IonCol size="4">
                            <CircularChart percentage={85.56} />
                          </IonCol>
                          <IonCol size="8" className="metric-description-col">
                            <IonCardTitle>Precision ⚙️</IonCardTitle>
                            <IonText className="metric-description">
                              Precision is the percentage of true positive predictions among all positive predictions.
                            </IonText>
                          </IonCol>
                        </IonRow>
                        <IonRow className="metric-row">
                          <IonCol size="4">
                            <CircularChart percentage={85.21} />
                          </IonCol>
                          <IonCol size="8" className="metric-description-col">
                            <IonCardTitle>Recall 🔍</IonCardTitle>
                            <IonText className="metric-description">
                              Recall is the percentage of true positive predictions among all actual positive instances.
                            </IonText>
                          </IonCol>
                        </IonRow>
                        <IonRow className="metric-row">
                          <IonCol size="4">
                            <CircularChart percentage={85.18} />
                          </IonCol>
                          <IonCol size="8" className="metric-description-col">
                            <IonCardTitle>F1 Score ⚖️</IonCardTitle>
                            <IonText className="metric-description">
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
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;