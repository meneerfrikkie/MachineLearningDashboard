import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonMenu, IonMenuButton, IonButtons, IonList, IonItem, IonText } from '@ionic/react';
import './Home.css'; // Assuming you'll have custom CSS for styling

const ChannelImages: React.FC = () => {
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
            <IonTitle className="header-title">EEG Channel Pairs</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">EEG Channel Pairs</IonTitle>
            </IonToolbar>
          </IonHeader>

          {/* Grid layout for channel images and descriptions */}
          <IonGrid>
            <IonRow>
              {/* Column 1: Channel Pair 1 */}
              <IonCol size="12" size-md="4">
                <IonCard className="custom-card" style={{ backgroundColor: '#ffffff' }}>
                  <IonCardHeader>
                    <IonCardTitle>Channel Pair 1</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <img
                      src="./images/ChannelPair1.png"
                      alt="Channel Pair 1"
                      className="channel-image"
                    />
                    <IonText className="description">
                      Description for Channel Pair 1.
                    </IonText>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              {/* Column 2: Channel Pair 2 */}
              <IonCol size="12" size-md="4">
                <IonCard className="custom-card" style={{ backgroundColor: '#ffffff' }}>
                  <IonCardHeader>
                    <IonCardTitle>Channel Pair 2</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <img
                      src="./images/ChannelPair2Smaller.png"
                      alt="Channel Pair 2"
                      className="channel-image"
                    />
                    <IonText className="description">
                      Description for Channel Pair 2.
                    </IonText>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              {/* Column 3: Channel Pair 3 */}
              <IonCol size="12" size-md="4">
                <IonCard className="custom-card" style={{ backgroundColor: '#ffffff' }}>
                  <IonCardHeader>
                    <IonCardTitle>Channel Pair 3</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <img
                      src="./images/ChannelPair3.png"
                      alt="Channel Pair 3"
                      className="channel-image"
                    />
                    <IonText className="description">
                      Description for Channel Pair 3.
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

export default ChannelImages;
