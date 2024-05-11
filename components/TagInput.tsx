import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown } from "lucide-react";

export type Option = { value: string; label: string };

interface TagInputProps {
  options: Option[];
  value?: Option[];
  onSelect: (value: Option) => void;
  onCreateTag: (tag: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}
export function TagInput({
  options,
  value,
  onSelect,
  onCreateTag,
  placeholder = "Select an option...",
  className,
  id,
}: TagInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const handleCreateTag = () => {
    onCreateTag(inputValue);
    if (inputValue !== "") {
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-labelledby={`${id}-label`}
          aria-expanded={open}
          className={cn("min-w-[200px] w-max justify-between", className)}
        >
          <div className="flex items-start">
            {value != null && value.length > 0 ? (
              value.map((val) => (
                <Badge key={val.value} className="mr-1" variant="outline">
                  {val.label}
                </Badge>
              ))
            ) : (
              <span className="opacity-50">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px] w-max p-0">
        <Command>
          <CommandInput
            ref={inputRef}
            value={inputValue}
            onInput={handleInputChange}
            placeholder="Search..."
            aria-label={`${id}-search`}
          />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options?.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={() => {
                    onSelect(item);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.some((v) => v.label === item.label)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
              {inputValue !== "" && (
                <CommandItem
                  onSelect={handleCreateTag}
                  className="text-gray-500"
                >
                  <Button variant="ghost" className="w-full" size="sm">
                    Create new tag:{" "}
                    <Badge className="ml-1" variant="outline">
                      {inputValue}
                    </Badge>
                  </Button>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
