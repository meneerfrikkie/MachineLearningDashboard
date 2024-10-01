import React, { useState } from 'react';
import {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonRow,
    IonCol,
    IonText,
    IonSelect,
    IonSelectOption,
    IonButtons,
    IonMenuButton,
} from '@ionic/react';
import { motion } from 'framer-motion';
import flexionVideo from '/videos/WristFlexion.mp4'; // Replace with the correct path to your mp4 file
import extensionVideo from '/videos/WristExtension.mp4'; // Replace with the correct path to your mp4 file
import './InteractiveModel.css';
import Menu from './Menu';

// Patient list for demonstration with their respective accuracies
const patients = [
    { id: 1, name: 'Patient A', accuracy: 85 },
    { id: 2, name: 'Patient B', accuracy: 78 },
    { id: 3, name: 'Patient C', accuracy: 92 },
    { id: 4, name: 'Patient D', accuracy: 88 },
];

const WristPredictionPage: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
    const [predictionOutcome, setPredictionOutcome] = useState<string | null>(null);
    const [predictedVideo, setPredictedVideo] = useState<string | null>(null);

    // Handle patient selection
    const handleSelectPatient = (patientId: number) => {
        setSelectedPatient(patientId);
        setPredictionOutcome(null); // Clear any previous prediction result
        setPredictedVideo(null); // Clear previous video
    };

    // Simulate a prediction outcome based on patient's accuracy
    const handlePrediction = (userChoice: 'flexion' | 'extension') => {
        if (selectedPatient === null) return;

        const patient = patients.find((p) => p.id === selectedPatient);
        if (!patient) return;

        // Calculate if the prediction is correct based on the patient's accuracy
        const isCorrect = Math.random() * 100 < patient.accuracy;
        const correctMovement = Math.random() > 0.5 ? 'flexion' : 'extension';

        if (isCorrect) {
            setPredictionOutcome('Correct!');
            setPredictedVideo(userChoice === correctMovement ? (userChoice === 'flexion' ? flexionVideo : extensionVideo) : null);
        } else {
            setPredictionOutcome('Incorrect!');
            setPredictedVideo(userChoice === 'flexion' ? extensionVideo : flexionVideo);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton autoHide={false}></IonMenuButton>
                    </IonButtons>
                    <IonTitle className="header-title">Interactive Model</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                <IonHeader collapse="condense">
                    <IonToolbar className="condensed-toolbar">
                        <IonTitle className="header-title">Interactive Model</IonTitle>
                    </IonToolbar>
                </IonHeader>

                {/* Patient Selection */}
                <IonCard className="patient-selection-card">
                    <IonCardHeader>
                        <IonCardTitle>Select a Patient</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonSelect
                            placeholder="Select Patient"
                            onIonChange={(e: CustomEvent) => handleSelectPatient(e.detail.value)}
                        >
                            {patients.map((patient) => (
                                <IonSelectOption key={patient.id} value={patient.id}>
                                    {patient.name}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonCardContent>
                </IonCard>

                {selectedPatient && (
                    <>
                        {/* Display Selected Patient's Accuracy */}
                        <IonCard className="accuracy-card">
                            <IonCardHeader>
                                <IonCardTitle>{`Accuracy for ${patients.find((p) => p.id === selectedPatient)?.name}`}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonText>
                                    Model Accuracy: {patients.find((p) => p.id === selectedPatient)?.accuracy}%
                                </IonText>
                            </IonCardContent>
                        </IonCard>

                        {/* User Choice - Flexion or Extension */}
                        <IonCard className="prediction-card">
                            <IonCardHeader>
                                <IonCardTitle>Make a Prediction</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonRow>
                                    <IonCol size="6">
                                        <IonButton
                                            expand="block"
                                            color="tertiary"
                                            onClick={() => handlePrediction('flexion')}
                                        >
                                            Flexion
                                        </IonButton>
                                    </IonCol>
                                    <IonCol size="6">
                                        <IonButton
                                            expand="block"
                                            color="secondary"
                                            onClick={() => handlePrediction('extension')}
                                        >
                                            Extension
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonCard>

                        {/* Prediction Outcome and Video */}
                        {predictionOutcome && (
                            <motion.div
                                className="prediction-outcome"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: [0.8, 1.2, 1], opacity: [0, 1] }}
                                transition={{ duration: 0.5 }}
                            >
                                <IonCard className={`outcome-card ${predictionOutcome === 'Correct!' ? 'success' : 'error'}`}>
                                    <IonCardContent>
                                        <IonText>
                                            <h2>{predictionOutcome}</h2>
                                        </IonText>
                                        {predictedVideo && (
                                            <video
                                                src={predictedVideo}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="prediction-video"
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </IonCardContent>
                                </IonCard>
                            </motion.div>
                        )}
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default WristPredictionPage;