"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ToastShowcase() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Toast Notifications</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Toast Types
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => toast("This is a default toast message")}
            >
              Default Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.success("Operation completed successfully!")}
            >
              Success Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error("Something went wrong!")}
            >
              Error Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.warning("Please review before continuing")}
            >
              Warning Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("Here's some helpful information")}
            >
              Info Toast
            </Button>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Toast with Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                })
              }
            >
              With Description & Action
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.promise(
                  new Promise((resolve) => setTimeout(resolve, 2000)),
                  {
                    loading: "Loading...",
                    success: "Data loaded successfully!",
                    error: "Error loading data",
                  }
                )
              }
            >
              Promise Toast
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
