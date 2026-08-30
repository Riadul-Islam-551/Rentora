import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PropertyEmpty = () => {
  return (
    <div className="flex min-h-87.5 flex-col items-center justify-center rounded-xl border border-dashed bg-card/50 p-8 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
        <Building2 className="size-7 text-primary" />
      </div>

      <h2 className="text-lg font-semibold">No properties yet</h2>

      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        There is no available property !
      </p>
    </div>
  );
};

export default PropertyEmpty;
