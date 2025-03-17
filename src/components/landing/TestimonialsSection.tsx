import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

// Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

const TestimonialsSection: React.FC = () => {
  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechFlow",
      content:
        "Tempo Starter Kit has dramatically reduced our development time. The integration with Supabase is seamless and the UI components are beautiful.",
      avatar: "sarah",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Lead Developer",
      company: "InnovateCorp",
      content:
        "I've tried many starter kits, but Tempo stands out with its performance and developer experience. Highly recommended for any modern web project.",
      avatar: "michael",
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Product Manager",
      company: "DigitalWave",
      content:
        "Our team was able to launch our MVP in record time thanks to Tempo. The authentication and database features saved us weeks of development.",
      avatar: "aisha",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-900/50 text-blue-300 hover:bg-blue-800/60 border-none">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Loved by Developers
          </h2>
          <p className="text-gray-400 max-w-[700px] mx-auto">
            See what our users have to say about Tempo Starter Kit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-gray-800 bg-gradient-to-b from-gray-800 to-gray-900 shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.avatar}`}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base text-white">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-400">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 