import { MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const Vendedor = ({ atpvData, updateAtpvData }) => {
    const [tipoPessoa, setTipoPessoa] = useState(atpvData.current.vendedor.tipo ?? "")
    const [cpfCnpj, setCpfCnpj] = useState(atpvData.current.vendedor.cpfCnpj ?? "") // TODO: trocar por cpf ou cnpj dependendo to tipo de pessoa
    const [nome, setNome] = useState(atpvData.current.vendedor.nome ?? "")
    const [email, setEmail] = useState(atpvData.current.vendedor.email ?? "")
    const [cep, setCep] = useState(atpvData.current.vendedor.cep ?? "")
    const [endereco, setEndereco] = useState(atpvData.current.vendedor.endereco ?? "")
    const [numero, setNumero] = useState(atpvData.current.vendedor.numero ?? "")

    useEffect(() => {
        updateAtpvData({
            vendedor: {
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

    return <>
        <Select value={tipoPessoa} onChange={e => {setTipoPessoa(e.target.value)}} label="Tipo de Pessoa">
            <MenuItem value="F" >Fisica</MenuItem>
            <MenuItem value="J" >Juridica</MenuItem>
        </Select>
        <TextField value={cpfCnpj} onChange={e => {setCpfCnpj(e.target.value)}}label="CPF" />
        <TextField value={nome} onChange={e => {setNome(e.target.value)}}label="Nome" />
        <TextField value={email} onChange={e => {setEmail(e.target.value)}}label="Email" />
        <TextField value={cep} onChange={e => {setCep(e.target.value)}}label="CEP" />
        <TextField value={endereco} onChange={e => {setEndereco(e.target.value)}}label="Endereco" />
        <TextField value={numero} onChange={e => {setNumero(e.target.value)}}label="Numero" />
    </>
}

export default Vendedor;