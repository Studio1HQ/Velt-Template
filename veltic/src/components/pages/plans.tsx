import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TopNavigation from '../dashboard/layout/TopNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, ChevronRight, Loader2, Shield, Users } from 'lucide-react';
import { toast } from 'sonner';

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

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, supabase } = useAuth();
  const navigate = useNavigate();

  // Fetch plans using the Supabase Edge Function
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      
      // Use the Supabase client to call the Edge Function
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-get-plans",
      );

      if (error) {
        throw error;
      }

      setPlans(data || []);
      setError(null);
    } catch (error) {
      setError("Failed to load plans. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0
    });
    
    return formatter.format(amount / 100);
  };

  // Get features based on plan type
  const getPlanFeatures = (plan: Plan) => {
    // Determine plan type based on price
    let planType = 'basic';
    
    if (plan.amount === 0) {
      planType = 'basic';
    } else if (plan.amount === 10) {
      planType = 'pro';
    } else {
      planType = 'enterprise';
    }
    
    const features = {
      basic: [
        'Basic analytics dashboard',
        'Limited data visualizations',
        'Standard support',
        'Up to 5 projects'
      ],
      pro: [
        'Advanced analytics dashboard',
        'Full data visualizations',
        'Heat map visualization',
        'Advanced filters',
        'Priority support',
        'Up to 20 projects'
      ],
      enterprise: [
        'Custom analytics dashboard',
        'Unlimited data visualizations',
        'Heat map visualization',
        'Advanced filters',
        'Team collaboration',
        'Dedicated support',
        'Unlimited projects'
      ]
    };
    
    return features[planType as keyof typeof features] || features.basic;
  };

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      toast.error('Please sign in to subscribe to a plan.');
      navigate('/login?redirect=pricing');
      return;
    }

    setProcessingPlanId(priceId);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-create-checkout",
        {
          body: {
            price_id: priceId,
            user_id: user.id,
            return_url: `${window.location.origin}/dashboard`,
          },
          headers: {
            "X-Customer-Email": user.email || "",
          },
        },
      );

      if (error) {
        throw error;
      }

      // Redirect to Stripe checkout
      if (data?.url) {
        toast.success('Redirecting to checkout...');
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      toast.error('Failed to process subscription. Please try again.');
    } finally {
      setIsLoading(false);
      setProcessingPlanId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unlock advanced analytics features and visualizations with our premium plans.
            Choose the plan that best fits your needs.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-opacity-20 border-t-indigo-500 rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className="flex flex-col h-full border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-lg hover:shadow-xl transition-all"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold text-black">
                      {plan.amount === 0 ? "Basic" : 
                       plan.amount <= 2900 ? "Pro" : "Enterprise"}
                    </CardTitle>
                    {plan.active && (
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-800 border-gray-300"
                      >
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm text-gray-600">
                    {plan.interval_count === 1
                      ? "Monthly"
                      : `Every ${plan.interval_count} ${plan.interval}s`}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-black">
                      {formatCurrency(plan.amount, plan.currency)}
                    </span>
                    <span className="text-gray-600">/{plan.interval}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Separator className="my-4 bg-gray-200" />
                  <ul className="space-y-3">
                    {getPlanFeatures(plan).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start text-gray-700"
                      >
                        <CheckCircle2 className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-black text-white hover:bg-gray-800"
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
        )}
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-12 shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">100% Secure Payments</h3>
              <p className="text-gray-600">
                All payments are processed securely through our payment provider. 
                We do not store your credit card information. You can cancel your subscription at any time.
              </p>
            </div>
          </div>
        </div>
        
        {/* Velt Collaboration Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-12 shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Team Collaboration Included</h3>
              <p className="text-gray-600 mb-4">
                All plans include Velt collaboration tools that make teamwork simple:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">See who's online</p>
                    <p className="text-sm text-gray-600">Know when teammates are viewing the same page</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Add comments</p>
                    <p className="text-sm text-gray-600">Leave feedback directly on any element</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Follow cursors</p>
                    <p className="text-sm text-gray-600">See where teammates are pointing in real-time</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Resolve tasks</p>
                    <p className="text-sm text-gray-600">Track and complete work from comments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans; 