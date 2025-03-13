import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ChevronRight, Loader2, X } from "lucide-react";

// Define the Plan type
interface Plan {
  id: string;
  object: string;
  active: boolean;
  amount: number;
  currency: string;
  interval: string;
  interval_count: number;
  product: string;
  created: number;
  livemode: boolean;
  [key: string]: any;
}

interface PricingSectionProps {
  plans: Plan[];
  isLoading: boolean;
  error: string;
  processingPlanId: string | null;
  handleCheckout: (priceId: string) => Promise<void>;
  setError: (error: string) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  plans,
  isLoading,
  error,
  processingPlanId,
  handleCheckout,
  setError
}) => {
  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    });

    return formatter.format(amount / 100);
  };

  // Plan features
  const getPlanFeatures = (plan: Plan) => {
    // Determine plan type based on price
    let planType = 'basic';
    
    if (plan.amount === 0) {
      planType = 'basic';
    } else if (plan.amount === 10) {
      planType = 'pro';
    } else if (plan.amount === 15) {
      planType = 'enterprise';
    }
    
    const basicFeatures = [
      "Core application features",
      "Basic authentication",
      "1GB storage",
      "Community support",
    ];

    const proFeatures = [
      ...basicFeatures,
      "Advanced analytics",
      "Priority support",
      "10GB storage",
      "Custom branding",
    ];

    const enterpriseFeatures = [
      ...proFeatures,
      "Dedicated account manager",
      "Custom integrations",
      "Unlimited storage",
      "SLA guarantees",
    ];

    if (planType === 'pro') return proFeatures;
    if (planType === 'enterprise') return enterpriseFeatures;
    return basicFeatures;
  };

  return (
    <section className="py-16 md:py-24 bg-gray-950">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-900/50 text-blue-300 hover:bg-blue-800/60 border-none">
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-[700px] mx-auto">
            Choose the perfect plan for your needs. All plans include access
            to our core features. No hidden fees or surprises.
          </p>
        </div>

        {error && (
          <div
            className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
            <button
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setError("")}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className="flex flex-col h-full border-gray-800 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg hover:shadow-xl transition-all"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold text-white">
                    {plan.amount === 0 ? "Basic" : 
                     plan.amount <= 2900 ? "Pro" : "Enterprise"}
                  </CardTitle>
                  {plan.active && (
                    <Badge
                      variant="outline"
                      className="bg-blue-900/30 text-blue-300 border-blue-800"
                    >
                      Popular
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm text-gray-400">
                  {plan.interval_count === 1
                    ? "Monthly"
                    : `Every ${plan.interval_count} ${plan.interval}s`}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">
                    {formatCurrency(plan.amount, plan.currency)}
                  </span>
                  <span className="text-gray-400">/{plan.interval}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <Separator className="my-4 bg-gray-700" />
                <ul className="space-y-3">
                  {getPlanFeatures(plan).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start text-gray-300"
                    >
                      <CheckCircle2 className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => handleCheckout(plan.id)}
                  disabled={isLoading}
                >
                  {isLoading && processingPlanId === plan.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Subscribe Now
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 