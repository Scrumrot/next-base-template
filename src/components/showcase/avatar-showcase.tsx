"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CheckIcon } from "lucide-react";

export function AvatarShowcase() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Avatars</h2>
      <div className="space-y-8">
        {/* Basic Avatars */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Basic Avatars
          </h3>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/vercel.png"
                alt="@vercel"
              />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <Separator />

        {/* Avatar Sizes */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Sizes
          </h3>
          <div className="flex items-center gap-4">
            <Avatar size="sm">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Small"
              />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar size="default">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Default"
              />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Large"
              />
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <Separator />

        {/* Avatar with Badge */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            With Status Badge
          </h3>
          <div className="flex items-center gap-4">
            <Avatar size="sm">
              <AvatarImage src="https://github.com/shadcn.png" alt="Online" />
              <AvatarFallback>ON</AvatarFallback>
              <AvatarBadge className="bg-green-500" />
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" alt="Away" />
              <AvatarFallback>AW</AvatarFallback>
              <AvatarBadge className="bg-yellow-500" />
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>VR</AvatarFallback>
              <AvatarBadge className="bg-green-500">
                <CheckIcon />
              </AvatarBadge>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>OF</AvatarFallback>
              <AvatarBadge className="bg-gray-400" />
            </Avatar>
          </div>
        </div>

        <Separator />

        {/* Avatar Group */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Avatar Group
          </h3>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground mb-2 block">
                Default size
              </span>
              <AvatarGroup>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User 1"
                  />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/vercel.png"
                    alt="User 2"
                  />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>U4</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+5</AvatarGroupCount>
              </AvatarGroup>
            </div>

            <div>
              <span className="text-sm text-muted-foreground mb-2 block">
                Large size
              </span>
              <AvatarGroup>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User 1"
                  />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/vercel.png"
                    alt="User 2"
                  />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+12</AvatarGroupCount>
              </AvatarGroup>
            </div>

            <div>
              <span className="text-sm text-muted-foreground mb-2 block">
                Small size
              </span>
              <AvatarGroup>
                <Avatar size="sm">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+20</AvatarGroupCount>
              </AvatarGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
