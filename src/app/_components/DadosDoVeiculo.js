import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";

const DadosVeiculo = ({ atpvData, updateAtpvData }) => {
    const [placa, setPlaca] = useState(atpvData.current.placa ?? "");
    const [renavam, setRenavam] = useState(atpvData.current.renavam ?? "");
    const [chassi, setChassi] = useState(atpvData.current.chassi ?? "");
    const [crv, setCrv] = useState(atpvData.current.crv ?? "");
    const [dataEmissaoCrv, setDataEmissaoCrv] = useState(atpvData.current.dataEmissaoCrv ?? null);
    const [numeroViaCrv, setNumeroViaCrv] = useState(atpvData.current.numeroViaCrv ?? "");
    const [codigoSegurancaCrv, setCodigoSegurancaCrv] = useState(atpvData.current.codigoSegurancaCrv ?? "");
    const [anoFabricacao, setAnoFabricacao] = useState(atpvData.current.anoFabricacao ?? "");
    const [anoModelo, setAnoModelo] = useState(atpvData.current.anoModelo ?? "");
    const [quilometragem, setQuilometragem] = useState(atpvData.current.quilometragem ?? "");

    updateAtpvData({
        placa: placa,
        renavam: renavam,
        chassi: chassi,
        crv: crv,
        dataEmissaoCrv: dayjs.isDayjs(dataEmissaoCrv) ? dataEmissaoCrv.format("DD/MM/YYYY") : dataEmissaoCrv,
        numeroViaCrv: numeroViaCrv,
        codigoSegurancaCrv: codigoSegurancaCrv,
        anoFabricacao: anoFabricacao,
        anoModelo: anoModelo,
        quilometragem: quilometragem,
    })

    return <Stack spacing={2}>
        <TextField value={placa} onChange={e => {setPlaca(e.target.value)}} label="Placa" size="small"/>
        <TextField value={renavam} onChange={e => {setRenavam(e.target.value)}} label="Renavam" size="small"/>
        <TextField value={chassi} onChange={e => {setChassi(e.target.value)}} label="Chassi" size="small"/>
        <TextField value={crv} onChange={e => {setCrv(e.target.value)}} label="CRV" size="small"/>
        <DatePicker label="Data Emissao CRV" onChange={newDate => {setDataEmissaoCrv(newDate)}} />
        <TextField value={numeroViaCrv} onChange={e => {setNumeroViaCrv(e.target.value)}} label="Numero da Via CRV" size="small"/>
        <TextField value={codigoSegurancaCrv} onChange={e => {setCodigoSegurancaCrv(e.target.value)}} label="Codigo de Seguranca CRV" size="small"/>
        <TextField value={anoFabricacao} onChange={e => {setAnoFabricacao(e.target.value)}} label="Ano Fabricacao" size="small"/>
        <TextField value={anoModelo} onChange={e => {setAnoModelo(e.target.value)}} label="Ano Modelo" size="small"/>
        <TextField value={quilometragem} onChange={e => {setQuilometragem(e.target.value)}} label="Quilometragem" size="small"/>
    </Stack>
}

export default DadosVeiculo;