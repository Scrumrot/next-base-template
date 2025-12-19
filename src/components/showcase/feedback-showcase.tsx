"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InfoIcon, HelpCircleIcon, SettingsIcon } from "lucide-react";

export function FeedbackShowcase() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Feedback</h2>
      <div className="space-y-8">
        {/* Progress */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Progress
          </h3>
          <div className="space-y-6 max-w-md">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Animated Progress</span>
                <span className="text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>

            <div className="space-y-2">
              <span className="text-sm">25% Complete</span>
              <Progress value={25} />
            </div>

            <div className="space-y-2">
              <span className="text-sm">50% Complete</span>
              <Progress value={50} />
            </div>

            <div className="space-y-2">
              <span className="text-sm">75% Complete</span>
              <Progress value={75} />
            </div>

            <div className="space-y-2">
              <span className="text-sm">100% Complete</span>
              <Progress value={100} />
            </div>
          </div>
        </div>

        <Separator />

        {/* Skeleton */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Skeleton Loading
          </h3>
          <div className="space-y-6">
            {/* Card Skeleton */}
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">
                Card Skeleton
              </span>
              <div className="flex items-center space-x-4 p-4 border rounded-lg max-w-md">
                <Skeleton className="size-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>

            {/* Text Skeleton */}
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">
                Text Skeleton
              </span>
              <div className="space-y-2 max-w-md">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Grid Skeleton */}
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">
                Grid Skeleton
              </span>
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <Skeleton className="h-24 rounded-lg" />
                <Skeleton className="h-24 rounded-lg" />
                <Skeleton className="h-24 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Tooltip */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Tooltips
          </h3>
          <div className="flex flex-wrap gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <InfoIcon className="mr-2 size-4" />
                  Hover me
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircleIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Need help? Click for more info</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon">
                  <SettingsIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Open settings</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-muted-foreground underline decoration-dotted cursor-help">
                  Hover over this text
                </span>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Tooltips work on any element!</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  );
}
