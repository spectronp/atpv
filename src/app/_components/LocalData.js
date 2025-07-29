import { getHelpText, getIsValid } from "@/utils";
import { Atpv } from "@/validation";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import z from "zod";

const LocalData = ({ atpvData, updateAtpvData }) => {
    const fetcher = (...args) => fetch(...args).then((r) => r.json());
    const { data, error, isLoading } = useSWR("https://servicodados.ibge.gov.br/api/v1/localidades/municipios", fetcher);
    const [dataCompra, setDataCompra] = useState(atpvData.current.dataVenda ? dayjs(atpvData.current.dataVenda, "DD/MM/YYYY") : null);
    const [valorVeiculo, setValorVeiculo] = useState(atpvData.current.valorVeiculo ?? 0);
    const [selectedUf, setSelectedUf] = useState(atpvData.current.uf ?? "");
    const [selectedCity, setSelectedCity] = useState(atpvData.current.cidade ?? "");
    const [validationResult, setValidationResult] = useState({})
    const cidades = useMemo(
        () => data ? data.map(city => ( {nome: city.nome, uf: city["regiao-imediata"]["regiao-intermediaria"]["UF"]["sigla"]} )) : null,
        [data]
    )

    const cidadesDaUf = useMemo(() => (
       data ? cidades.filter(city => city.uf == selectedUf) : []
    ), [selectedUf])

    useEffect(() => {
        const schema = Atpv.pick({
            valorVeiculo: true,
            uf: true,
            cidade: true,
        })
        const values = {
            valorVeiculo: valorVeiculo,
            uf: selectedUf,
            cidade: selectedCity,
        }
        const result = schema.safeParse(values)
        if(!result.success){
            setValidationResult(z.flattenError(result.error).fieldErrors)
        }
    }, [dataCompra, valorVeiculo, selectedUf, selectedCity])

    if(isLoading) return <div>Carregando...</div>
    if(error) {
        console.log(error)
        return <div>deu ruim</div>
    }

    const estadosBrasil = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];
    
    const handleUfChange = e => {
        setSelectedUf(e.target.value);
    }
    const handleCityChange = e => {
        setSelectedCity(e.target.value);
    }
    
    updateAtpvData({
        dataVenda: dataCompra ? dataCompra.format("DD/MM/YYYY") : null,
        valorVeiculo: valorVeiculo,
        uf: selectedUf,
        cidade: selectedCity,
    })
    
    return <>
        <InputLabel>Data da Venda</InputLabel>
       <DatePicker value={dataCompra} onChange={newData => {setDataCompra(newData)}} />  
       <TextField label="Valor do Veiculo" value={valorVeiculo} error={getIsValid("valorVeiculo", validationResult)} helperText={getHelpText("valorVeiculo", validationResult)} onChange={e => {setValorVeiculo(e.target.value)}}/>
       <InputLabel>Cidade/UF</InputLabel>
       <Select label="UF" value={selectedUf} onChange={handleUfChange}>
            {estadosBrasil.map(estado => <MenuItem value={estado}>{estado}</MenuItem>)}
       </Select>
        <Select value={selectedCity} label="Cidade" onChange={handleCityChange}>
            {cidadesDaUf.map(cidade => <MenuItem value={cidade.nome}>{cidade.nome}</MenuItem>)}
       </Select>
    </>
}

export default LocalData;
