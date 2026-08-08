import { BusinessPageFrame } from "@/components/business-pages/BusinessPageShell";

import { PitruMokshaV15Page } from "./PitruMokshaV15Page";

const breadcrumb = [
  { label: "Connect Hub Co.", href: "/" },
  { label: "PitruMoksha Gaya" },
] as const;

export function PitruMokshaGayaMainContent() {
  return (
    <BusinessPageFrame breadcrumb={breadcrumb} embedded>
      <PitruMokshaV15Page />
    </BusinessPageFrame>
  );
}
