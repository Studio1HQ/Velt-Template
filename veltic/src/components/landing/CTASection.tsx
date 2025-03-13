import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Data?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-400">
              Join organizations that are already unlocking insights and
              making data-driven decisions with our analytics platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto"
                >
                  Get Started Free
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="bg-black border-gray-700 text-white hover:border-gray-600 hover:text-black w-full sm:w-auto"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 