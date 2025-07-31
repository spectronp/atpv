import { getHelpText, getIsValid, validate } from "@/utils";
import { Pessoa } from "@/validation";
import { MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import z from "zod";

const Comprador = ({ atpvData, updateAtpvData }) => {
    const [tipoPessoa, setTipoPessoa] = useState(atpvData.current.comprador.tipo ?? "")
    const [cpfCnpj, setCpfCnpj] = useState(atpvData.current.comprador.cpfCnpj ?? "") // TODO: trocar por cpf ou cnpj dependendo to tipo de pessoa
    const [nome, setNome] = useState(atpvData.current.comprador.nome ?? "")
    const [email, setEmail] = useState(atpvData.current.comprador.email ?? "")
    const [cep, setCep] = useState(atpvData.current.comprador.cep ?? "")
    const [endereco, setEndereco] = useState(atpvData.current.comprador.endereco ?? "")
    const [numero, setNumero] = useState(atpvData.current.comprador.numero ?? "")
    const [validationResult, setValidationResult] = useState({})

    useEffect(() => {
        updateAtpvData({
            comprador: {
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

    useEffect(() => {
        const schema = z.object({
            email: z.union([z.literal(""), z.email()]),
        })
        const values = {
            email: email,
        }
        const result = schema.safeParse(values)
        if(!result.success){
            setValidationResult(z.flattenError(result.error).fieldErrors)
        } else {
            setValidationResult({})
        }
    }, [email])

    return <>
        <Select value={tipoPessoa} onChange={e => {setTipoPessoa(e.target.value)}} label="Tipo de Pessoa">
            <MenuItem value="fisica" >Fisica</MenuItem>
            <MenuItem value="juridica" >Juridica</MenuItem>
        </Select>
        <TextField value={cpfCnpj} onChange={e => validate(e.target.value, setCpfCnpj, z.coerce.number("Deve ser numero"))} label="CPF/CNPJ" />
        <TextField value={nome} onChange={e => {setNome(e.target.value)}}label="Nome" />
        <TextField value={email} error={getIsValid("email", validationResult)} helperText={getHelpText("email", validationResult)} onChange={e => {setEmail(e.target.value)}} label="Email" />
        <TextField value={cep} onChange={e => validate(e.target.value, setCep, z.coerce.number("Deve ser numero"))} label="CEP" />
        <TextField value={endereco} onChange={e => {setEndereco(e.target.value)}} label="Endereco" />
        <TextField value={numero} onChange={e => validate(e.target.value, setNumero, Pessoa.shape.numero)} label="Numero" />
    </>
}

export default Comprador;