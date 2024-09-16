import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/react';
import { speedometerOutline, checkmarkCircleOutline, pulseOutline, statsChartOutline, clipboardOutline } from 'ionicons/icons';  // Import icons
import './Home.css';

const Home: React.FC = () => {
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

      </IonContent>
    </IonPage>
  );
};

export default Home;
