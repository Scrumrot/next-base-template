"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/ui/date-picker";
import { Separator } from "@/components/ui/separator";

export function DateTimeShowcase() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Date & Time</h2>
      <div className="space-y-8">
        {/* Calendar */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Calendar
          </h3>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Single Date</p>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Date Range</p>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) =>
                  setDateRange({ from: range?.from, to: range?.to })
                }
                numberOfMonths={1}
                className="rounded-md border"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Date Picker */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Date Picker
          </h3>
          <div className="max-w-xs">
            <DatePicker />
          </div>
        </div>
      </div>
    </section>
  );
}
