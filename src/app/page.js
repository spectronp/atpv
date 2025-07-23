'use client';

import { Button, Step, StepButton, StepLabel, Stepper } from "@mui/material";
import { useRef, useState } from "react";
import TipoDeRegistro from "./_components/TipoDeRegistro";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LocalData from "./_components/LocalData";
import DadosVeiculo from "./_components/DadosDoVeiculo";
import Pessoa from "./_components/Pessoa";
import _ from "lodash";
import Vendedor from "./_components/Vendedor";
import Comprador from "./_components/Comprador";
import Finalizacao from "./_components/Finalizacao";


export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const atpvPessoa = {
    tipo: null,
    nome: null,
    cpfCnpj: null,
    email: null,
    cep: null,
    endereco: null,
    numero: null,
  }
  const atpvData = useRef({
    tipoRegistro: null,
    dataVenda: null,
    valorVeiculo: null,
    cidade: null,
    uf: null,
    placa: null,
    renavam: null,
    chassi: null,
    crv: null,
    dataEmissaoCrv: null,
    numeroViaCrv: null,
    codigoSegurancaCrv: null,
    anoFabricacao: null,
    anoModelo: null,
    quilometragem: null,
    comprador: {...atpvPessoa},
    vendedor: {...atpvPessoa},
  });
 
  const updateAtpvData = (newData) => {
    _.merge(atpvData.current, newData)
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
        return <LocalData atpvData={atpvData} updateAtpvData={updateAtpvData} />
      case 2:
        return <DadosVeiculo atpvData={atpvData} updateAtpvData={updateAtpvData}/>
      case 3:
        return <Vendedor atpvData={atpvData}  updateAtpvData={updateAtpvData} />
      case 4:
        return <Comprador atpvData={atpvData}  updateAtpvData={updateAtpvData} />
      case 5:
        return <Finalizacao atpvData={atpvData}/>
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
  </LocalizationProvider>
}
