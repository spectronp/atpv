'use server';

import { db } from "@/db";
import { atpv, pessoa } from "@/db/schema";
import { parseValue } from "@/utils";
import { Atpv, Pessoa } from "@/validation";
import { eq } from "drizzle-orm";

export const pushAtpvData = async atpvData => {
    const validation = await parseValue(atpvData, Atpv)
    if(!validation.success) {
        return validation
    }
    atpvData = validation.data

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

    return {success: true}
}

