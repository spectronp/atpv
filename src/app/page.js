'use client';

import { Button, Step, StepButton, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import TipoDeRegistro from "./_components/TipoDeRegistro";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [atpvData, setAtpvData] = useState({
    tipoRegistro: null,
  });
 
  const updateAtpvData = (newData) => {
    setAtpvData({...atpvData, ...newData});
    handleNext();
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  }

  const renderStep = () => {
    switch(currentStep){
      case 0:
        return <TipoDeRegistro updateAtpvData={updateAtpvData} handleNext={handleNext}/>
      case 1:
        console.log(atpvData);
        return <div>page 2</div>
      case 2:
        return <div></div>
      case 3:
        return <div></div>
      case 4:
        return <div></div>
      case 5:
        return <div></div>
    }
  }

  return <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stepper activeStep={currentStep}>
        <Step key={0}>
          <StepLabel >Tipo de Registro</StepLabel>
        </Step>
        <Step key={1}>
          <StepLabel >Local/Data</StepLabel>
        </Step>
        <Step key={2}>
          <StepLabel >Dados do Veiculo</StepLabel>
        </Step>
        <Step key={3}>
          <StepLabel >Proprietario atual</StepLabel>
        </Step>
        <Step key={4}>
          <StepLabel >Comprador</StepLabel>
        </Step>
        <Step key={5}>
          <StepLabel >Finalizacao</StepLabel>
        </Step>
      </Stepper>
      {renderStep()}
      <div>
        <Button onClick={handleBack} >Voltar</Button>
        <Button onClick={handleNext} >Proximo</Button>
      </div>
  <LocalizationProvider />
}
