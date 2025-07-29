import { getHelpText, getIsValid } from "@/utils";
import { Atpv } from "@/validation";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import z from "zod";

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
    const [validationResult, setValidationResult] = useState({})

    useEffect(() => {
        const schema = Atpv.pick({
            anoFabricacao: true,
            anoModelo: true,
            quilometragem: true,
        })
        const values = {
            anoFabricacao: anoFabricacao,
            anoModelo: anoModelo,
            quilometragem: quilometragem,
        }

        const result = schema.safeParse(values)
        if(!result.success){
            setValidationResult(z.flattenError(result.error).fieldErrors)
        } else {
            setValidationResult({})
        }
    }, [anoFabricacao, anoModelo, quilometragem])

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
        <TextField value={anoFabricacao} onChange={e => {setAnoFabricacao(e.target.value)}} error={getIsValid("anoFabricacao", validationResult)} helperText={getHelpText("anoFabricacao", validationResult)} label="Ano Fabricacao" size="small"/>
        <TextField value={anoModelo} onChange={e => {setAnoModelo(e.target.value)}} error={getIsValid("anoModelo", validationResult)} helperText={getHelpText("anoModelo", validationResult)} label="Ano Modelo" size="small"/>
        <TextField value={quilometragem} onChange={e => {setQuilometragem(e.target.value)}} error={getIsValid("quilometragem", validationResult)} helperText={getHelpText("quilometragem", validationResult)} label="Quilometragem" size="small"/>
    </Stack>
}

export default DadosVeiculo;