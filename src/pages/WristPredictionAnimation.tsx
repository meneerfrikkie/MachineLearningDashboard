import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { IonText, IonRow, IonCol, IonCardTitle, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
import { motion } from 'framer-motion';
import { IoHandLeft, IoHandLeftOutline } from 'react-icons/io5'; // Icons for wrist states
import { FaHandHolding } from "react-icons/fa";

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

  const getRotationAngle = (position: string) => {
    // Extended -> 90 degrees right; Flexed -> 180 degrees down
    return position === "Extended" ? -90 : 90;
  };

  const renderWristIcon = (position: string) => {
    // Change icon appearance based on position
    return position === "Extended" ? <FaHandHolding className="hand-icon" /> : <FaHandHolding className="hand-icon" />;
  };

  const isMatch = data[currentIndex]?.actual === data[currentIndex]?.predicted;

  return (
    <IonCard className="custom-card">
      <IonCardHeader className="card-header">
        <IonCardTitle>Live Model Prediction</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonRow className="prediction-row">
          <IonCol size="6">
            <motion.div
              className={`circle ${isMatch ? 'match' : 'mismatch'}`}
              animate={{ rotate: getRotationAngle(getWristPosition(data[currentIndex]?.actual)) }} // Rotate based on actual position
              transition={{ duration: 0.5 }}
            >
              {data[currentIndex] && renderWristIcon(getWristPosition(data[currentIndex].actual))}
            </motion.div>
            <IonText color="primary">
              <p>{data[currentIndex] && getWristPosition(data[currentIndex].actual)}</p>
            </IonText>
          </IonCol>

          <IonCol size="6">
            <motion.div
              className={`circle ${isMatch ? 'match' : 'mismatch'}`}
              animate={{ rotate: getRotationAngle(getWristPosition(data[currentIndex]?.predicted)) }} // Rotate based on predicted position
              transition={{ duration: 0.5 }}
            >
              {data[currentIndex] && renderWristIcon(getWristPosition(data[currentIndex].predicted))}
            </motion.div>
            <IonText color="success">
              <p>{data[currentIndex] && getWristPosition(data[currentIndex].predicted)}</p>
            </IonText>
          </IonCol>
        </IonRow>

        <div className="trial-info">
          <IonText className="ion-text-center">
            <p>Trial: {currentIndex + 1} / {data.length}</p>
          </IonText>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default WristPredictionAnimation;
