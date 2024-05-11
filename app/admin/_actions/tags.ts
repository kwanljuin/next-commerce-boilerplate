"use server";

import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addSchema = z.object({
  name: z.string().min(1),
});

export async function addTag(name: string) {
  const result = addSchema.safeParse({ name });
  if (result.success === false) {
    return { error: result.error };
  }

  const data = result.data;

  const tag = await db.tag.create({
    data: {
      name: data.name,
    },
  });
  revalidatePath("/products");
  return { data: tag };
}

export async function deleteTag(id: string) {
  const tag = await db.tag.delete({ where: { id } });
}
