"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export function AccordionShowcase() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Accordion</h2>
      <div className="space-y-8">
        {/* Single Accordion */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Single Accordion
          </h3>
          <Accordion type="single" collapsible className="max-w-xl">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
              <AccordionContent>
                shadcn/ui is a collection of reusable components built using
                Radix UI and Tailwind CSS. It&apos;s not a component library
                that you install as a dependency - instead, you copy and paste
                the components into your project.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes! All components are built on top of Radix UI primitives,
                which are designed with accessibility in mind. This includes
                proper ARIA attributes, keyboard navigation, and focus
                management.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I customize the components?</AccordionTrigger>
              <AccordionContent>
                Absolutely! Since you own the code, you have full control over
                the styling and behavior. You can modify the Tailwind classes,
                add new variants, or completely redesign the components to match
                your brand.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Separator />

        {/* Multiple Accordion */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Multiple Accordion (multiple items can be open)
          </h3>
          <Accordion type="multiple" className="max-w-xl">
            <AccordionItem value="features">
              <AccordionTrigger>Features</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1">
                  <li>Built with Radix UI primitives</li>
                  <li>Styled with Tailwind CSS</li>
                  <li>Dark mode support</li>
                  <li>Fully customizable</li>
                  <li>TypeScript support</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="installation">
              <AccordionTrigger>Installation</AccordionTrigger>
              <AccordionContent>
                <p>
                  Components can be installed using the shadcn CLI tool. Simply
                  run <code className="bg-muted px-1 rounded">npx shadcn@latest add [component]</code>{" "}
                  to add any component to your project.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="usage">
              <AccordionTrigger>Usage</AccordionTrigger>
              <AccordionContent>
                <p>
                  Import the components from your components directory and use
                  them like any other React component. All components are fully
                  typed and support standard HTML attributes.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
              <AccordionTrigger>Support</AccordionTrigger>
              <AccordionContent>
                <p>
                  For support, you can check the official documentation, join
                  the Discord community, or open an issue on GitHub. The
                  community is very active and helpful!
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
