"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  PlusIcon,
  TrashIcon,
  PlaneIcon,
  FuelIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  RadioIcon,
  AlertTriangleIcon,
  FileTextIcon,
  SendIcon,
  SaveIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Zod Schema for form validation
const aircraftSchema = z.object({
  tailNumber: z.string().min(1, "Tail number required"),
  aircraftType: z.string().min(1, "Aircraft type required"),
  callSign: z.string().min(1, "Call sign required"),
  pilotName: z.string().min(1, "Pilot name required"),
  configuration: z.string().min(1, "Configuration required"),
  fuelLoad: z.coerce.number().min(0, "Invalid fuel load"),
});

const tankerSchema = z.object({
  callSign: z.string().min(1, "Call sign required"),
  aircraftType: z.string().min(1, "Aircraft type required"),
  offloadCapacity: z.coerce.number().min(0, "Invalid capacity"),
  arTrack: z.string().min(1, "AR track required"),
  onStationTime: z.string().min(1, "On-station time required"),
  offStationTime: z.string().min(1, "Off-station time required"),
});

const waypointSchema = z.object({
  name: z.string().min(1, "Waypoint name required"),
  coordinates: z.string().min(1, "Coordinates required"),
  altitude: z.coerce.number().min(0, "Invalid altitude"),
  estimatedTime: z.string().optional(),
  type: z.enum(["departure", "enroute", "refuel", "arrival", "alternate"]),
});

const coronetFormSchema = z.object({
  // Mission Identification
  missionNumber: z.string().min(1, "Mission number required"),
  missionName: z.string().min(1, "Mission name required"),
  classification: z.enum(["UNCLASSIFIED", "CONFIDENTIAL", "SECRET", "TOP SECRET"]),
  priority: z.enum(["ROUTINE", "PRIORITY", "IMMEDIATE", "FLASH"]),
  missionType: z.enum(["DEPLOYMENT", "REDEPLOYMENT", "EXERCISE", "CONTINGENCY"]),
  commandingUnit: z.string().min(1, "Commanding unit required"),
  supportingUnits: z.string().optional(),

  // Timing
  departureDate: z.date({ error: "Departure date required" }),
  departureTime: z.string().min(1, "Departure time required"),
  estimatedArrivalDate: z.date({ error: "Arrival date required" }),
  estimatedArrivalTime: z.string().min(1, "Arrival time required"),
  timeZone: z.string().min(1, "Time zone required"),

  // Route
  departureBase: z.string().min(1, "Departure base required"),
  departureICAO: z.string().length(4, "ICAO must be 4 characters"),
  destinationBase: z.string().min(1, "Destination base required"),
  destinationICAO: z.string().length(4, "ICAO must be 4 characters"),
  primaryAlternate: z.string().optional(),
  secondaryAlternate: z.string().optional(),
  routeDescription: z.string().optional(),
  waypoints: z.array(waypointSchema).optional(),

  // Aircraft
  aircraft: z.array(aircraftSchema).min(1, "At least one aircraft required"),
  formationType: z.enum(["SINGLE", "ELEMENT", "FLIGHT", "SQUADRON"]),
  totalAircraft: z.coerce.number().min(1, "At least 1 aircraft required"),

  // Tanker Support
  tankerRequired: z.boolean(),
  tankers: z.array(tankerSchema).optional(),
  totalOffloadRequired: z.coerce.number().optional(),
  refuelingType: z.enum(["BOOM", "DROGUE", "BOTH"]).optional(),

  // Personnel
  missionCommander: z.string().min(1, "Mission commander required"),
  missionCommanderRank: z.string().min(1, "Rank required"),
  flightLead: z.string().min(1, "Flight lead required"),
  deputyFlightLead: z.string().optional(),
  intelOfficer: z.string().optional(),
  weatherOfficer: z.string().optional(),

  // Communications
  primaryFrequency: z.string().min(1, "Primary frequency required"),
  secondaryFrequency: z.string().optional(),
  guardFrequency: z.string().default("243.0"),
  satcomChannel: z.string().optional(),
  comsecRequired: z.boolean(),
  comsecKeyDate: z.string().optional(),

  // Contingencies
  divertBases: z.string().optional(),
  emergencyProcedures: z.string().optional(),
  weatherMinimums: z.string().optional(),
  fuelMinimums: z.coerce.number().optional(),
  bingoFuel: z.coerce.number().optional(),
  jokerFuel: z.coerce.number().optional(),
  notams: z.string().optional(),
  specialInstructions: z.string().optional(),
});

