import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Moon, Filter, TrendingUp } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const FeaturesSection: React.FC = () => {
  // Sample features data
  const features: Feature[] = [
    {
      title: "Interactive Visualizations",
      description:
        "Explore your data with beautiful, interactive charts and graphs with smooth transitions.",
      icon: <BarChart2 className="h-10 w-10 text-white" />,
    },
    {
      title: "Dark Theme Interface",
      description:
        "Reduce eye strain with our sleek dark-themed dashboard designed for extended use.",
      icon: <Moon className="h-10 w-10 text-white" />,
    },
    {
      title: "Advanced Filtering",
      description:
        "Filter and segment your data with powerful tools to uncover hidden insights.",
      icon: <Filter className="h-10 w-10 text-white" />,
    },
    {
      title: "Predictive Analytics",
      description:
        "Premium features include AI-powered predictions to help you make data-driven decisions.",
      icon: <TrendingUp className="h-10 w-10 text-white" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-900/50 text-blue-300 hover:bg-blue-800/60 border-none">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Powerful Analytics at Your Fingertips
          </h2>
          <p className="text-gray-400 max-w-[700px] mx-auto">
            Our analytics dashboard combines beautiful visualizations with
            powerful filtering capabilities to help you extract meaningful
            insights from your data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-gray-800 bg-gradient-to-b from-gray-800 to-gray-900 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 