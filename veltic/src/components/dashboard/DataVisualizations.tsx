import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LineChart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataVisualizationsProps {
  isPremium?: boolean;
}

interface DataPoint {
  x: number;
  y: number;
  date: string;
}

const DataVisualizations = ({ isPremium = false }: DataVisualizationsProps) => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("7days");
  const [dataType, setDataType] = useState("views");
  const [data, setData] = useState<DataPoint[]>([]);

  // Generate mock data based on filters
  useEffect(() => {
    const generateData = () => {
      const points: DataPoint[] = [];
      const days = timeRange === "7days" ? 7 : timeRange === "14days" ? 14 : 30;
      const maxValue = dataType === "views" ? 1000 : dataType === "users" ? 500 : 100;
      
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        points.push({
          x: i,
          y: Math.floor(Math.random() * maxValue) + maxValue / 2,
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        });
      }
      return points;
    };

    setData(generateData());
  }, [timeRange, dataType]);

  // Calculate SVG dimensions and scales
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };
  const width = 800;
  const height = 400;
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  const xScale = (x: number) => (x * graphWidth / (data.length - 1)) + margin.left;
  const yScale = (y: number) => {
    const maxY = Math.max(...data.map(d => d.y));
    return height - margin.bottom - ((y / maxY) * graphHeight);
  };

  // Generate line path
  const linePath = data
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${xScale(point.x)} ${yScale(point.y)}`)
    .join(' ');

  const handleUpgradeClick = () => {
    navigate("/plans");
  };

  // Y-axis ticks
  const yAxisTicks = () => {
    const maxY = Math.max(...data.map(d => d.y));
    const ticks = [];
    for (let i = 0; i <= 5; i++) {
      const value = (maxY / 5) * i;
      ticks.push(
        <g key={`y-tick-${i}`}>
          <line
            x1={margin.left - 5}
            y1={yScale(value)}
            x2={margin.left}
            y2={yScale(value)}
            stroke="#4B5563"
          />
          <text
            x={margin.left - 10}
            y={yScale(value)}
            textAnchor="end"
            alignmentBaseline="middle"
            fill="#9CA3AF"
            fontSize="12"
          >
            {Math.round(value)}
          </text>
          <line
            x1={margin.left}
            y1={yScale(value)}
            x2={width - margin.right}
            y2={yScale(value)}
            stroke="#374151"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </g>
      );
    }
    return ticks;
  };

  return (
    <Card className="border-gray-800 bg-gray-900 shadow-xl relative overflow-hidden w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Advanced Line Graph
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs">
              PRO
            </Badge>
          </CardTitle>
          
          {isPremium && (
            <div className="flex gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-gray-200">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="7days">7 Days</SelectItem>
                  <SelectItem value="14days">14 Days</SelectItem>
                  <SelectItem value="30days">30 Days</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={dataType} onValueChange={setDataType}>
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-gray-200">
                  <SelectValue placeholder="Data Type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="views">Page Views</SelectItem>
                  <SelectItem value="users">Active Users</SelectItem>
                  <SelectItem value="conversions">Conversions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="relative">
          <svg width={width} height={height} className={`${!isPremium ? 'blur-sm' : ''}`}>
            {/* Y-axis */}
            <line
              x1={margin.left}
              y1={margin.top}
              x2={margin.left}
              y2={height - margin.bottom}
              stroke="#4B5563"
              strokeWidth="1"
            />
            {yAxisTicks()}

            {/* X-axis */}
            <line
              x1={margin.left}
              y1={height - margin.bottom}
              x2={width - margin.right}
              y2={height - margin.bottom}
              stroke="#4B5563"
              strokeWidth="1"
            />

            {/* X-axis labels */}
            {data.map((point, i) => (
              <text
                key={`x-label-${i}`}
                x={xScale(point.x)}
                y={height - margin.bottom + 20}
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="12"
              >
                {point.date}
              </text>
            ))}

            {/* Line graph */}
            <AnimatePresence>
              <motion.path
                key={`${timeRange}-${dataType}`}
                d={linePath}
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </AnimatePresence>

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>

            {/* Data points */}
            {data.map((point, i) => (
              <motion.circle
                key={`${timeRange}-${dataType}-${i}`}
                cx={xScale(point.x)}
                cy={yScale(point.y)}
                r="4"
                fill="#8B5CF6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.5 }}
              >
                <title>{`${point.date}: ${point.y} ${dataType}`}</title>
              </motion.circle>
            ))}
          </svg>

          {/* Lock overlay for non-premium users */}
          {!isPremium && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/50 backdrop-blur-[2px]">
              <Lock className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-300 mb-4 text-center">
                Unlock Advanced Line Graph Analytics<br />
                with Premium Subscription
              </p>
              <Button
                onClick={handleUpgradeClick}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Upgrade to PRO
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataVisualizations;
