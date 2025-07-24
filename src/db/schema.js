import { pgEnum, pgTable, char, text, numeric, integer, serial, date, decimal } from "drizzle-orm/pg-core";

export const tipoPessoaEnum = pgEnum('tipo_pessoa', ['fisica', 'juridica'])

export const atpv = pgTable('atpv', {
    id: serial().primaryKey(),
    tipo: text(),
    data_venda: date(),
    valor_veiculo: decimal(),
    cidade: text(),
    uf: char({ length: 2 }),
    placa: text(),
    renavam: text(),
    chassi: text(),
    crv: text(),
    data_emissao_crv: date(),
    numero_via_crv: text(),
    codigo_serguranca_crv: text(),
    ano_fabricacao: numeric(),
    ano_modelo: numeric(),
    quilometragem: numeric(),
    vendedor: integer().references(() => pessoa.id),
    comprador: integer().references(() => pessoa.id),
})

export const pessoa = pgTable('pessoa', {
    tipo: tipoPessoaEnum(),
    nome: text(),
    cpf_cnpj: text(),
    email: text(),
    cep: text(),
    endereco: text(),
    numero: numeric(),
})
