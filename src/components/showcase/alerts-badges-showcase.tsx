"use client";

import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
  XIcon,
  RocketIcon,
  StarIcon,
  ZapIcon,
} from "lucide-react";

export function AlertsBadgesShowcase() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Alerts & Badges</h2>
      <div className="space-y-8">
        {/* Alerts */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Alerts
          </h3>
          <div className="space-y-4 max-w-2xl">
            <Alert>
              <InfoIcon />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational alert to provide helpful context.
              </AlertDescription>
            </Alert>

            <Alert>
              <CheckCircleIcon className="text-green-600" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertTriangleIcon className="text-yellow-600" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Please review your settings before continuing.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <XCircleIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong. Please try again later.
              </AlertDescription>
            </Alert>

            <Alert>
              <InfoIcon />
              <AlertTitle>With Action</AlertTitle>
              <AlertDescription>
                This alert has a dismiss action button.
              </AlertDescription>
              <AlertAction>
                <Button variant="ghost" size="icon-sm">
                  <XIcon />
                </Button>
              </AlertAction>
            </Alert>
          </div>
        </div>

        <Separator />

        {/* Badges */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Badge Variants
          </h3>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>

        <Separator />

        {/* Badges with Icons */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Badges with Icons
          </h3>
          <div className="flex flex-wrap gap-3">
            <Badge>
              <RocketIcon data-icon="inline-start" />
              New Feature
            </Badge>
            <Badge variant="secondary">
              <StarIcon data-icon="inline-start" />
              Featured
            </Badge>
            <Badge variant="outline">
              <ZapIcon data-icon="inline-start" />
              Fast
            </Badge>
            <Badge variant="destructive">
              <AlertTriangleIcon data-icon="inline-start" />
              Critical
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Status Badges */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Status Badges
          </h3>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
              Active
            </Badge>
            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
              Pending
            </Badge>
            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
              In Progress
            </Badge>
            <Badge className="bg-gray-500/10 text-gray-600 border-gray-500/20">
              Inactive
            </Badge>
            <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
              Failed
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