type CoronetFormValues = z.infer<typeof coronetFormSchema>;

const AIRCRAFT_TYPES = [
  { value: "F-15C", label: "F-15C Eagle" },
  { value: "F-15E", label: "F-15E Strike Eagle" },
  { value: "F-16C", label: "F-16C Fighting Falcon" },
  { value: "F-16D", label: "F-16D Fighting Falcon" },
  { value: "F-22A", label: "F-22A Raptor" },
  { value: "F-35A", label: "F-35A Lightning II" },
  { value: "F-35B", label: "F-35B Lightning II" },
  { value: "F-35C", label: "F-35C Lightning II" },
  { value: "A-10C", label: "A-10C Thunderbolt II" },
];

const TANKER_TYPES = [
  { value: "KC-135R", label: "KC-135R Stratotanker" },
  { value: "KC-135T", label: "KC-135T Stratotanker" },
  { value: "KC-46A", label: "KC-46A Pegasus" },
  { value: "KC-10A", label: "KC-10A Extender" },
];

const CONFIGURATIONS = [
  { value: "CLEAN", label: "Clean (Ferry)" },
  { value: "CAP", label: "Combat Air Patrol" },
  { value: "STRIKE", label: "Strike Configuration" },
  { value: "SEAD", label: "SEAD/DEAD" },
  { value: "TRAINING", label: "Training Configuration" },
];

