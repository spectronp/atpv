import { handleInput, isValid } from "@/utils";
import { MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { number, string } from "yup";

const Vendedor = ({ atpvData, updateAtpvData }) => {
    const [tipoPessoa, setTipoPessoa] = useState(atpvData.current.vendedor.tipo ?? "")
    const [cpfCnpj, setCpfCnpj] = useState(atpvData.current.vendedor.cpfCnpj ?? "") // TODO: trocar por cpf ou cnpj dependendo to tipo de pessoa
    const [nome, setNome] = useState(atpvData.current.vendedor.nome ?? "")
    const [email, setEmail] = useState(atpvData.current.vendedor.email ?? "")
    const [cep, setCep] = useState(atpvData.current.vendedor.cep ?? "")
    const [endereco, setEndereco] = useState(atpvData.current.vendedor.endereco ?? "")
    const [numero, setNumero] = useState(atpvData.current.vendedor.numero ?? "")
    const [emailValidation, setEmailValidation] = useState({})

    useEffect(() => {
        if(email == "") {
            setEmailValidation(true)
            return
        }
        const schema = string().email("Email invalido")
        let result
        const runIsValid = async () => {
            result = await isValid(email, schema)
            setEmailValidation(result)
        }
        runIsValid()
    }, [email])

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
        <TextField value={cpfCnpj} onChange={e => handleInput(e.target.value, setCpfCnpj, number("Deve ser numero"))} label="CPF/CNPJ" />
        <TextField value={nome} onChange={e => {setNome(e.target.value)}} label="Nome" />
        <TextField value={email} error={!emailValidation} helperText={!emailValidation ? "Email invalido" : ""} onChange={e => {setEmail(e.target.value)}} label="Email" />
        <TextField value={cep} onChange={e => handleInput(e.target.value, setCep, number("Deve ser numero"))} label="CEP" />
        <TextField value={endereco} onChange={e => {setEndereco(e.target.value)}}label="Endereco" />
        <TextField value={numero} onChange={e => handleInput(e.target.value, setNumero, number("Deve ser numero"))} label="Numero" />
    </>
}

export default Vendedor;