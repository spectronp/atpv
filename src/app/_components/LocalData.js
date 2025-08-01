import { validate } from "@/utils";
import { Atpv } from "@/validation";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

const LocalData = ({ atpvData, updateAtpvData }) => {
    const fetcher = (...args) => fetch(...args).then((r) => r.json());
    const { data, error, isLoading } = useSWR("https://servicodados.ibge.gov.br/api/v1/localidades/municipios", fetcher);
    const [dataCompra, setDataCompra] = useState(atpvData.current.dataVenda ? dayjs(atpvData.current.dataVenda, "DD/MM/YYYY") : null);
    const [valorVeiculo, setValorVeiculo] = useState(atpvData.current.valorVeiculo ?? "");
    const [selectedUf, setSelectedUf] = useState(atpvData.current.uf ?? "");
    const [selectedCity, setSelectedCity] = useState(atpvData.current.cidade ?? "");
    const cidades = useMemo(
        () => data ? data.map(city => ( {nome: city.nome, uf: city["regiao-imediata"]["regiao-intermediaria"]["UF"]["sigla"]} )) : null,
        [data]
    )

    const cidadesDaUf = useMemo(() => (
       data ? cidades.filter(city => city.uf == selectedUf) : []
    ), [selectedUf])

    useEffect(() => {
        updateAtpvData({
            dataVenda: dataCompra ? dataCompra.format("DD/MM/YYYY") : null,
            valorVeiculo: valorVeiculo,
            uf: selectedUf,
            cidade: selectedCity,
        })
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
   
        
    return <>
        <InputLabel>Data da Venda</InputLabel>
       <DatePicker value={dataCompra} onChange={newData => {setDataCompra(newData)}} />  
       <TextField label="Valor do Veiculo" value={valorVeiculo} onChange={e => validate(e.target.value, setValorVeiculo, Atpv.shape.valorVeiculo)}/>
       <InputLabel>Cidade/UF</InputLabel>
       <Select label="UF" value={selectedUf} onChange={e => {setSelectedUf(e.target.value)}}>
            {estadosBrasil.map(estado => <MenuItem value={estado}>{estado}</MenuItem>)}
       </Select>
        <Select value={selectedCity} label="Cidade" onChange={e => {setSelectedCity(e.target.value)}}>
            {cidadesDaUf.map(cidade => <MenuItem value={cidade.nome}>{cidade.nome}</MenuItem>)}
       </Select>
    </>
}

export default LocalData;
