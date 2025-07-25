import { MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const Pessoa = ({ tipo, atpvData, updateAtpvData }) => {
    const [tipoPessoa, setTipoPessoa] = useState(atpvData.current[tipo].tipo ?? "")
    const [cpfCnpj, setCpfCnpj] = useState(atpvData.current[tipo].cpfCnpj ?? "") // TODO: trocar por cpf ou cnpj dependendo to tipo de pessoa
    const [nome, setNome] = useState(atpvData.current[tipo].nome ?? "")
    const [email, setEmail] = useState(atpvData.current[tipo].email ?? "")
    const [cep, setCep] = useState(atpvData.current[tipo].cep ?? "")
    const [endereco, setEndereco] = useState(atpvData.current[tipo].endereco ?? "")
    const [numero, setNumero] = useState(atpvData.current[tipo].numero ?? "")
    
    useEffect(() => {
        console.log("pessoa useEffect")
        updateAtpvData({
            [tipo]: {
                tipo: tipoPessoa,
                cpfCnpj,
                nome,
                email,
                cep,
                endereco,
                numero,
            },
        });
    }, [tipoPessoa, cpfCnpj, nome, email, cep, endereco, numero]);
    console.log('render pessoa')
    return <>
        <Select key={tipo + 'tipo'} value={tipoPessoa} onChange={e => {setTipoPessoa(e.target.value)}} label="Tipo de Pessoa">
            <MenuItem value="dfwef" >Fisica</MenuItem>
            <MenuItem value="fewfw" >Juridica</MenuItem>
        </Select>
        <TextField key={tipo + 'cpfcnpj'} value={cpfCnpj} onChange={e => {setCpfCnpj(e.target.value)}}label="CPF/CNPJ" />
        <TextField key={tipo + 'nome'} value={nome} onChange={e => {setNome(e.target.value)}}label="Nome" />
        <TextField key={tipo + 'email'} value={email} onChange={e => {setEmail(e.target.value)}}label="Email" />
        <TextField key={tipo + 'cep'} value={cep} onChange={e => {setCep(e.target.value)}}label="CEP" />
        <TextField key={tipo + 'endereco'} value={endereco} onChange={e => {setEndereco(e.target.value)}}label="Endereco" />
        <TextField key={tipo + 'numero'} value={numero} onChange={e => {setNumero(e.target.value)}}label="Numero" />
    </>
}

export default Pessoa;