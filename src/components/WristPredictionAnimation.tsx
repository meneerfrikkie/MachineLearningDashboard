import React, { useState, useEffect } from 'react';
import { IonText, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import { motion } from 'framer-motion';
import './WristPredictionAnimation.css';

// Replace with actual image paths for wrist flexion/extension
import wristFlexionImage from '/images/WristFlexion.png';
import wristExtensionImage from '/images/WristExtention.png';

interface Patient {
  id: number;
  name: string;
  accuracy: number;
}

interface PredictionData {
  actual: string;
  predicted: string;
}

const patients: Patient[] = [
  { id: 0, name: 'Average Model', accuracy: 85.27 },
  { id: 1, name: 'Patient 1', accuracy: 77 },
  { id: 2, name: 'Patient 2', accuracy: 81 },
  { id: 3, name: 'Patient 3', accuracy: 74 },
  { id: 4, name: 'Patient 4', accuracy: 76.67 },
  { id: 5, name: 'Patient 5', accuracy: 84.04 },
  { id: 6, name: 'Patient 6', accuracy: 82.5 },
  { id: 7, name: 'Patient 7', accuracy: 76.5 },
  { id: 8, name: 'Patient 8', accuracy: 86.97 },
  { id: 9, name: 'Patient 9', accuracy: 81.26 },
  { id: 10, name: 'Patient 10', accuracy: 74 },
  { id: 11, name: 'Patient 11', accuracy: 72.26 },
  { id: 12, name: 'Patient 12', accuracy: 76 },
  { id: 13, name: 'Patient 13', accuracy: 78 },
  { id: 14, name: 'Patient 14', accuracy: 80.5 },
];

const FRAME_DURATION_MS = 5000;
const TOTAL_ENTRIES = 100;

// Utility function to generate an array of length `n` with all elements set to `value`
const generateArray = (n: number, value: number): number[] => Array(n).fill(value);

// Utility function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

// Utility function to generate prediction data based on accuracy
const generatePredictionData = (totalEntries: number, accuracy: number): PredictionData[] => {
  const actual = generateArray(totalEntries, 0).concat(generateArray(totalEntries, 1));
  const shuffledActual = shuffleArray(actual);
  const predicted = [...shuffledActual];

  const flipCount = Math.round(shuffledActual.length * (1 - accuracy / 100));
  const flipIndices = shuffleArray([...Array(shuffledActual.length).keys()]).slice(0, flipCount);

  flipIndices.forEach((index) => {
    predicted[index] = 1 - shuffledActual[index];
  });

  return shuffledActual.map((value, index) => ({
    actual: value.toString(),
    predicted: predicted[index].toString(),
  }));
};

const WristPredictionAnimation: React.FC = () => {
  const [data, setData] = useState<PredictionData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState<Patient>(patients[0]); // Default to Average Model

  useEffect(() => {
    // Generate data for the selected patient
    const generatedData = generatePredictionData(TOTAL_ENTRIES, selectedPatient.accuracy);
    setData(generatedData);

    if (generatedData.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % generatedData.length);
      }, FRAME_DURATION_MS); // Change frame every FRAME_DURATION_MS milliseconds

      return () => clearInterval(interval);
    }
  }, [selectedPatient]);

  const handlePatientChange = (patientId: number) => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      setCurrentIndex(0); // Reset the index to start fresh for the new patient
    }
  };

  const getWristPosition = (value: string): string => (parseInt(value) === 1 ? 'Extended' : 'Flexed');

  const renderWristImage = (position: string): string => {
    return position === 'Extended' ? wristExtensionImage : wristFlexionImage;
  };

  const isMatch = data[currentIndex]?.actual === data[currentIndex]?.predicted;

  return (
    <div>
      <div className="select-container" style={{ marginBottom: '20px' }}>
        <IonSelect value={selectedPatient.id} onIonChange={(e: CustomEvent) => handlePatientChange(e.detail.value)} interface="popover">
          {patients.map((patient) => (
            <IonSelectOption key={patient.id} value={patient.id}>
              {`${patient.name} (${patient.accuracy}%)`}
            </IonSelectOption>
          ))}
        </IonSelect>
      </div>
      <IonRow className="prediction-row" style={{ textAlign: 'center' }}>
        {/* Actual Movement (Always Green) */}
        <IonCol size="6">
          <div className="movement-section">
            <IonText style={{ marginBottom: '20px', display: 'block' }}>Actual Movement</IonText>
            <motion.div
              className="circle"
              style={{
                backgroundColor: 'green',
                display: 'inline-block',
                padding: '20px',
                borderRadius: '50%',
              }}
            >
              <img
                src={data[currentIndex] ? renderWristImage(getWristPosition(data[currentIndex].actual)) : ''}
                alt={getWristPosition(data[currentIndex]?.actual || '')}
                style={{ width: '100px', height: '100px' }}
              />
            </motion.div>
            <IonText color="primary">
              <p>{data[currentIndex] && getWristPosition(data[currentIndex].actual)}</p>
            </IonText>
          </div>
        </IonCol>

        {/* Predicted Movement (Green or Red) */}
        <IonCol size="6">
          <div className="movement-section">
            <IonText style={{ marginBottom: '20px', display: 'block' }}>Predicted Movement</IonText>
            <motion.div
              className="circle"
              style={{
                backgroundColor: isMatch ? 'green' : 'red',
                display: 'inline-block',
                padding: '20px',
                borderRadius: '50%',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={data[currentIndex] ? renderWristImage(getWristPosition(data[currentIndex].predicted)) : ''}
                alt={getWristPosition(data[currentIndex]?.predicted || '')}
                style={{ width: '100px', height: '100px' }}
              />
            </motion.div>
            <IonText color={isMatch ? 'success' : 'danger'}>
              <p>{data[currentIndex] && getWristPosition(data[currentIndex].predicted)}</p>
            </IonText>
          </div>
        </IonCol>
      </IonRow>

      {/* Flash animation when trial changes */}
      <motion.div
        className="trial-info"
        key={currentIndex}
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: [0.8, 1.2, 1], opacity: [0.5, 1] }}
        transition={{ duration: 0.5 }}
      >
        <IonText className="ion-text-center">
          <p>Trial: {currentIndex + 1} / {data.length}</p>
        </IonText>
      </motion.div>
    </div>
  );
};

export default WristPredictionAnimation;