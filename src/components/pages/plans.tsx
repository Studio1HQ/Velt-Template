import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import TopNavigation from "../dashboard/layout/TopNavigation";
import { Shield, Users, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import PricingSection from "../landing/PricingSection";

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

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      toast.error("Please sign in to subscribe to a plan.");
      navigate("/login?redirect=pricing");
      return;
    }

    setProcessingPlanId(priceId);
    setIsLoading(true);

    try {
      // First, get the user's user_id from the users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("user_id")
        .eq("id", user.id)
        .single();

      if (userError) {
        console.error("Error fetching user data:", userError);
        throw new Error("Could not retrieve user information");
      }

      if (!userData?.user_id) {
        console.error("User not found or user_id is missing");
        throw new Error("User information is incomplete");
      }

      // Now create the checkout session with the correct user_id
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-create-checkout",
        {
          body: {
            price_id: priceId,
            user_id: userData.user_id, // Use the text user_id instead of UUID
            return_url: `${window.location.origin}/dashboard`,
          },
          headers: {
            "X-Customer-Email": user.email || "",
          },
        }
      );

      if (error) {
        throw error;
      }

      // Redirect to Stripe checkout
      if (data?.url) {
        toast.success("Redirecting to checkout...");
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      toast.error("Failed to process subscription. Please try again.");
    } finally {
      setIsLoading(false);
      setProcessingPlanId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      <TopNavigation />

      <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <PricingSection 
          plans={plans}
          isLoading={isLoading}
          error={error}
          processingPlanId={processingPlanId}
          handleCheckout={handleCheckout}
          setError={setError}
        />

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-12 shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-900 p-3 rounded-full">
              <Shield className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">100% Secure Payments</h3>
              <p className="text-gray-400">
                All payments are processed securely through our payment
                provider. We do not store your credit card information. You can
                cancel your subscription at any time.
              </p>
            </div>
          </div>
        </div>
        
        {/* Velt Collaboration Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-12 shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-blue-900 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Team Collaboration Included</h3>
              <p className="text-gray-400 mb-4">
                All plans include Velt collaboration tools that make teamwork simple:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-300">See who's online</p>
                    <p className="text-sm text-gray-400">Know when teammates are viewing the same page</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-300">Add comments</p>
                    <p className="text-sm text-gray-400">Leave feedback directly on any element</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-300">Follow cursors</p>
                    <p className="text-sm text-gray-400">See where teammates are pointing in real-time</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-300">Resolve tasks</p>
                    <p className="text-sm text-gray-400">Track and complete work from comments</p>
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
