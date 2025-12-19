"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SearchIcon, MailIcon, EyeIcon } from "lucide-react";

export function FormInputsShowcase() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Form Inputs</h2>
      <div className="space-y-8">
        {/* Basic Input */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Text Input
          </h3>
          <div className="grid gap-6 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Input States */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Input States
          </h3>
          <div className="grid gap-4 max-w-md">
            <Input placeholder="Default input" />
            <Input placeholder="Disabled input" disabled />
            <Input
              placeholder="Invalid input"
              aria-invalid="true"
              defaultValue="invalid@"
            />
          </div>
        </div>

        <Separator />

        {/* Input Types */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Input Types
          </h3>
          <div className="grid gap-4 max-w-md">
            <Input type="text" placeholder="Text input" />
            <Input type="number" placeholder="Number input" />
            <Input type="date" />
            <Input type="file" />
          </div>
        </div>

        <Separator />

        {/* Textarea */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Textarea
          </h3>
          <div className="grid gap-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled-textarea">Disabled</Label>
              <Textarea
                id="disabled-textarea"
                placeholder="Disabled textarea"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
