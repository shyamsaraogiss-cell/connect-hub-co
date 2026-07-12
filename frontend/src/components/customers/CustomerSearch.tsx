"use client";

import Input from "@/components/ui/Input";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function CustomerSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-6">
      <Input
        placeholder="Search customer..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}