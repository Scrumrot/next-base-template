"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function OverlaysShowcase() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Overlays</h2>
      <div className="space-y-8">
        {/* Sheet */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Sheet
          </h3>
          <div className="flex flex-wrap gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Right Sheet</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Edit Profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email" />
                  </div>
                </div>
                <SheetFooter>
                  <Button>Save changes</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Left Sheet</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    Browse through the menu items.
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-2 py-4">
                  <Button variant="ghost" className="justify-start">
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Settings
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Profile
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <Separator />

        {/* Drawer */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Drawer
          </h3>
          <div className="flex flex-wrap gap-3">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Open Bottom Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Drawer Title</DrawerTitle>
                  <DrawerDescription>
                    This is a drawer that slides up from the bottom.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Drawer content goes here. Great for mobile-friendly modals.
                  </p>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <Separator />

        {/* Popover */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Popover
          </h3>
          <div className="flex flex-wrap gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Popover Title</PopoverTitle>
                  <PopoverDescription>
                    This is a popover with some content.
                  </PopoverDescription>
                </PopoverHeader>
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input id="width" defaultValue="100%" />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Separator />

        {/* HoverCard */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Hover Card
          </h3>
          <div className="flex flex-wrap gap-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link" className="p-0 h-auto">
                  @nextjs
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/vercel.png" />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@nextjs</h4>
                    <p className="text-sm text-muted-foreground">
                      The React Framework – created and maintained by @vercel.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined December 2021
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </section>
  );
}
