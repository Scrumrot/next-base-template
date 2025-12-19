"use client";

import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function AdvancedInputsShowcase() {
  const [otpValue, setOtpValue] = React.useState("");

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Advanced Inputs</h2>
      <div className="space-y-8">
        {/* OTP Input */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            OTP Input
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>6-Digit Code</Label>
              <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-sm text-muted-foreground">
                Value: {otpValue || "(empty)"}
              </p>
            </div>

            <div className="space-y-2">
              <Label>4-Digit PIN</Label>
              <InputOTP maxLength={4}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
