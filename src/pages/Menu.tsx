import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { homeOutline, statsChartOutline, pulseOutline , easelOutline} from 'ionicons/icons';
import './Menu.css';

const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main-content" side="start" type="overlay">
      <IonHeader>
        <IonToolbar className="menu-toolbar">
          <IonTitle className="menu-title">Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="menu-list">
          <IonItem routerLink="/" lines="none" className="menu-item" detail={false}>
            <IonIcon slot="start" icon={homeOutline} className="menu-icon" />
            <IonLabel>Dashboard</IonLabel>
          </IonItem>

          <IonItem routerLink="/interactive-model" lines="none" className="menu-item" detail={false}>
            <IonIcon slot="start" icon={easelOutline} className="menu-icon" />
            <IonLabel>Interactive Model</IonLabel>
          </IonItem>

          <IonItem routerLink="/results" lines="none" className="menu-item" detail={false}>
            <IonIcon slot="start" icon={statsChartOutline} className="menu-icon" />
            <IonLabel>Results Table</IonLabel>
          </IonItem>

          <IonItem routerLink="/channels" lines="none" className="menu-item" detail={false}>
            <IonIcon slot="start" icon={pulseOutline} className="menu-icon" />
            <IonLabel>EEG Channels</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;