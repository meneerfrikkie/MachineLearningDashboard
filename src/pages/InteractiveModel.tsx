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
import flexionGif from '/images/WristFlexion.gif'; // Replace with the correct path to your flexion GIF
import extensionGif from '/images/WristExtension.gif'; // Replace with the correct path to your extension GIF
import eegSignalImage from '/images/EEGSignal.png';
import './InteractiveModel.css';

// Patient list for demonstration with their respective accuracies
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

const WristPredictionPage: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
    const [predictionOutcome, setPredictionOutcome] = useState<string | null>(null);
    const [visibleGif, setVisibleGif] = useState<string | null>(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [processing, setProcessing] = useState(false);

    // Handle patient selection
    const handleSelectPatient = (patientId: number) => {
        setSelectedPatient(patientId);
        setPredictionOutcome(null); // Clear any previous prediction result
        setVisibleGif(null); // Clear the visibility of GIF
        setButtonsDisabled(false); // Enable buttons when a patient is selected
    };

    // Simulate a prediction outcome based on patient's accuracy
    const handlePrediction = (userChoice: 'flexion' | 'extension') => {
        if (selectedPatient === null) return;

        const patient = patients.find((p) => p.id === selectedPatient);
        if (!patient) return;

        // Show processing animation
        setProcessing(true);
        setPredictionOutcome(null);
        setVisibleGif(null);
        setButtonsDisabled(true);

        // Simulate processing delay
        setTimeout(() => {
            setProcessing(false);

            // Calculate if the prediction is correct based on the patient's accuracy
            const isCorrect = Math.random() * 100 < patient.accuracy;
            let outcomeGif: 'flexion' | 'extension';

            if (isCorrect) {
                setPredictionOutcome(`You expected wrist ${userChoice} and our prediction was... Correct! 🎉`);
                outcomeGif = userChoice; // Show the user's chosen movement when correct
            } else {
                setPredictionOutcome(`You expected wrist ${userChoice} but our prediction was... Incorrect 😔`);
                outcomeGif = userChoice === 'flexion' ? 'extension' : 'flexion'; // Show the opposite movement when incorrect
            }

            // Set the visible GIF
            setVisibleGif(outcomeGif);

            // Re-enable buttons after showing the result
            setTimeout(() => {
                setButtonsDisabled(false);
            }, 3000);
        }, 3000); // Processing animation for 3 seconds
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
                    {/* Mini Left Cover with Controls and EEG Image */}
                    <IonCol size="12" size-md="4" className="left-cover full-height">
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

                        {/* Display Selected Patient's Accuracy */}
                        <IonCard className="accuracy-card">
                            <IonCardHeader>
                                <IonCardTitle>Model Accuracy 📊</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonText>
                                    {selectedPatient !== null ? (
                                        `Accuracy for ${patients.find((p) => p.id === selectedPatient)?.name}: ${patients.find((p) => p.id === selectedPatient)?.accuracy
                                        }%`
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
                            <IonCardContent>
                                <img
                                    src={eegSignalImage}
                                    alt="EEG Signal"
                                    className="eeg-signal-image"
                                />
                            </IonCardContent>
                        </IonCard>
                    </IonCol>

                    {/* Right Cover Box with Output */}
                    {/* Right Cover Box with Output */}
                    <IonCol size="12" size-md="8" className="right-cover full-height">
                        {/* User Choice - Flexion or Extension */}
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
                                            src={visibleGif === 'flexion' ? flexionGif : extensionGif}
                                            alt={visibleGif === 'flexion' ? "Flexion Movement" : "Extension Movement"}
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