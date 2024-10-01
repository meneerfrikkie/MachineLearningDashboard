import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { IonText, IonRow, IonCol, IonCardTitle, IonCard, IonCardHeader, IonCardContent, IonTitle } from '@ionic/react';
import { motion } from 'framer-motion';

// Replace with actual image paths for wrist flexion/extension
import wristFlexionImage from '/images/WristFlexion.png';
import wristExtensionImage from '/images/WristExtention.png';

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

  const renderWristImage = (position: string) => {
    // Use corresponding images for wrist positions
    return position === "Extended" ? wristExtensionImage : wristFlexionImage;
  };

  const isMatch = data[currentIndex]?.actual === data[currentIndex]?.predicted;

  return (
    <IonCard className="custom-card">
      <IonCardHeader className="card-header">
        <IonCardTitle>Live Model Prediction</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonRow className="prediction-row" style={{ textAlign: 'center' }}>
          {/* Actual Movement (Always Green) */}
          <IonCol size="6">
            <IonCardTitle style={{ marginBottom: '20px' }}>Actual Movement</IonCardTitle>
            <motion.div
              className="circle"
              style={{
                backgroundColor: 'green', // Always green for actual
                display: 'inline-block',
                padding: '20px',
                borderRadius: '50%',
              }}
            >
              <img
                src={data[currentIndex] ? renderWristImage(getWristPosition(data[currentIndex].actual)) : ''}
                alt={getWristPosition(data[currentIndex]?.actual)}
                style={{ width: '100px', height: '100px' }} // Adjust the size as needed
              />
            </motion.div>
            <IonCardTitle color="primary">
              <p>{data[currentIndex] && getWristPosition(data[currentIndex].actual)}</p>
            </IonCardTitle>
          </IonCol>

          {/* Predicted Movement (Green or Red) */}
          <IonCol size="6">
            <IonCardTitle style={{ marginBottom: '20px' }}>Predicted Movement</IonCardTitle>
            <motion.div
              className="circle"
              style={{
                backgroundColor: isMatch ? 'green' : 'red', // Green if it matches, red otherwise
                display: 'inline-block',
                padding: '20px',
                borderRadius: '50%',
              }}
              animate={{ rotate: [0, 360] }} // Example animation for predicted
              transition={{ duration: 0.5 }}
            >
              <img
                src={data[currentIndex] ? renderWristImage(getWristPosition(data[currentIndex].predicted)) : ''}
                alt={getWristPosition(data[currentIndex]?.predicted)}
                style={{ width: '100px', height: '100px' }} // Adjust the size as needed
              />
            </motion.div>
            <IonCardTitle color={isMatch ? 'success' : 'danger'}>
              <p>{data[currentIndex] && getWristPosition(data[currentIndex].predicted)}</p>
            </IonCardTitle>
          </IonCol>
        </IonRow>

        {/* Flash animation when trial changes */}
        <motion.div
          className="trial-info"
          key={currentIndex} // Key ensures animation runs on change
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: [0.8, 1.2, 1], opacity: [0.5, 1] }} // Flash effect
          transition={{ duration: 0.5 }}
        >
          <IonText className="ion-text-center">
            <p>Trial: {currentIndex + 1} / {data.length}</p>
          </IonText>
        </motion.div>
      </IonCardContent>
    </IonCard>
  );
};

export default WristPredictionAnimation;