import { handleInput } from "@/utils";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { number } from "yup";

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

    useEffect(() => {
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
    }, [placa, renavam, chassi, crv, dataEmissaoCrv, numeroViaCrv, codigoSegurancaCrv, anoFabricacao, anoModelo, quilometragem])


    return <Stack spacing={2}>
        <TextField value={placa} onChange={e => {setPlaca(e.target.value.toUpperCase())}} label="Placa" size="small"/>
        <TextField value={renavam} onChange={e => {setRenavam(e.target.value)}} label="Renavam" size="small"/>
        <TextField value={chassi} onChange={e => {setChassi(e.target.value)}} label="Chassi" size="small"/>
        <TextField value={crv} onChange={e => {setCrv(e.target.value)}} label="CRV" size="small"/>
        <DatePicker label="Data Emissao CRV" onChange={newDate => {setDataEmissaoCrv(newDate)}} />
        <TextField value={numeroViaCrv} onChange={e => handleInput(e.target.value, setNumeroViaCrv, number("Deve ser numero"))} label="Numero da Via CRV" size="small"/>
        <TextField value={codigoSegurancaCrv} onChange={e => {setCodigoSegurancaCrv(e.target.value)}} label="Codigo de Seguranca CRV" size="small"/>
        <TextField value={anoFabricacao} onChange={e => handleInput(e.target.value, setAnoFabricacao, number("Deve ser numero"))} label="Ano Fabricacao" size="small"/>
        <TextField value={anoModelo} onChange={e => handleInput(e.target.value, setAnoModelo, number("Deve ser numero"))} label="Ano Modelo" size="small"/>
        <TextField value={quilometragem} onChange={e => handleInput(e.target.value, setQuilometragem, number("Deve ser numero"))} label="Quilometragem" size="small"/>
    </Stack>
}

export default DadosVeiculo;