"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MoreVerticalIcon, HeartIcon, ShareIcon } from "lucide-react";

export function CardsShowcase() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Cards</h2>
      <div className="space-y-8">
        {/* Basic Card */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Basic Card
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                  This is a basic card with a title and description.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Card content goes here. You can add any content including
                  text, images, or other components.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>With Action</CardTitle>
                <CardDescription>Card with an action button</CardDescription>
                <CardAction>
                  <Button variant="ghost" size="icon-sm">
                    <MoreVerticalIcon />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p>This card has an action button in the header area.</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </CardFooter>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle>Small Card</CardTitle>
                <CardDescription>Compact size variant</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is a smaller card variant with reduced padding.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Feature Cards */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Feature Cards
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge>New</Badge>
                  <Badge variant="secondary">Featured</Badge>
                </div>
                <CardTitle className="mt-2">Product Feature</CardTitle>
                <CardDescription>
                  Discover our latest product feature with enhanced capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Advanced analytics dashboard</li>
                  <li>Real-time collaboration</li>
                  <li>Custom integrations</li>
                </ul>
              </CardContent>
              <CardFooter className="gap-2">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Card with interactive elements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  This card demonstrates interactive elements like buttons and
                  icons.
                </p>
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm">
                    <HeartIcon className="mr-1 size-4" />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ShareIcon className="mr-1 size-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
