import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  Users,
  DollarSign,
  BarChart2,
  Clock,
  MessageCircle
} from "lucide-react";
import { VeltCommentTool, VeltCommentBubble } from "@veltdev/react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  id: string;
}

const MetricCard = ({ title, value, change, icon, id }: MetricCardProps) => {
  const isPositive = change >= 0;
  const [isHovered, setIsHovered] = useState(false);
  const [showCommentBubble, setShowCommentBubble] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const commentCheckInterval = useRef<number | null>(null);
  const commentToolRef = useRef<HTMLDivElement>(null);

  // Set up event listeners for comment events
  useEffect(() => {
    const handleCommentEvent = () => {
      // Force re-render to update UI
      setForceUpdate(prev => prev + 1);
      
      // Check for comment bubble visibility
      const checkCommentBubble = () => {
        // Get the comment bubble element
        const bubbleElement = document.querySelector(`[data-velt-comment-bubble-target-id="${id}"]`);
        
        // Check if there are any comments by looking for the count element
        const countElement = document.querySelector(`[data-velt-comment-bubble-target-id="${id}"] [data-velt-comment-count]`);
        const count = countElement ? parseInt(countElement.textContent || '0', 10) : 0;
        
        // Show bubble only if there are comments
        setShowCommentBubble(count > 0);
      };
      
      // Schedule multiple checks to handle async updates
      if (commentCheckInterval.current) {
        window.clearInterval(commentCheckInterval.current);
      }
      
      // Check immediately
      checkCommentBubble();
      
      // Then check a few more times with delay
      commentCheckInterval.current = window.setInterval(() => {
        checkCommentBubble();
      }, 500) as unknown as number;
      
      // Clear interval after a few seconds
      setTimeout(() => {
        if (commentCheckInterval.current) {
          window.clearInterval(commentCheckInterval.current);
          commentCheckInterval.current = null;
        }
        // Final check
        checkCommentBubble();
      }, 2000);
    };
    
    // Listen for Velt events
    window.addEventListener('velt:comment:added', handleCommentEvent);
    window.addEventListener('velt:comment:deleted', handleCommentEvent);
    window.addEventListener('velt:thread:deleted', handleCommentEvent);
    window.addEventListener('velt:comment:updated', handleCommentEvent);
    
    // Custom event for manual refresh
    window.addEventListener('velt-comment-refresh', handleCommentEvent);
    
    // Initial check
    setTimeout(handleCommentEvent, 500);
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('velt:comment:added', handleCommentEvent);
      window.removeEventListener('velt:comment:deleted', handleCommentEvent);
      window.removeEventListener('velt:thread:deleted', handleCommentEvent);
      window.removeEventListener('velt:comment:updated', handleCommentEvent);
      window.removeEventListener('velt-comment-refresh', handleCommentEvent);
      
      // Clear any running intervals
      if (commentCheckInterval.current) {
        window.clearInterval(commentCheckInterval.current);
      }
    };
  }, [id]);

  useEffect(() => {
    const handleCommentDeleted = () => {
      setTimeout(() => {
        setForceUpdate(prev => prev + 1);
        
        window.dispatchEvent(new CustomEvent('velt-force-refresh', {
          detail: { elementId: id }
        }));
      }, 200);
    };

    window.addEventListener('velt:thread:deleted', handleCommentDeleted);
    window.addEventListener('velt:comment:deleted', handleCommentDeleted);
    
    return () => {
      window.removeEventListener('velt:thread:deleted', handleCommentDeleted);
      window.removeEventListener('velt:comment:deleted', handleCommentDeleted);
    };
  }, [id]);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      key={`metric-card-${id}-${forceUpdate}`}
    >
      <Card 
        id={id} 
        className="border-gray-800 bg-gray-900 shadow-md hover:shadow-lg transition-shadow"
        data-velt-comment="true"
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">
            {title}
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-gray-800 p-1.5 text-gray-300">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="mt-1 flex items-center text-xs">
            {isPositive ? (
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
            ) : (
              <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
            )}
            <span
              className={`font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {Math.abs(change)}%
            </span>
            <span className="ml-1 text-gray-400">from last period</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Always render the comment tool with a key that changes on forceUpdate */}
      <div 
        ref={commentToolRef}
        className={`absolute top-2 right-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <VeltCommentTool 
          targetElementId={id} 
          key={`comment-tool-${id}-${forceUpdate}`}
        />
      </div>
      
      {/* Comment bubble - only shown when there are comments */}
      {showCommentBubble && (
        <div className="absolute bottom-2 right-2">
          <VeltCommentBubble 
            targetElementId={id}
            commentCountType="total"
          />
        </div>
      )}
    </div>
  );
};

const MetricCards = () => {
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('velt-comment-refresh'));
    }, 1000);
  }, []);

  const metrics = [
    {
      title: "Total Users",
      value: "2,543",
      change: 12.5,
      icon: <Users className="h-5 w-5" />,
      id: "metric-card-users",
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: 8.2,
      icon: <DollarSign className="h-5 w-5" />,
      id: "metric-card-revenue",
    },
    {
      title: "Conversion Rate",
      value: "3.6%",
      change: -2.3,
      icon: <BarChart2 className="h-5 w-5" />,
      id: "metric-card-conversion",
    },
    {
      title: "Avg. Session",
      value: "2m 56s",
      change: 14.6,
      icon: <Clock className="h-5 w-5" />,
      id: "metric-card-session",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard 
          key={`${metric.id}-${index}`}
          {...metric} 
        />
      ))}
    </div>
  );
};

export default MetricCards;
