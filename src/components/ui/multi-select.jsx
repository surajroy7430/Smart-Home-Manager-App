import { useState, useRef } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";

export function MultiSelect({
  options = [],
  placeholder = "Select...",
  selected = [],
  onChange = () => {},
}) {
  const inputRef = useRef();
  const [open, setOpen] = useState(false);

  const toggleOption = (value) => {
    if (!selected.includes(value)) {
      onChange([...selected, value]);
    }
  };

  const removeOption = (value) => {
    onChange(selected.filter((item) => item !== value));
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      inputRef.current.value === "" &&
      selected.length > 0
    ) {
      onChange(selected.slice(0, -1));
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="w-full min-h-[40px] border rounded-md px-3 py-2 flex items-center flex-wrap gap-1 cursor-text"
          onClick={() => setOpen(true)}
        >
          {selected.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="flex items-center gap-1 lowercase rounded-full"
            >
              {item}
              <button
                className="w-fit h-fit cursor-pointer hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(item);
                }}
              >
                <X size="15" />
              </button>
            </Badge>
          ))}
          <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            className="outline-none flex-1 bg-transparent min-w-[100px]"
            placeholder={selected.length ? "" : placeholder}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            {options
              .filter((item) => !selected.includes(item))
              .map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    toggleOption(item);
                    setOpen(true); // keep it open
                  }}
                >
                  {item}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
