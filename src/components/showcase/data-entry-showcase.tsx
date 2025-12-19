"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function DataEntryShowcase() {
  const [sliderValue, setSliderValue] = React.useState([50]);
  const [rangeValue, setRangeValue] = React.useState([25, 75]);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Data Entry</h2>
      <div className="space-y-8">
        {/* Select */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Select
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <Label>Basic Select</Label>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Grouped Select</Label>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Vegetables</SelectLabel>
                    <SelectItem value="carrot">Carrot</SelectItem>
                    <SelectItem value="broccoli">Broccoli</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Small Select</Label>
              <Select>
                <SelectTrigger size="sm" className="w-36">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="md">Medium</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Checkbox */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Checkbox
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="marketing" defaultChecked />
              <Label htmlFor="marketing">Receive marketing emails</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled" disabled />
              <Label htmlFor="disabled" className="opacity-50">
                Disabled checkbox
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled-checked" disabled defaultChecked />
              <Label htmlFor="disabled-checked" className="opacity-50">
                Disabled checked
              </Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Radio Group */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Radio Group
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label>Notification Preference</Label>
              <RadioGroup defaultValue="email">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email-radio" />
                  <Label htmlFor="email-radio">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms-radio" />
                  <Label htmlFor="sms-radio">SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="push" id="push-radio" />
                  <Label htmlFor="push-radio">Push Notification</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none-radio" disabled />
                  <Label htmlFor="none-radio" className="opacity-50">
                    None (disabled)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Plan Selection</Label>
              <RadioGroup defaultValue="pro">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="free" id="free-plan" />
                  <Label htmlFor="free-plan">Free - $0/month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pro" id="pro-plan" />
                  <Label htmlFor="pro-plan">Pro - $19/month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enterprise" id="enterprise-plan" />
                  <Label htmlFor="enterprise-plan">Enterprise - Custom</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <Separator />

        {/* Slider */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Slider
          </h3>
          <div className="space-y-8 max-w-md">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Volume</Label>
                <span className="text-sm text-muted-foreground">
                  {sliderValue[0]}%
                </span>
              </div>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Price Range</Label>
                <span className="text-sm text-muted-foreground">
                  ${rangeValue[0]} - ${rangeValue[1]}
                </span>
              </div>
              <Slider
                value={rangeValue}
                onValueChange={setRangeValue}
                max={100}
                step={5}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
