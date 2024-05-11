import React from "react";
import db from "@/db/db";
import { PageHeader } from "../../_components/PageHeader";
import { ProductForm } from "../_components/ProductForm";

export default async function NewProductPage() {
  const tags = await db.tag.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <PageHeader>Add Product</PageHeader>
      <ProductForm tags={tags} />
    </>
  );
}
