import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { homeOutline, statsChartOutline, pulseOutline, easelOutline } from 'ionicons/icons';
import './Menu.css';

const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main-content" side="start" menuId="main-menu">
      <IonHeader className="menu-header">
        <IonToolbar>
          <IonTitle className="menu-title">Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="menu-content">
        <IonList>
          <IonItem button routerLink="/home" className="menu-item">
            <IonIcon slot="start" icon={homeOutline} className="menu-icon" />
            <IonLabel className="menu-label">Dashboard</IonLabel>
          </IonItem>
          <IonItem button routerLink="/results" className="menu-item">
            <IonIcon slot="start" icon={statsChartOutline} className="menu-icon" />
            <IonLabel className="menu-label">Results Table</IonLabel>
          </IonItem>
          <IonItem button routerLink="/interactive-model" className="menu-item">
            <IonIcon slot="start" icon={pulseOutline} className="menu-icon" />
            <IonLabel className="menu-label">Interactive Model</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
