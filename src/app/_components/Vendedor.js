import { getHelpText, getIsValid, validate } from "@/utils";
import { Pessoa } from "@/validation";
import { MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import z from "zod";

const Vendedor = ({ atpvData, updateAtpvData }) => {
    const [tipoPessoa, setTipoPessoa] = useState(atpvData.current.vendedor.tipo ?? "")
    const [cpfCnpj, setCpfCnpj] = useState(atpvData.current.vendedor.cpfCnpj ?? "") // TODO: trocar por cpf ou cnpj dependendo to tipo de pessoa
    const [nome, setNome] = useState(atpvData.current.vendedor.nome ?? "")
    const [email, setEmail] = useState(atpvData.current.vendedor.email ?? "")
    const [cep, setCep] = useState(atpvData.current.vendedor.cep ?? "")
    const [endereco, setEndereco] = useState(atpvData.current.vendedor.endereco ?? "")
    const [numero, setNumero] = useState(atpvData.current.vendedor.numero ?? "")
    const [validationResult, setValidationResult] = useState({})

    useEffect(() => {
        const schema = Pessoa.pick({
            email: true,
            numero: true,
        })
        const values = {
            email: email,
            numero: numero,
        }
        const result = schema.safeParse(values)
        if(!result.success){
            setValidationResult(z.flattenError(result.error).fieldErrors)
        } else {
            setValidationResult({})
        }
    }, [email, numero])

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
            <MenuItem value="fisica" >Fisica</MenuItem>
            <MenuItem value="juridica" >Juridica</MenuItem>
        </Select>
        <TextField value={cpfCnpj} onChange={e => {setCpfCnpj(e.target.value)}} label="CPF/CNPJ" />
        <TextField value={nome} onChange={e => {setNome(e.target.value)}} label="Nome" />
        <TextField value={email} error={getIsValid("email", validationResult)} helperText={getHelpText("email", validationResult)} onChange={e => {setEmail(e.target.value)}} label="Email" />
        <TextField value={cep} onChange={e => {setCep(e.target.value)}}label="CEP" />
        <TextField value={endereco} onChange={e => {setEndereco(e.target.value)}}label="Endereco" />
        <TextField value={numero} error={getIsValid("numero", validationResult)} helperText={getHelpText("numero", validationResult)} onChange={e => validate(e.target.value, setNumero, Pessoa.shape.numero)} label="Numero" />
    </>
}

export default Vendedor;