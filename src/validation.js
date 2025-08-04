import { mixed, number, object, string } from "yup"


export const Pessoa = object({
    tipo: mixed().oneOf(['fisica', 'juridica']).required(),
    nome: string().required(),
    cpfCnpj: number().positive().required(),
    email: string().email().optional(),
    cep: number().required(),
    endereco: string().optional(),
    numero: number().optional(),
})

export const Atpv = object({
    tipoRegistro: string().required(),
    dataVenda: string().required(), // NOTE: could use regex for DD/MM/YYYY
    valorVeiculo: number("Valor deve ser um numero").required(),
    cidade: string().required(),
    uf: string().length(2).uppercase().required(),
    placa: string().required(),
    renavam: string().required(),
    chassi: string().required(),
    crv: string().required(),
    dataEmissaoCrv: string().required(),
    numeroViaCrv: number().required(),
    codigoSegurancaCrv: string().required(),
    anoFabricacao: number("Deve ser um numero").required(), // TODO: could set a max and minimum
    anoModelo: number("Deve ser um numero").required(),
    quilometragem: number("Deve ser um numero").required(),
    vendedor: Pessoa.required(),
    comprador: Pessoa.required(),
})
