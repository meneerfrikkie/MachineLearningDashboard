import React, { useState, useEffect } from 'react';
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

// Import GIFs for light and dark modes
import flexionGifLight from '/images/Flexion.gif'; // Light mode Flexion GIF
import extensionGifLight from '/images/Extention.gif'; // Light mode Extension GIF
import flexionGifDark from '/images/FlexionWhite.gif'; // Dark mode Flexion GIF
import extensionGifDark from '/images/ExtentionWhite.gif'; // Dark mode Extension GIF

import './InteractiveModel.css';

// Random EEG signal images for flexion and extension
const flexionEEGImages = [
    '/images/WF/Trial1_Channel1.png',
    '/images/WF/Trial1_Channel2.png',
    // Add more WF images
];

const extensionEEGImages = [
    '/images/WE/Trial1_Channel1.png',
    '/images/WE/Trial1_Channel2.png',
    // Add more WE images
];

// Patient list for demonstration
const patients = [
    { id: 1, name: 'Patient 1', accuracy: 78.53 },
    { id: 2, name: 'Patient 2', accuracy: 90.50 },
    { id: 3, name: 'Patient 3', accuracy: 84.02 },
    { id: 4, name: 'Patient 4', accuracy: 77.22 },
    { id: 5, name: 'Patient 5', accuracy: 91.21 },
    { id: 6, name: 'Patient 6', accuracy: 87.48 },
    { id: 7, name: 'Patient 7', accuracy: 87.01 },
    { id: 8, name: 'Patient 8', accuracy: 86.43 },
    { id: 9, name: 'Patient 9', accuracy: 89.58 },
    { id: 10, name: 'Patient 10', accuracy: 82.52 },
    { id: 11, name: 'Patient 11', accuracy: 89.89 },
    { id: 12, name: 'Patient 12', accuracy: 84.49 },
    { id: 13, name: 'Patient 13', accuracy: 82.99 },
    { id: 14, name: 'Patient 14', accuracy: 86.01 },
];

// Function to randomly choose an EEG image from a list
const getRandomEEGImage = (images: string[]) => {
    return images[Math.floor(Math.random() * images.length)];
};

