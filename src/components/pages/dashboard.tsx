import { DOCUMENTID } from "@/lib/constant";
import TopNavigation from "../dashboard/layout/TopNavigation";
import AnalyticsDashboard from "./analytics-dashboard";
import { 
  useSetDocument, 
  VeltPresence, 
  VeltCursor, 
  VeltCommentsSidebar,
  VeltCommentTool
} from "@veltdev/react";

const Dashboard = () => {
  const documentId = DOCUMENTID;
  useSetDocument(documentId, {
    documentName: "Dashboard",
    lastUpdated: new Date().toISOString(),
  });

  return (
    <div className="min-h-screen flex">
      <TopNavigation />      
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex-1">
          {/* [VELT] Presence Component. Used to display the user's presence. */}
          <VeltPresence />
          {/* [VELT] Cursor Component. Used to display the user's cursor. */}
          <VeltCursor />
          
          {/* Main dashboard content */}
          <AnalyticsDashboard />
          
          {/* [VELT] Comments Sidebar Component. Used to display the comments sidebar. */}
          <VeltCommentsSidebar />
          
          {/* [VELT] Comment Tool Button Component. Used to display the comment tool button. */}
          <div className="fixed bottom-4 right-4 animate-pulse">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-sm"></div>
            <div className="relative">
              <VeltCommentTool />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
