import { ReactNode } from "react";
import { Zap } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <Zap className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Tempo + Velt</h1>
          <p className="text-gray-400 mt-2">
            Analytics dashboard with real-time collaboration
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
