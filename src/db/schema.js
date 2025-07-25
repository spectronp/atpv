import { pgEnum, pgTable, char, text, numeric, integer, serial, date, decimal } from "drizzle-orm/pg-core";

export const tipoPessoaEnum = pgEnum('tipo_pessoa', ['fisica', 'juridica'])

export const atpv = pgTable('atpv', {
    tipoRegistro: text("tipo"),
    dataVenda: date("data_venda"),
    valorVeiculo: decimal("valor_veiculo"),
    cidade: text(),
    uf: char({ length: 2 }),
    placa: text(),
    renavam: text(),
    chassi: text(),
    crv: text(),
    dataEmissaoCrv: date("data_emissao_crv"),
    numeroViaCrv: text("numero_via_crv"),
    codigoSegurancaCrv: text("codigo_seguranca_crv"),
    anoFabricacao: numeric("ano_fabricacao"),
    anoModelo: numeric("ano_modelo"),
    quilometragem: numeric(),
    vendedor: integer().references(() => pessoa.id),
    comprador: integer().references(() => pessoa.id),
})

export const pessoa = pgTable('pessoa', {
    tipo: tipoPessoaEnum(),
    nome: text(),
    cpfCnpj: text("cpf_cnpj"),
    email: text(),
    cep: text(),
    endereco: text(),
    numero: numeric(),
})