const WristPredictionPage: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
    const [predictionOutcome, setPredictionOutcome] = useState<string | null>(null);
    const [visibleGif, setVisibleGif] = useState<string | null>(null);
    const [visibleEEGImage, setVisibleEEGImage] = useState<string | null>(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Detect dark mode preference
    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMediaQuery.matches);

        // Event listener to update when dark mode preference changes
        const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        darkModeMediaQuery.addEventListener('change', handleChange);

        return () => {
            darkModeMediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    // Handle patient selection
    const handleSelectPatient = (patientId: number) => {
        setSelectedPatient(patientId);
        setPredictionOutcome(null);
        setVisibleGif(null);
        setVisibleEEGImage(null); // Clear EEG image
        setButtonsDisabled(false);
    };

    // Simulate prediction and select a random EEG image
    const handlePrediction = (userChoice: 'flexion' | 'extension') => {
        if (selectedPatient === null) return;

        const patient = patients.find((p) => p.id === selectedPatient);
        if (!patient) return;

        setProcessing(true);
        setPredictionOutcome(null);
        setVisibleGif(null);
        setVisibleEEGImage(null); // Clear previous EEG image
        setButtonsDisabled(true);

        setTimeout(() => {
            setProcessing(false);
            const isCorrect = Math.random() * 100 < patient.accuracy;
            let outcomeGif: 'flexion' | 'extension';
            let eegImage: string;

            if (isCorrect) {
                setPredictionOutcome(`You expected wrist ${userChoice} and our prediction was... Correct! 🎉`);
                outcomeGif = userChoice; // Show user's choice GIF
                eegImage = userChoice === 'flexion'
                    ? getRandomEEGImage(flexionEEGImages)
                    : getRandomEEGImage(extensionEEGImages); // Choose random EEG
            } else {
                setPredictionOutcome(`You expected wrist ${userChoice} but our prediction was... Incorrect 😔`);
                outcomeGif = userChoice === 'flexion' ? 'extension' : 'flexion'; // Show opposite GIF
                eegImage = userChoice === 'flexion'
                    ? getRandomEEGImage(extensionEEGImages)
                    : getRandomEEGImage(flexionEEGImages); // Choose opposite EEG
            }

            // Use dark or light mode GIFs based on the mode
            const gifToShow = isDarkMode
                ? outcomeGif === 'flexion' ? flexionGifDark : extensionGifDark
                : outcomeGif === 'flexion' ? flexionGifLight : extensionGifLight;

            setVisibleGif(gifToShow);
            setVisibleEEGImage(eegImage); // Set random EEG image

            setTimeout(() => {
                setButtonsDisabled(false);
            }, 2000);
        }, 3000); // Simulate 3 seconds of processing
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

            <IonContent className="ion-padding interactive-model-content">
                <IonRow className="full-height">
                    {/* Left Side - Patient Selection, Accuracy, EEG Image */}
                    <IonCol size="12" size-md="4" className="left-cover full-height">
                        {/* Patient Selection */}
                        <IonCard className="patient-selection-card">
                            <IonCardHeader>
                                <IonCardTitle>Select a Patient 🧑‍⚕️</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonSelect
                                    placeholder="Select Patient"
                                    onIonChange={(e: CustomEvent) => handleSelectPatient(e.detail.value)}
                                    value={selectedPatient}
                                >
                                    {patients.map((patient) => (
                                        <IonSelectOption key={patient.id} value={patient.id}>
                                            {patient.name}
                                        </IonSelectOption>
                                    ))}
                                </IonSelect>
                            </IonCardContent>
                        </IonCard>

                        {/* Model Accuracy */}
                        <IonCard className="accuracy-card">
                            <IonCardHeader>
                                <IonCardTitle>Model Accuracy 📊</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonText>
                                    {selectedPatient !== null ? (
                                        `Accuracy for ${patients.find((p) => p.id === selectedPatient)?.name}: ${patients.find((p) => p.id === selectedPatient)?.accuracy}%`
                                    ) : (
                                        "Select a patient to see the accuracy"
                                    )}
                                </IonText>
                            </IonCardContent>
                        </IonCard>

                        {/* EEG Signal Image */}
                        <IonCard className="eeg-image-card">
                            <IonCardHeader>
                                <IonCardTitle>EEG Signal 📈</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent className={visibleEEGImage ? 'eeg-content-centered' : 'eeg-content-left'}>
                                {visibleEEGImage ? (
                                    <>
                                        <img src={visibleEEGImage} alt="EEG Signal" className="eeg-signal-image" />
                                        <IonText className="centered-text">
                                            {`EEG Signal of the Patient Performing Wrist ${visibleGif === flexionGifLight || visibleGif === flexionGifDark ? 'Flexion' : 'Extension'}`}
                                        </IonText>
                                    </>
                                ) : (
                                    <IonText style={{ textAlign: 'left' }}>Make a prediction to see the EEG signal</IonText>
                                )}
                            </IonCardContent>
                        </IonCard>
                    </IonCol>

                    {/* Right Side - Prediction and Outcome */}
                    <IonCol size="12" size-md="8" className="right-cover full-height">
                        {/* Prediction Options */}
                        <IonCard className="prediction-card">
                            <IonCardHeader>
                                <IonCardTitle>Make a Prediction 🤔</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonText> Select a wrist movement button below to make the prediction. </IonText>
                                <IonRow>
                                    <IonCol size="6">
                                        <IonButton
                                            expand="block"
                                            color="tertiary"
                                            onClick={() => handlePrediction('flexion')}
                                            disabled={buttonsDisabled || selectedPatient === null}
                                            className="prediction-button"
                                        >
                                            Flexion 🖐️
                                        </IonButton>
                                    </IonCol>
                                    <IonCol size="6">
                                        <IonButton
                                            expand="block"
                                            color="secondary"
                                            onClick={() => handlePrediction('extension')}
                                            disabled={buttonsDisabled || selectedPatient === null}
                                            className="prediction-button"
                                        >
                                            Extension ✊
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonCard>

                        {/* Processing Animation */}
                        {processing && (
                            <IonCard className="processing-card">
                                <IonCardContent>
                                    <IonText className="processing-text">Processing... 🤖</IonText>
                                </IonCardContent>
                            </IonCard>
                        )}

                        {/* Prediction Outcome and GIF */}
                        {!processing && (
                            <IonCard className={`outcome-card ${predictionOutcome?.includes('Correct') ? 'success' : 'error'}`}>
                                <IonCardContent>
                                    <IonText className={`outcome-text ${predictionOutcome?.includes('Correct') ? 'success' : 'error'}`}>
                                        <h2>{predictionOutcome ? predictionOutcome : "Make a prediction to see the outcome"}</h2>
                                    </IonText>
                                    {visibleGif && (
                                        <img
                                            src={visibleGif}
                                            alt={visibleGif === flexionGifLight || visibleGif === flexionGifDark ? "Flexion Movement" : "Extension Movement"}
                                            className="prediction-gif"
                                        />
                                    )}
                                </IonCardContent>
                            </IonCard>
                        )}
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default WristPredictionPage;