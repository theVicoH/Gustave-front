"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-16">
        <p className="text-black font-medium mb-4">Pricing</p>
        <h1 className="text-4xl font-bold text-black mb-6">
          Choose the right plan for you
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose an affordable plan that&apos;s packed with the best features
          for engaging your audience, creating customer loyalty, and driving
          sales.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Carte Hobby */}
          <Card className="bg-white">
            <CardHeader>
              <p className="text-black font-medium">Hobby</p>
              <div className="flex items-baseline mt-3">
                <span className="text-5xl font-bold text-black">$29</span>
                <span className="ml-1 text-gray-600">/month</span>
              </div>
              <p className="mt-4 text-gray-600">
                Modi dolorem expedita deleniti. Corporis iste qui inventore
                pariatur adipisci vitae.
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <Feature>5 products</Feature>
                <Feature>Up to 1,000 subscribers</Feature>
                <Feature>Basic analytics</Feature>
                <Feature>48-hour support response time</Feature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-black text-white hover:bg-gray-900">
                Get started today
              </Button>
            </CardFooter>
          </Card>

          {/* Carte Team */}
          <Card className="bg-white">
            <CardHeader>
              <p className="text-black font-medium">Team</p>
              <div className="flex items-baseline mt-3">
                <span className="text-5xl font-bold text-black">$99</span>
                <span className="ml-1 text-gray-600">/month</span>
              </div>
              <p className="mt-4 text-gray-600">
                Explicabo quo fugit vel facere ullam corrupti non dolores.
                Expedita eius sit sequi.
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <Feature>Unlimited products</Feature>
                <Feature>Unlimited subscribers</Feature>
                <Feature>Advanced analytics</Feature>
                <Feature>1-hour, dedicated support response time</Feature>
                <Feature>Marketing automations</Feature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-black text-white hover:bg-gray-900">
                Get started today
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Section réduite */}
        <div className="mt-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-black font-medium">Discounted</p>
                  <p className="text-gray-600 mt-2">
                    Dolor dolores repudiandae doloribus. Rerum sunt aut eum.
                    Odit omnis non voluptatem sunt eos nostrum.
                  </p>
                </div>
                <Button className="whitespace-nowrap bg-transparent border border-black text-black hover:bg-black hover:text-white transition-colors">
                  Buy discounted license →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-gray-600">
      <Check className="h-5 w-5 text-black" />
      <span>{children}</span>
    </li>
  );
}
