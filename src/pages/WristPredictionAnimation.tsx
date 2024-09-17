import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonRow, IonCol } from '@ionic/react';
import { motion } from 'framer-motion';

interface PredictionData {
  actual: string;
  predicted: string;
}

const WristPredictionAnimation: React.FC = () => {
  const [data, setData] = useState<PredictionData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Load and parse the CSV file
    Papa.parse<PredictionData>('/data/WristPredictionsModel.csv', {
      header: true,
      download: true,
      complete: (result) => {
        setData(result.data);
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
      }
    });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
    }, 5000); // Change frame every 5 seconds

    return () => clearInterval(interval);
  }, [data]);

  const getWristPosition = (value: string) => parseInt(value) === 1 ? "Extended" : "Flexed";

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Wrist Position Prediction</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonRow>
          <IonCol size="6">
            <IonCard className="ion-text-center">
              <IonCardHeader>
                <IonCardTitle>Actual</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <motion.div
                  className="animation-circle actual-circle"
                  animate={{ y: parseInt(data[currentIndex]?.actual) === 1 ? -20 : 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <IonText color="primary">
                  <p>{data[currentIndex] && getWristPosition(data[currentIndex].actual)}</p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="6">
            <IonCard className="ion-text-center">
              <IonCardHeader>
                <IonCardTitle>Predicted</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <motion.div
                  className="animation-circle predicted-circle"
                  animate={{ y: parseInt(data[currentIndex]?.predicted) === 1 ? -20 : 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <IonText color="success">
                  <p>{data[currentIndex] && getWristPosition(data[currentIndex].predicted)}</p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonText className="ion-text-center">
          <p>
            Frame: {currentIndex + 1} / {data.length}
          </p>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default WristPredictionAnimation;
