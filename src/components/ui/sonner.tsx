"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "group border shadow-lg rounded-md",
          success: "!bg-emerald-50 !border-emerald-200 !text-emerald-900 dark:!bg-emerald-950 dark:!border-emerald-800 dark:!text-emerald-100 [&_svg]:!text-emerald-600 dark:[&_svg]:!text-emerald-400",
          error: "!bg-red-50 !border-red-200 !text-red-900 dark:!bg-red-950 dark:!border-red-800 dark:!text-red-100 [&_svg]:!text-red-600 dark:[&_svg]:!text-red-400",
          warning: "!bg-amber-50 !border-amber-200 !text-amber-900 dark:!bg-amber-950 dark:!border-amber-800 dark:!text-amber-100 [&_svg]:!text-amber-600 dark:[&_svg]:!text-amber-400",
          info: "!bg-blue-50 !border-blue-200 !text-blue-900 dark:!bg-blue-950 dark:!border-blue-800 dark:!text-blue-100 [&_svg]:!text-blue-600 dark:[&_svg]:!text-blue-400",
          description: "!text-current opacity-80",
          actionButton: "!bg-primary !text-primary-foreground hover:!bg-primary/90",
          cancelButton: "!bg-muted !text-muted-foreground hover:!bg-muted/90",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
