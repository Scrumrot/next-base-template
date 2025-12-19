"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ButtonShowcase } from "@/components/showcase/button-showcase";
import { FormInputsShowcase } from "@/components/showcase/form-inputs-showcase";
import { CardsShowcase } from "@/components/showcase/cards-showcase";
import { AlertsBadgesShowcase } from "@/components/showcase/alerts-badges-showcase";
import { DataEntryShowcase } from "@/components/showcase/data-entry-showcase";
import { FeedbackShowcase } from "@/components/showcase/feedback-showcase";
import { DialogShowcase } from "@/components/showcase/dialog-showcase";
import { AccordionShowcase } from "@/components/showcase/accordion-showcase";
import { AvatarShowcase } from "@/components/showcase/avatar-showcase";
import { NavigationShowcase } from "@/components/showcase/navigation-showcase";
import { OverlaysShowcase } from "@/components/showcase/overlays-showcase";
import { MenusShowcase } from "@/components/showcase/menus-showcase";
import { TableShowcase } from "@/components/showcase/table-showcase";
import { DateTimeShowcase } from "@/components/showcase/datetime-showcase";
import { AdvancedInputsShowcase } from "@/components/showcase/advanced-inputs-showcase";
import { MiscShowcase } from "@/components/showcase/misc-showcase";
import { ToastShowcase } from "@/components/showcase/toast-showcase";

const sections = [
  { id: "buttons", label: "Buttons", component: ButtonShowcase },
  { id: "form-inputs", label: "Form Inputs", component: FormInputsShowcase },
  { id: "data-entry", label: "Data Entry", component: DataEntryShowcase },
  { id: "advanced-inputs", label: "Advanced Inputs", component: AdvancedInputsShowcase },
  { id: "cards", label: "Cards", component: CardsShowcase },
  { id: "table", label: "Table", component: TableShowcase },
  { id: "alerts-badges", label: "Alerts & Badges", component: AlertsBadgesShowcase },
  { id: "avatars", label: "Avatars", component: AvatarShowcase },
  { id: "navigation", label: "Navigation", component: NavigationShowcase },
  { id: "menus", label: "Menus & Dialogs", component: MenusShowcase },
  { id: "overlays", label: "Overlays", component: OverlaysShowcase },
  { id: "dialogs", label: "Dialogs", component: DialogShowcase },
  { id: "datetime", label: "Date & Time", component: DateTimeShowcase },
  { id: "feedback", label: "Feedback", component: FeedbackShowcase },
  { id: "accordion", label: "Accordion", component: AccordionShowcase },
  { id: "misc", label: "Miscellaneous", component: MiscShowcase },
  { id: "toast", label: "Toast", component: ToastShowcase },
] as const;

type SectionProps = Readonly<{
  id: string;
  onIntersect: (id: string, isIntersecting: boolean) => void;
  children: React.ReactNode;
}>;

function ObservedSection({ id, onIntersect, children }: SectionProps) {
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  const refCallback = React.useCallback(
    (node: HTMLElement | null) => {
      // Cleanup previous observer
      observerRef.current?.disconnect();

      if (node) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              onIntersect(id, entry.isIntersecting);
            });
          },
          { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
        );
        observerRef.current.observe(node);
      }
    },
    [id, onIntersect]
  );

  return (
    <section ref={refCallback} id={id} className="scroll-mt-20">
      <Card>
        <CardContent className="pt-6">
          {children}
        </CardContent>
      </Card>
    </section>
  );
}

function SidebarLink({
  id,
  label,
  isActive,
}: Readonly<{ id: string; label: string; isActive: boolean }>) {
  const handleClick = () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className={cn(
          "block w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors",
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        {label}
      </button>
    </li>
  );
}

export default function ShowcasePage() {
  const [activeSection, setActiveSection] = React.useState("buttons");

  const handleIntersect = React.useCallback(
    (id: string, isIntersecting: boolean) => {
      if (isIntersecting) {
        setActiveSection(id);
      }
    },
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Component Showcase
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            A collection of shadcn/ui components and their variants
          </p>
        </header>

        <div className="flex gap-12">
          {/* Sidebar Navigation */}
          <nav className="hidden lg:block w-48 shrink-0">
            <div className="sticky top-20">
              <h2 className="text-sm font-semibold mb-4 text-muted-foreground">
                Components
              </h2>
              <ul className="space-y-1">
                {sections.map(({ id, label }) => (
                  <SidebarLink
                    key={id}
                    id={id}
                    label={label}
                    isActive={activeSection === id}
                  />
                ))}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-16">
            {sections.map(({ id, component: Component }) => (
              <ObservedSection key={id} id={id} onIntersect={handleIntersect}>
                <Component />
              </ObservedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
