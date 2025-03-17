import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle2, Github } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <div>
              <Badge className="mb-4 bg-blue-900/50 text-blue-300 hover:bg-blue-800/60 border-none">
                New Release v1.0
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Data Insights with Analytics Dashboard
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-400">
              A sleek, dark-themed analytics platform with interactive
              visualizations, powerful filtering, and AI-powered insights to
              transform your data into actionable intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="bg-black border-gray-700 text-white hover:border-black-600 hover:text-black w-full sm:w-auto"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
              <span>No credit card required</span>
              <Separator
                orientation="vertical"
                className="h-4 mx-2 bg-gray-700"
              />
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
              <span>Free tier available</span>
              <Separator
                orientation="vertical"
                className="h-4 mx-2 bg-gray-700"
              />
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
              <span>Open source</span>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-blue-900/30 via-purple-800/20 to-gray-900/10 rounded-3xl blur-2xl transform scale-110" />
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-blue-800 via-purple-700 to-gray-800 rounded-t-xl">
                <div className="flex items-center gap-2 px-3 py-1">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="ml-2 text-xs text-white font-medium">
                    Tempo App
                  </div>
                </div>
              </div>
              <div className="p-6">
                <pre className="text-sm text-gray-400 overflow-x-auto">
                  <code>{`import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Authentication is simple
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password'
})

// Ready to build your app!`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-900/20 blur-[100px]" />
      <div className="absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-purple-900/20 blur-[100px]" />
    </section>
  );
};

export default HeroSection; 