export default function CoronetPlanningPage() {
  const form = useForm<z.infer<typeof coronetFormSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(coronetFormSchema) as any,
    defaultValues: {
      classification: "UNCLASSIFIED",
      priority: "ROUTINE",
      missionType: "DEPLOYMENT",
      formationType: "FLIGHT",
      totalAircraft: 4,
      tankerRequired: true,
      comsecRequired: true,
      guardFrequency: "243.0",
      timeZone: "ZULU",
      aircraft: [
        {
          tailNumber: "",
          aircraftType: "",
          callSign: "",
          pilotName: "",
          configuration: "",
          fuelLoad: 0,
        },
      ],
      tankers: [
        {
          callSign: "",
          aircraftType: "",
          offloadCapacity: 0,
          arTrack: "",
          onStationTime: "",
          offStationTime: "",
        },
      ],
      waypoints: [],
    },
  });

  const tankerRequired = form.watch("tankerRequired");
  const aircraft = form.watch("aircraft");
  const tankers = form.watch("tankers");

  function onSubmit(data: z.infer<typeof coronetFormSchema>) {
    console.log("Mission Plan:", data);
    toast.success("Mission plan submitted successfully!", {
      description: `Mission ${data.missionNumber} - ${data.missionName}`,
    });
  }

  function addAircraft() {
    const currentAircraft = form.getValues("aircraft");
    form.setValue("aircraft", [
      ...currentAircraft,
      {
        tailNumber: "",
        aircraftType: "",
        callSign: "",
        pilotName: "",
        configuration: "",
        fuelLoad: 0,
      },
    ]);
  }

  function removeAircraft(index: number) {
    const currentAircraft = form.getValues("aircraft");
    if (currentAircraft.length > 1) {
      form.setValue(
        "aircraft",
        currentAircraft.filter((_, i) => i !== index)
      );
    }
  }

  function addTanker() {
    const currentTankers = form.getValues("tankers") || [];
    form.setValue("tankers", [
      ...currentTankers,
      {
        callSign: "",
        aircraftType: "",
        offloadCapacity: 0,
        arTrack: "",
        onStationTime: "",
        offStationTime: "",
      },
    ]);
  }

  function removeTanker(index: number) {
    const currentTankers = form.getValues("tankers") || [];
    if (currentTankers.length > 1) {
      form.setValue(
        "tankers",
        currentTankers.filter((_, i) => i !== index)
      );
    }
  }

  function addWaypoint() {
    const currentWaypoints = form.getValues("waypoints") || [];
    form.setValue("waypoints", [
      ...currentWaypoints,
      {
        name: "",
        coordinates: "",
        altitude: 0,
        estimatedTime: "",
        type: "enroute" as const,
      },
    ]);
  }

  function removeWaypoint(index: number) {
    const currentWaypoints = form.getValues("waypoints") || [];
    form.setValue(
      "waypoints",
      currentWaypoints.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Coronet Mission Planning
              </h1>
              <p className="text-muted-foreground mt-1">
                Fighter Deployment Mission Planning System
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {form.watch("classification")}
              </Badge>
              <Badge
                variant={
                  form.watch("priority") === "FLASH"
                    ? "destructive"
                    : form.watch("priority") === "IMMEDIATE"
                      ? "default"
                      : "secondary"
                }
                className="text-xs"
              >
                {form.watch("priority")}
              </Badge>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="mission" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                <TabsTrigger value="mission" className="gap-1.5">
                  <FileTextIcon className="size-4" />
                  <span className="hidden sm:inline">Mission</span>
                </TabsTrigger>
                <TabsTrigger value="aircraft" className="gap-1.5">
                  <PlaneIcon className="size-4" />
                  <span className="hidden sm:inline">Aircraft</span>
                </TabsTrigger>
                <TabsTrigger value="tankers" className="gap-1.5">
                  <FuelIcon className="size-4" />
                  <span className="hidden sm:inline">Tankers</span>
                </TabsTrigger>
                <TabsTrigger value="route" className="gap-1.5">
                  <MapPinIcon className="size-4" />
                  <span className="hidden sm:inline">Route</span>
                </TabsTrigger>
                <TabsTrigger value="timing" className="gap-1.5">
                  <ClockIcon className="size-4" />
                  <span className="hidden sm:inline">Timing</span>
                </TabsTrigger>
                <TabsTrigger value="personnel" className="gap-1.5">
                  <UsersIcon className="size-4" />
                  <span className="hidden sm:inline">Personnel</span>
                </TabsTrigger>
                <TabsTrigger value="comms" className="gap-1.5">
                  <RadioIcon className="size-4" />
                  <span className="hidden sm:inline">Comms</span>
                </TabsTrigger>
                <TabsTrigger value="contingency" className="gap-1.5">
                  <AlertTriangleIcon className="size-4" />
                  <span className="hidden sm:inline">Contingency</span>
                </TabsTrigger>
              </TabsList>

              {/* Mission Identification Tab */}
              <TabsContent value="mission">
                <Card>
                  <CardHeader>
                    <CardTitle>Mission Identification</CardTitle>
                    <CardDescription>
                      Basic mission information and classification
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="missionNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mission Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="COR-2024-001" {...field} />
                            </FormControl>
                            <FormDescription>
                              Unique mission identifier
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="missionName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mission Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="PACIFIC THUNDER" {...field} />
                            </FormControl>
                            <FormDescription>
                              Operation code name
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="classification"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Classification *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select classification" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="UNCLASSIFIED">
                                  UNCLASSIFIED
                                </SelectItem>
                                <SelectItem value="CONFIDENTIAL">
                                  CONFIDENTIAL
                                </SelectItem>
                                <SelectItem value="SECRET">SECRET</SelectItem>
                                <SelectItem value="TOP SECRET">
                                  TOP SECRET
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ROUTINE">ROUTINE</SelectItem>
                                <SelectItem value="PRIORITY">
                                  PRIORITY
                                </SelectItem>
                                <SelectItem value="IMMEDIATE">
                                  IMMEDIATE
                                </SelectItem>
                                <SelectItem value="FLASH">FLASH</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="missionType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mission Type *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="DEPLOYMENT">
                                  Deployment
                                </SelectItem>
                                <SelectItem value="REDEPLOYMENT">
                                  Redeployment
                                </SelectItem>
                                <SelectItem value="EXERCISE">
                                  Exercise
                                </SelectItem>
                                <SelectItem value="CONTINGENCY">
                                  Contingency
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="commandingUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Commanding Unit *</FormLabel>
                            <FormControl>
                              <Input placeholder="1st Fighter Wing" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="supportingUnits"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Supporting Units</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List supporting units, one per line"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aircraft Tab */}
              <TabsContent value="aircraft">
                <Card>
                  <CardHeader>
                    <CardTitle>Aircraft Configuration</CardTitle>
                    <CardDescription>
                      Fighter aircraft participating in the mission
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="formationType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Formation Type *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select formation" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="SINGLE">
                                  Single Ship
                                </SelectItem>
                                <SelectItem value="ELEMENT">
                                  Element (2 Ship)
                                </SelectItem>
                                <SelectItem value="FLIGHT">
                                  Flight (4 Ship)
                                </SelectItem>
                                <SelectItem value="SQUADRON">
                                  Squadron (12+ Ship)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="totalAircraft"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Aircraft *</FormLabel>
                            <FormControl>
                              <Input type="number" min={1} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Aircraft Roster</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addAircraft}
                        >
                          <PlusIcon className="mr-2 size-4" />
                          Add Aircraft
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {aircraft?.map((_, index) => (
                          <Card key={index} className="bg-muted/30">
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="grid flex-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                  <FormField
                                    control={form.control}
                                    name={`aircraft.${index}.tailNumber`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Tail Number *</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="AF 90-0001"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`aircraft.${index}.aircraftType`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Aircraft Type *</FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger className="w-full">
                                              <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {AIRCRAFT_TYPES.map((type) => (
                                              <SelectItem
                                                key={type.value}
                                                value={type.value}
                                              >
                                                {type.label}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`aircraft.${index}.callSign`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Call Sign *</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="VIPER 01"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`aircraft.${index}.pilotName`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Pilot *</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Capt Smith"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`aircraft.${index}.configuration`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Configuration *</FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger className="w-full">
                                              <SelectValue placeholder="Select config" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {CONFIGURATIONS.map((config) => (
                                              <SelectItem
                                                key={config.value}
                                                value={config.value}
                                              >
                                                {config.label}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`aircraft.${index}.fuelLoad`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Fuel Load (lbs)</FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            placeholder="7000"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                {aircraft.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="mt-6 text-destructive hover:text-destructive"
                                    onClick={() => removeAircraft(index)}
                                  >
                                    <TrashIcon className="size-4" />
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tankers Tab */}
              <TabsContent value="tankers">
                <Card>
                  <CardHeader>
                    <CardTitle>Tanker Support</CardTitle>
                    <CardDescription>
                      Aerial refueling requirements and tanker allocation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <FormField
                        control={form.control}
                        name="tankerRequired"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Tanker Support Required</FormLabel>
                              <FormDescription>
                                Mission requires aerial refueling
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    {tankerRequired && (
                      <>
                        <Separator />

                        <div className="grid gap-6 md:grid-cols-3">
                          <FormField
                            control={form.control}
                            name="refuelingType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Refueling Type</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="BOOM">
                                      Boom (USAF)
                                    </SelectItem>
                                    <SelectItem value="DROGUE">
                                      Drogue (Probe)
                                    </SelectItem>
                                    <SelectItem value="BOTH">Both</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="totalOffloadRequired"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Total Offload Required (lbs)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="50000"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">Tanker Allocation</h3>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addTanker}
                            >
                              <PlusIcon className="mr-2 size-4" />
                              Add Tanker
                            </Button>
                          </div>

                          <div className="space-y-4">
                            {tankers?.map((_, index) => (
                              <Card key={index} className="bg-muted/30">
                                <CardContent className="pt-4">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="grid flex-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                      <FormField
                                        control={form.control}
                                        name={`tankers.${index}.callSign`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Call Sign *</FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="SHELL 01"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`tankers.${index}.aircraftType`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Aircraft Type *</FormLabel>
                                            <Select
                                              onValueChange={field.onChange}
                                              value={field.value}
                                            >
                                              <FormControl>
                                                <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                {TANKER_TYPES.map((type) => (
                                                  <SelectItem
                                                    key={type.value}
                                                    value={type.value}
                                                  >
                                                    {type.label}
                                                  </SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`tankers.${index}.offloadCapacity`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Offload Capacity (lbs)</FormLabel>
                                            <FormControl>
                                              <Input
                                                type="number"
                                                placeholder="100000"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`tankers.${index}.arTrack`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>AR Track *</FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="AR-201"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormDescription>
                                              Refueling track designation
                                            </FormDescription>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`tankers.${index}.onStationTime`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>On-Station Time *</FormLabel>
                                            <FormControl>
                                              <Input
                                                type="time"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`tankers.${index}.offStationTime`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Off-Station Time *</FormLabel>
                                            <FormControl>
                                              <Input
                                                type="time"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>

                                    {tankers && tankers.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="mt-6 text-destructive hover:text-destructive"
                                        onClick={() => removeTanker(index)}
                                      >
                                        <TrashIcon className="size-4" />
                                      </Button>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Route Tab */}
              <TabsContent value="route">
                <Card>
                  <CardHeader>
                    <CardTitle>Route Planning</CardTitle>
                    <CardDescription>
                      Departure, destination, and waypoint information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Departure</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <FormField
                            control={form.control}
                            name="departureBase"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Base Name *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Langley AFB"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="departureICAO"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ICAO Code *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="KLFI"
                                    maxLength={4}
                                    className="uppercase"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/30">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Destination</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <FormField
                            control={form.control}
                            name="destinationBase"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Base Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Kadena AB" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="destinationICAO"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ICAO Code *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="RODN"
                                    maxLength={4}
                                    className="uppercase"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="primaryAlternate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Alternate</FormLabel>
                            <FormControl>
                              <Input placeholder="Yokota AB (RJTY)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="secondaryAlternate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secondary Alternate</FormLabel>
                            <FormControl>
                              <Input placeholder="Osan AB (RKSO)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="routeDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Route Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the routing, airways, and any special considerations..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />

                    {/* Waypoints */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Waypoints</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addWaypoint}
                        >
                          <PlusIcon className="mr-2 size-4" />
                          Add Waypoint
                        </Button>
                      </div>

                      {form.watch("waypoints")?.length === 0 ? (
                        <div className="rounded-md border border-dashed p-8 text-center text-muted-foreground">
                          No waypoints added. Click &quot;Add Waypoint&quot; to add route waypoints.
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Coordinates</TableHead>
                              <TableHead>Altitude (ft)</TableHead>
                              <TableHead>ETA</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead className="w-10"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {form.watch("waypoints")?.map((_, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`waypoints.${index}.name`}
                                    render={({ field }) => (
                                      <Input
                                        placeholder="WPT1"
                                        className="h-8"
                                        {...field}
                                      />
                                    )}
                                  />
                                </TableCell>
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`waypoints.${index}.coordinates`}
                                    render={({ field }) => (
                                      <Input
                                        placeholder="N36 W120"
                                        className="h-8"
                                        {...field}
                                      />
                                    )}
                                  />
                                </TableCell>
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`waypoints.${index}.altitude`}
                                    render={({ field }) => (
                                      <Input
                                        type="number"
                                        placeholder="35000"
                                        className="h-8 w-24"
                                        {...field}
                                      />
                                    )}
                                  />
                                </TableCell>
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`waypoints.${index}.estimatedTime`}
                                    render={({ field }) => (
                                      <Input
                                        type="time"
                                        className="h-8"
                                        {...field}
                                      />
                                    )}
                                  />
                                </TableCell>
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`waypoints.${index}.type`}
                                    render={({ field }) => (
                                      <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                      >
                                        <SelectTrigger className="h-8 w-28">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="departure">
                                            Departure
                                          </SelectItem>
                                          <SelectItem value="enroute">
                                            Enroute
                                          </SelectItem>
                                          <SelectItem value="refuel">
                                            Refuel
                                          </SelectItem>
                                          <SelectItem value="arrival">
                                            Arrival
                                          </SelectItem>
                                          <SelectItem value="alternate">
                                            Alternate
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    )}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="size-8 text-destructive hover:text-destructive"
                                    onClick={() => removeWaypoint(index)}
                                  >
                                    <TrashIcon className="size-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Timing Tab */}
              <TabsContent value="timing">
                <Card>
                  <CardHeader>
                    <CardTitle>Timing & Schedule</CardTitle>
                    <CardDescription>
                      Mission timeline and critical times
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="timeZone"
                      render={({ field }) => (
                        <FormItem className="max-w-xs">
                          <FormLabel>Time Reference *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select time zone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ZULU">ZULU (UTC)</SelectItem>
                              <SelectItem value="LOCAL">Local Time</SelectItem>
                              <SelectItem value="EST">Eastern (EST/EDT)</SelectItem>
                              <SelectItem value="PST">Pacific (PST/PDT)</SelectItem>
                              <SelectItem value="JST">Japan (JST)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Departure</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <FormField
                            control={form.control}
                            name="departureDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date *</FormLabel>
                                <DatePicker
                                  date={field.value}
                                  onDateChange={field.onChange}
                                />
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="departureTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Time *</FormLabel>
                                <FormControl>
                                  <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/30">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">
                            Estimated Arrival
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <FormField
                            control={form.control}
                            name="estimatedArrivalDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date *</FormLabel>
                                <DatePicker
                                  date={field.value}
                                  onDateChange={field.onChange}
                                />
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="estimatedArrivalTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Time *</FormLabel>
                                <FormControl>
                                  <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Personnel Tab */}
              <TabsContent value="personnel">
                <Card>
                  <CardHeader>
                    <CardTitle>Personnel</CardTitle>
                    <CardDescription>
                      Mission leadership and key personnel
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="missionCommander"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mission Commander *</FormLabel>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="missionCommanderRank"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rank *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select rank" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="2LT">2nd Lt</SelectItem>
                                <SelectItem value="1LT">1st Lt</SelectItem>
                                <SelectItem value="CAPT">Captain</SelectItem>
                                <SelectItem value="MAJ">Major</SelectItem>
                                <SelectItem value="LTCOL">Lt Col</SelectItem>
                                <SelectItem value="COL">Colonel</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="flightLead"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Flight Lead *</FormLabel>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deputyFlightLead"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deputy Flight Lead</FormLabel>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="intelOfficer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Intel Officer</FormLabel>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="weatherOfficer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weather Officer</FormLabel>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Communications Tab */}
              <TabsContent value="comms">
                <Card>
                  <CardHeader>
                    <CardTitle>Communications</CardTitle>
                    <CardDescription>
                      Frequencies, call signs, and COMSEC information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="primaryFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Frequency *</FormLabel>
                            <FormControl>
                              <Input placeholder="123.45" {...field} />
                            </FormControl>
                            <FormDescription>
                              Inter-flight frequency
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="secondaryFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secondary Frequency</FormLabel>
                            <FormControl>
                              <Input placeholder="234.56" {...field} />
                            </FormControl>
                            <FormDescription>
                              Backup frequency
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guardFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Guard Frequency</FormLabel>
                            <FormControl>
                              <Input {...field} disabled />
                            </FormControl>
                            <FormDescription>
                              Emergency frequency
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="satcomChannel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SATCOM Channel</FormLabel>
                            <FormControl>
                              <Input placeholder="Channel designation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="comsecRequired"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>COMSEC Required</FormLabel>
                              <FormDescription>
                                Mission requires secure communications
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      {form.watch("comsecRequired") && (
                        <FormField
                          control={form.control}
                          name="comsecKeyDate"
                          render={({ field }) => (
                            <FormItem className="max-w-xs">
                              <FormLabel>COMSEC Key Date</FormLabel>
                              <FormControl>
                                <Input placeholder="Key effective date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contingency Tab */}
              <TabsContent value="contingency">
                <Card>
                  <CardHeader>
                    <CardTitle>Contingency Planning</CardTitle>
                    <CardDescription>
                      Emergency procedures, divert bases, and minimums
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="bingoFuel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bingo Fuel (lbs)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="3000" {...field} />
                            </FormControl>
                            <FormDescription>
                              Minimum fuel to reach divert
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="jokerFuel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Joker Fuel (lbs)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="4500" {...field} />
                            </FormControl>
                            <FormDescription>
                              Warning fuel level
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fuelMinimums"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Landing Fuel Minimum (lbs)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="2000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="weatherMinimums"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weather Minimums</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ceiling 500ft / Visibility 1 mile"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="divertBases"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Divert Bases</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List divert bases with ICAO codes and runway information..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyProcedures"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Procedures</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe emergency procedures, lost comm procedures, etc..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notams"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NOTAMs</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Relevant NOTAMs affecting the mission..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specialInstructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Instructions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any additional mission-specific instructions..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 border-t pt-6">
              <Button type="button" variant="outline">
                <SaveIcon className="mr-2 size-4" />
                Save Draft
              </Button>
              <Button type="submit">
                <SendIcon className="mr-2 size-4" />
                Submit Mission Plan
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
