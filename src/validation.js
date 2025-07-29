import * as z from "zod";

export const Pessoa = z.object({
    tipo: z.literal(["fisica", "juridica"]),
    nome: z.string(),
    cpfCnpj: z.string(),
    email: z.email("Email nao valido"),
    cep: z.string(),
    endereco: z.string(),
    numero: z.coerce.bigint("Deve ser um numero")
})

export const Atpv = z.object({
    tipoRegistro: z.string(),
    dataVenda: z.string(), // NOTE: could use regex for DD/MM/YYYY
    valorVeiculo: z.coerce.bigint("Valor deve ser um numero"),
    cidade: z.string(),
    uf: z.string().length(2).uppercase(),
    placa: z.string(),
    renavam: z.string(),
    chassi: z.string(),
    crv: z.string(),
    dataEmissaoCrv: z.string(),
    numeroViaCrv: z.string(), // TODO: this should be a number
    codigoSegurancaCrv: z.string(),
    anoFabricacao: z.coerce.number("Deve ser um numero"), // TODO: could set a max and minimum
    anoModelo: z.coerce.number("Deve ser um numero"),
    quilometragem: z.coerce.number("Deve ser um numero"),
    vendedor: Pessoa,
    comprador: Pessoa,
})
