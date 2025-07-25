'use server';

import { db } from "@/db";
import { pessoa } from "@/db/schema";

export const pushAtpvData = async atpvData => {
    let vendedor_id = await db.insert(pessoa).values(atpvData.vendedor)
    //let comprador_id = await db.insert(pessoa).values(atpvData.comprador)
}

