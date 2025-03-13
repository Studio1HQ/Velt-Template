import { useState, useEffect } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import MetricCards from "../dashboard/MetricCards";
import AnalyticsCharts from "../dashboard/AnalyticsCharts";
import DataVisualizations from "../dashboard/DataVisualizations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BarChart3, Activity } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSetDocument, VeltComments, VeltCommentsSidebar } from "@veltdev/react";
import { DOCUMENTID } from "@/lib/constant";

const AnalyticsDashboard = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, supabase } = useAuth();
  const navigate = useNavigate();

  // Initialize Velt document for analytics dashboard
  const documentId = DOCUMENTID;
  useSetDocument(documentId, {
    documentName: "Analytics Dashboard",
    lastUpdated: new Date().toISOString(),
  });

  // Check if user is subscribed
  useEffect(() => {
    const checkSubscription = async () => {
      if (user) {
        try {
          setIsLoading(true);
          // Query the subscriptions table to check if the user has an active subscription
          const { data, error } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .single();

          if (error) {
          } else if (data) {
            setIsPremium(true);
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    checkSubscription();
  }, [user, supabase]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleUpgradeClick = () => {
    navigate("/plans");
    toast.info('Choose a subscription plan to unlock premium features');
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <TopNavigation />

      <div className="flex">
        
        <main className="flex-1 overflow-auto p-6">
          {/* Enable Velt Comments with popover mode */}
          <VeltComments 
            popoverMode={true} 
            popoverTriangleComponent={true} 
          />
          
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400">
                Interactive data visualizations and insights
              </p>
            </div>

            {!isPremium && !isLoading && (
              <Button
                onClick={handleUpgradeClick}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Upgrade to Pro
                <Badge className="ml-1 bg-white/20 text-white text-xs">
                  SAVE 20%
                </Badge>
              </Button>
            )}
            
            {isPremium && (
              <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-3 py-1">
                Premium Account
              </Badge>
            )}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-900 border border-gray-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-600">
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-indigo-600">
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <MetricCards />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsCharts isPremium={isPremium} />
                <DataVisualizations isPremium={isPremium} />
              </div>

              
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">User Activity</CardTitle>
                  <CardDescription className="text-gray-400">
                    Monitor user engagement and activity patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-min-screen bg-gray-800 rounded-md p-4">
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex items-center justify-between p-3 bg-gray-850 rounded-md border border-gray-700">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                              {String.fromCharCode(64 + item)}
                            </div>
                            <div className="ml-3">
                              <p className="text-white">User Activity {item}</p>
                              <p className="text-gray-400 text-sm">{new Date().toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-indigo-400 border-indigo-400">
                            {Math.floor(Math.random() * 100)}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Comments Sidebar */}
          <div className="fixed right-0 top-0 h-full">
            <VeltCommentsSidebar />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
