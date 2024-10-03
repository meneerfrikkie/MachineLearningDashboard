import React, { useState, useEffect, useRef } from 'react';
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
import { happyOutline, sadOutline } from 'ionicons/icons'; // Add some icons for visual feedback
import flexionVideo from '/videos/WristFlexion.mp4';
import extensionVideo from '/videos/WristExtension.mp4';
import eegSignalImage from '/images/EEGSignal.png';
import './InteractiveModel.css';

// Patient list for demonstration with their respective accuracies
const patients = [
    { id: 1, name: 'Patient 1', accuracy: 77 },
    { id: 2, name: 'Patient 2', accuracy: 81 },
    { id: 3, name: 'Patient 3', accuracy: 74 },
    { id: 4, name: 'Patient 4', accuracy: 76.67 },
    { id: 5, name: 'Patient 5', accuracy: 84.04 },
    // Add more patients here if needed
];

const WristPredictionPage: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
    const [predictionOutcome, setPredictionOutcome] = useState<string | null>(null);
    const [predictedVideo, setPredictedVideo] = useState<string | null>(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    // Video references for preloading
    const flexionVideoRef = useRef<HTMLVideoElement>(null);
    const extensionVideoRef = useRef<HTMLVideoElement>(null);

    // Handle patient selection
    const handleSelectPatient = (patientId: number) => {
        setSelectedPatient(patientId);
        setPredictionOutcome(null); // Clear any previous prediction result
        setPredictedVideo(null); // Clear previous video
        setButtonsDisabled(false); // Enable buttons when a patient is selected
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
            setPredictionOutcome('Correct! 🎉');
            setPredictedVideo(userChoice === correctMovement ? (userChoice === 'flexion' ? flexionVideo : extensionVideo) : null);
        } else {
            setPredictionOutcome('Incorrect 😔');
            setPredictedVideo(userChoice === 'flexion' ? extensionVideo : flexionVideo);
        }

        // Disable buttons while video is playing
        setButtonsDisabled(true);

        // Ensure buttons are re-enabled after the video is done playing or after a maximum of 10 seconds
        setTimeout(() => {
            setButtonsDisabled(false);
        }, 5000); // Fallback timeout of 10 seconds
    };

    // Handler for video end to re-enable buttons
    const handleVideoEnded = () => {
        setButtonsDisabled(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton autoHide={false}></IonMenuButton>
                    </IonButtons>
                    <IonTitle className="header-title">Interactive Model 🤖</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonRow>
                    {/* Mini Left Cover with Controls and EEG Image */}
                    <IonCol size="12" size-md="4" className="left-cover">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <IonCard className="patient-selection-card">
                                <IonCardHeader>
                                    <IonCardTitle>Select a Patient 🧑‍⚕️</IonCardTitle>
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
                                            <IonCardTitle>Model Accuracy 📊</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonText>
                                                Accuracy for {patients.find((p) => p.id === selectedPatient)?.name}:{" "}
                                                {patients.find((p) => p.id === selectedPatient)?.accuracy}%
                                            </IonText>
                                        </IonCardContent>
                                    </IonCard>

                                    {/* EEG Signal Image */}
                                    <IonCard className="eeg-image-card">
                                        <IonCardHeader>
                                            <IonCardTitle>EEG Signal 📈</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <img
                                                src={eegSignalImage}
                                                alt="EEG Signal"
                                                className="eeg-signal-image"
                                            />
                                        </IonCardContent>
                                    </IonCard>
                                </>
                            )}
                        </motion.div>
                    </IonCol>

                    {/* Right Cover Box with Output */}
                    <IonCol size="12" size-md="8" className="right-cover">
                        {selectedPatient && (
                            <>
                                {/* User Choice - Flexion or Extension */}
                                <motion.div
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <IonCard className="prediction-card">
                                        <IonCardHeader>
                                            <IonCardTitle>Make a Prediction 🤔</IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <IonRow>
                                                <IonCol size="6">
                                                    <IonButton
                                                        expand="block"
                                                        color="tertiary"
                                                        onClick={() => handlePrediction('flexion')}
                                                        disabled={buttonsDisabled}
                                                    >
                                                        Flexion 🖐️
                                                    </IonButton>
                                                </IonCol>
                                                <IonCol size="6">
                                                    <IonButton
                                                        expand="block"
                                                        color="secondary"
                                                        onClick={() => handlePrediction('extension')}
                                                        disabled={buttonsDisabled}
                                                    >
                                                        Extension ✊
                                                    </IonButton>
                                                </IonCol>
                                            </IonRow>
                                        </IonCardContent>
                                    </IonCard>
                                </motion.div>

                                {/* Prediction Outcome and Video */}
                                {predictionOutcome && (
                                    <motion.div
                                        className="prediction-outcome"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: [0.8, 1.2, 1], opacity: [0, 1] }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <IonCard className={`outcome-card ${predictionOutcome.includes('Correct') ? 'success' : 'error'}`}>
                                            <IonCardContent>
                                                <IonText>
                                                    <h2>{predictionOutcome}</h2>
                                                </IonText>
                                                {predictedVideo && (
                                                    <video
                                                        src={predictedVideo}
                                                        autoPlay
                                                        onEnded={handleVideoEnded}
                                                        muted
                                                        playsInline
                                                        className="prediction-video"
                                                        preload="auto" // Preload video for faster play
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
                    </IonCol>
                </IonRow>

                {/* Preloaded videos (hidden) */}
                <video ref={flexionVideoRef} src={flexionVideo} preload="auto" style={{ display: 'none' }} />
                <video ref={extensionVideoRef} src={extensionVideo} preload="auto" style={{ display: 'none' }} />
            </IonContent>
        </IonPage>
    );
};

export default WristPredictionPage;