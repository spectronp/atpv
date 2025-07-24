'use server';

import { db } from "@/db";
import { pessoa } from "@/db/schema";

export const pushAtpvData = async atpvData => {
    let res = db.insert(pessoa).values(atpvData.vendedor)
    console.log(res)
}

