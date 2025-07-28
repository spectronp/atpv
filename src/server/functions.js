'use server';

import { db } from "@/db";
import { atpv, pessoa } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as z from "zod";

const Pessoa = z.object({
    tipo: z.literal(["fisica", "juridica"]),
    nome: z.string(),
    cpfCnpj: z.string(),
    email: z.email(),
    cep: z.string(),
    endereco: z.string(),
    numero: z.coerce.bigint()
})

const Atpv = z.object({
    tipoRegistro: z.string(),
    dataVenda: z.string(), // NOTE: could use regex for DD/MM/YYYY
    valorVeiculo: z.coerce.bigint(),
    cidade: z.string(),
    uf: z.string().length(2).uppercase(),
    placa: z.string(),
    renavam: z.string(),
    chassi: z.string(),
    crv: z.string(),
    dataEmissaoCrv: z.string(),
    numeroViaCrv: z.string(), // TODO: this should be a number
    codigoSegurancaCrv: z.string(),
    anoFabricacao: z.coerce.number(), // TODO: could set a max and minimum
    anoModelo: z.coerce.number(),
    quilometragem: z.coerce.number(),
    vendedor: Pessoa,
    comprador: Pessoa,
})

export const pushAtpvData = async atpvData => {
    const valid = Atpv.safeParse(atpvData)
    if(!valid.success) {
        return valid.error
    }
    atpvData = valid.data

    const result_vendedor = await db.select({ id: pessoa.id }).from(pessoa).where(eq(pessoa.cpfCnpj, atpvData.vendedor.cpfCnpj))
    const result_comprador = await db.select({ id: pessoa.id }).from(pessoa).where(eq(pessoa.cpfCnpj, atpvData.comprador.cpfCnpj))
    let vendedor_id, comprador_id

    if(result_vendedor.length == 0) {
        vendedor_id = (await db.insert(pessoa).values(atpvData.vendedor).returning({id: pessoa.id}))[0].id
    } else {
        vendedor_id = result_vendedor[0].id
    }
    if(result_comprador.length == 0) {
        comprador_id = (await db.insert(pessoa).values(atpvData.comprador).returning({id: pessoa.id}))[0].id
    } else {
        comprador_id = result_comprador[0].id
    }

    atpvData.vendedor = vendedor_id 
    atpvData.comprador = comprador_id 

    await db.insert(atpv).values(atpvData)
}

