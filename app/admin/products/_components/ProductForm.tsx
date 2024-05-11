"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import { TagInput } from "@/components/TagInput";
import { addTag } from "../../_actions/tags";
import type { Option } from "@/components/TagInput";

export function ProductForm({
  product,
  tags,
}: {
  product?: Product | null;
  tags: { id: string; name: string }[];
}) {
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  async function onCreateTag(tagName: string) {
    const response = await addTag(tagName);

    if (response.data != null) {
      // Add the new tag to the list of tags
      setSelectedTags((prev) => [
        ...prev,
        {
          value: response.data.id,
          label: response.data.name,
        },
      ]);
    }
  }

  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        {error.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description}
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label>Tag</Label>
        <br />
        <TagInput
          id="tag"
          options={tags?.map(({ id, name }) => ({ value: id, label: name }))}
          value={selectedTags}
          onCreateTag={onCreateTag}
          onSelect={(tag) => {
            setSelectedTags((prev) => {
              // Check if the tag already exists in selectedTags
              const tagIndex = prev.findIndex(
                (selectedTag) => selectedTag.value === tag.value
              );

              if (tagIndex !== -1) {
                // Tag exists, remove it
                return prev.filter(
                  (selectedTag) => selectedTag.value !== tag.value
                );
              } else {
                // Tag doesn't exist, add it
                return [...prev, tag];
              }
            });
          }}
          placeholder="Select a tag..."
          className="mb-4 min-w-56 w-max"
        />
        {/* {error.tag && <div className="text-destructive">{error.tag}</div>} */}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
