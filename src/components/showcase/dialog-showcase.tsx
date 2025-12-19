"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function DialogShowcase() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Dialogs</h2>
      <div className="space-y-8">
        {/* Basic Dialog */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Dialog Examples
          </h3>
          <div className="flex flex-wrap gap-4">
            {/* Simple Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Simple Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Simple Dialog</DialogTitle>
                  <DialogDescription>
                    This is a simple dialog with just a title and description.
                  </DialogDescription>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                  Dialog content can include any elements you need. This is a
                  great way to display important information or actions that
                  require user attention.
                </p>
                <DialogFooter>
                  <Button>Got it</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Form Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Account</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new account.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dialog-name">Name</Label>
                    <Input id="dialog-name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dialog-email">Email</Label>
                    <Input
                      id="dialog-email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dialog-password">Password</Label>
                    <Input
                      id="dialog-password"
                      type="password"
                      placeholder="Create a password"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Item</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    the item and remove all associated data.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Dialog without close button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">No Close Button</Button>
              </DialogTrigger>
              <DialogContent showCloseButton={false}>
                <DialogHeader>
                  <DialogTitle>Important Notice</DialogTitle>
                  <DialogDescription>
                    This dialog does not have a close button in the corner.
                  </DialogDescription>
                </DialogHeader>
                <p className="text-sm">
                  Users must interact with the footer buttons to close this
                  dialog.
                </p>
                <DialogFooter showCloseButton>
                  <Button>Acknowledge</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
