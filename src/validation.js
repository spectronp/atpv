import * as z from "zod";

export const Pessoa = z.object({
    tipo: z.literal(["fisica", "juridica"]),
    nome: z.string(),
    cpfCnpj: z.coerce.number("Deve ser um numero"),
    email: z.email("Email nao valido"),
    cep: z.coerce.number(),
    endereco: z.string(),
    numero: z.coerce.number("Deve ser um numero")
})

export const Atpv = z.object({
    tipoRegistro: z.string(),
    dataVenda: z.string(), // NOTE: could use regex for DD/MM/YYYY
    valorVeiculo: z.coerce.number("Valor deve ser um numero"),
    cidade: z.string(),
    uf: z.string().length(2).uppercase(),
    placa: z.string(),
    renavam: z.string(),
    chassi: z.string(),
    crv: z.string(),
    dataEmissaoCrv: z.string(),
    numeroViaCrv: z.coerce.number(),
    codigoSegurancaCrv: z.string(),
    anoFabricacao: z.coerce.number("Deve ser um numero"), // TODO: could set a max and minimum
    anoModelo: z.coerce.number("Deve ser um numero"),
    quilometragem: z.coerce.number("Deve ser um numero"),
    vendedor: Pessoa,
    comprador: Pessoa,
})
