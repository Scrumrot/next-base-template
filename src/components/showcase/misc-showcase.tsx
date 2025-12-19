"use client";

import * as React from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  ChevronsUpDownIcon,
} from "lucide-react";

export function MiscShowcase() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Miscellaneous</h2>
      <div className="space-y-8">
        {/* Keyboard */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Keyboard Keys
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Save:</span>
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>S</Kbd>
              </KbdGroup>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Copy:</span>
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>C</Kbd>
              </KbdGroup>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Paste:</span>
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>V</Kbd>
              </KbdGroup>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Undo:</span>
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>Z</Kbd>
              </KbdGroup>
            </div>
            <Kbd>Enter</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
          </div>
        </div>

        <Separator />

        {/* Button Group */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Button Group
          </h3>
          <div className="flex flex-wrap gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Text Formatting</p>
              <ButtonGroup>
                <Button variant="outline" size="icon">
                  <BoldIcon />
                </Button>
                <Button variant="outline" size="icon">
                  <ItalicIcon />
                </Button>
                <Button variant="outline" size="icon">
                  <UnderlineIcon />
                </Button>
              </ButtonGroup>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Alignment</p>
              <ButtonGroup>
                <Button variant="outline" size="icon">
                  <AlignLeftIcon />
                </Button>
                <Button variant="outline" size="icon">
                  <AlignCenterIcon />
                </Button>
                <Button variant="outline" size="icon">
                  <AlignRightIcon />
                </Button>
              </ButtonGroup>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">With Separator</p>
              <ButtonGroup>
                <Button variant="outline">Cut</Button>
                <Button variant="outline">Copy</Button>
                <ButtonGroupSeparator />
                <Button variant="outline">Paste</Button>
              </ButtonGroup>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Vertical</p>
              <ButtonGroup orientation="vertical">
                <Button variant="outline" size="sm">
                  Top
                </Button>
                <Button variant="outline" size="sm">
                  Middle
                </Button>
                <Button variant="outline" size="sm">
                  Bottom
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>

        <Separator />

        {/* Collapsible */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Collapsible
          </h3>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full max-w-md space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 rounded-md border px-4 py-2">
              <h4 className="text-sm font-semibold">
                @peduarte starred 3 repositories
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <ChevronsUpDownIcon />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              @radix-ui/primitives
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-2 text-sm">
                @radix-ui/colors
              </div>
              <div className="rounded-md border px-4 py-2 text-sm">
                @stitches/react
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </section>
  );
}
