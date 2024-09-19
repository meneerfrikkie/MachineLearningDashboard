import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { homeOutline, statsChartOutline, pulseOutline } from 'ionicons/icons'; // Icons used in the menu
import './Menu.css'; // Import your custom CSS

const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle className="menu-title">Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="menu-list">
          <IonItem routerLink="/" lines="none" className="menu-item">
            <IonIcon slot="start" icon={homeOutline} className="menu-icon" />
            <IonLabel>Dashboard</IonLabel>
          </IonItem>

          <IonItem routerLink="/results" lines="none" className="menu-item">
            <IonIcon slot="start" icon={statsChartOutline} className="menu-icon" />
            <IonLabel>Results Table</IonLabel>
          </IonItem>

          <IonItem routerLink="/channels" lines="none" className="menu-item">
            <IonIcon slot="start" icon={pulseOutline} className="menu-icon" />
            <IonLabel>EEG Channels</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;