import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonMenu, IonMenuButton, IonButtons, IonList, IonItem, IonText } from '@ionic/react';
import './Home.css'; // Assuming you'll have custom CSS for styling
import Menu from './Menu'; // Import the Menu component

const ChannelImages: React.FC = () => {
  return (
    <>
      {/* Side Menu */}
      <Menu/>

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
                <IonCard className="custom-card">
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
                <IonCard className="custom-card">
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
                <IonCard className="custom-card">
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
