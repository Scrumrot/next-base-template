"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  PlusIcon,
  DownloadIcon,
  TrashIcon,
  MailIcon,
  Loader2Icon,
  ChevronRightIcon,
} from "lucide-react";

export function ButtonShowcase() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Buttons</h2>
      <div className="space-y-8">
        {/* Variants */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Variants
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <Separator />

        {/* Sizes */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Sizes
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <Separator />

        {/* With Icons */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            With Icons
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button>
              <PlusIcon data-icon="inline-start" />
              Create New
            </Button>
            <Button variant="secondary">
              <DownloadIcon data-icon="inline-start" />
              Download
            </Button>
            <Button variant="outline">
              Continue
              <ChevronRightIcon data-icon="inline-end" />
            </Button>
            <Button variant="destructive">
              <TrashIcon data-icon="inline-start" />
              Delete
            </Button>
          </div>
        </div>

        <Separator />

        {/* Icon Only */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Icon Only
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="icon-xs" variant="outline">
              <PlusIcon />
            </Button>
            <Button size="icon-sm" variant="outline">
              <PlusIcon />
            </Button>
            <Button size="icon" variant="outline">
              <MailIcon />
            </Button>
            <Button size="icon-lg" variant="outline">
              <DownloadIcon />
            </Button>
          </div>
        </div>

        <Separator />

        {/* States */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            States
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button disabled>Disabled</Button>
            <Button disabled>
              <Loader2Icon className="animate-spin" />
              Loading...
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
