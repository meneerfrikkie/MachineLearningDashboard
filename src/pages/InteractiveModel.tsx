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
    const [visibleGif, setVisibleGif] = useState<'flexion' | 'extension' | null>(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [processing, setProcessing] = useState(false);

    // Handle patient selection
    const handleSelectPatient = (patientId: number) => {
        setSelectedPatient(patientId);
        setPredictionOutcome(null); // Clear any previous prediction result
        setVisibleGif(null); // Clear the visibility of GIFs
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
            const correctMovement = Math.random() > 0.5 ? 'flexion' : 'extension';

            if (isCorrect) {
                setPredictionOutcome('Correct! 🎉');
                setVisibleGif(userChoice === correctMovement ? userChoice : correctMovement);
            } else {
                setPredictionOutcome('Incorrect 😔');
                setVisibleGif(userChoice === 'flexion' ? 'extension' : 'flexion');
            }

            // Re-enable buttons after showing the result
            setTimeout(() => {
                setButtonsDisabled(false);
            }, 5000);
        }, 3000); // Processing animation for 3 seconds
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
                                        `Accuracy for ${patients.find((p) => p.id === selectedPatient)?.name}: ${
                                            patients.find((p) => p.id === selectedPatient)?.accuracy
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
                    <IonCol size="12" size-md="8" className="right-cover">
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
                                    <IonText className="processing-text">Processing...</IonText>
                                </IonCardContent>
                            </IonCard>
                        )}

                        {/* Prediction Outcome and GIFs */}
                        {!processing && (
                            <IonCard className={`outcome-card ${predictionOutcome?.includes('Correct') ? 'success' : 'error'}`}>
                                <IonCardContent>
                                    <IonText>
                                        <h2>{predictionOutcome ? predictionOutcome : "Make a prediction to see the outcome"}</h2>
                                    </IonText>
                                    <div className="gif-container">
                                        <img
                                            src={flexionGif}
                                            alt="Flexion Movement"
                                            className={`prediction-gif ${visibleGif === 'flexion' ? 'visible' : 'hidden'}`}
                                        />
                                        <img
                                            src={extensionGif}
                                            alt="Extension Movement"
                                            className={`prediction-gif ${visibleGif === 'extension' ? 'visible' : 'hidden'}`}
                                        />
                                    </div>
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