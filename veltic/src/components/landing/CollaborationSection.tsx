import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, MousePointer, CheckSquare } from "lucide-react";

const CollaborationSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-950">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-900/50 text-blue-300 hover:bg-blue-800/60 border-none">
            Collaboration
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Work Together Seamlessly
          </h2>
          <p className="text-gray-400 max-w-[700px] mx-auto">
            Built-in collaboration tools help your team work together effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border-gray-800 bg-gray-900 shadow-md">
            <CardHeader>
              <div className="bg-blue-900/30 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-lg text-white">See Who's Online</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Know when teammates are viewing the same page as you in real-time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900 shadow-md">
            <CardHeader>
              <div className="bg-blue-900/30 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-lg text-white">Add Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Leave feedback directly on any element without switching context.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900 shadow-md">
            <CardHeader>
              <div className="bg-blue-900/30 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <MousePointer className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-lg text-white">Follow Cursors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                See where teammates are pointing and clicking in real-time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900 shadow-md">
            <CardHeader>
              <div className="bg-blue-900/30 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <CheckSquare className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-lg text-white">Resolve Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Track and complete work items created from comments.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection; 