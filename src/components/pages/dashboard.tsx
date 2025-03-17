import { DOCUMENTID } from "@/lib/constant";
import TopNavigation from "../dashboard/layout/TopNavigation";
import AnalyticsDashboard from "./analytics-dashboard";
import { 
  useSetDocument, 
  VeltPresence, 
  VeltCursor, 
  VeltComments, 
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
    <div className="min-h-screen bg-white flex">
      <TopNavigation />      
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex-1">
          {/* Enable Velt features */}
          <VeltPresence />
          <VeltCursor />
          
          {/* Main dashboard content */}
          <AnalyticsDashboard />
          
          {/* Comments Sidebar */}
          <VeltCommentsSidebar />
          
          {/* Comment Tool Button */}
          <div className="fixed bottom-4 right-4">
            <VeltCommentTool />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
