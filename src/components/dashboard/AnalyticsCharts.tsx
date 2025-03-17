import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download, Filter, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface AnalyticsChartsProps {
  isPremium?: boolean;
}

const AnalyticsCharts = ({ isPremium = false }: AnalyticsChartsProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("daily");
  const [selectedMetric, setSelectedMetric] = useState("users");

  // Mock data for charts
  const generateMockData = (points: number, growth: boolean = true) => {
    const data = [];
    let value = Math.floor(Math.random() * 100) + 50;

    for (let i = 0; i < points; i++) {
      if (growth) {
        value += Math.floor(Math.random() * 15) - 5;
      } else {
        value -= Math.floor(Math.random() * 10) - 5;
      }
      value = Math.max(10, value); // Ensure value doesn't go below 10
      data.push(value);
    }

    return data;
  };

  const chartData = {
    users: generateMockData(30, true),
    revenue: generateMockData(30, true),
    conversion: generateMockData(30, false),
    engagement: generateMockData(30, true),
  };

  // Calculate max value for scaling
  const maxValue = Math.max(
    ...chartData[selectedMetric as keyof typeof chartData],
  );

  return (
    <Card className="border-gray-800 bg-gray-900 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white">
            Analytics Overview
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Tabs
              defaultValue="daily"
              className="w-full sm:w-auto"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger
                  value="daily"
                  className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  Daily
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="data-[state=active]:bg-gray-700 text-gray-300 data-[state=active]:text-white"
                >
                  Monthly
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-[140px] border-gray-700 bg-gray-800 text-gray-200">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectItem value="users" className="hover:bg-gray-700">
                  Users
                </SelectItem>
                <SelectItem value="revenue" className="hover:bg-gray-700">
                  Revenue
                </SelectItem>
                <SelectItem value="conversion" className="hover:bg-gray-700">
                  Conversion
                </SelectItem>
                <SelectItem value="engagement" className="hover:bg-gray-700">
                  Engagement
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1 border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
                >
                  <CalendarIcon className="h-3.5 w-3.5" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-gray-800 border-gray-700"
                align="end"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="bg-gray-800 text-white"
                />
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
            >
              <Filter className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Filters</span>
              {isPremium && (
                <Badge className="ml-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs">
                  PRO
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Chart visualization */}
        <div className="h-[300px] w-full mt-6 relative">
          <div className="absolute inset-0 flex items-end justify-between px-2">
            {chartData[selectedMetric as keyof typeof chartData].map(
              (value, index) => {
                const height = (value / maxValue) * 100;
                return (
                  <motion.div
                    key={index}
                    className="w-1.5 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-sm"
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.02 }}
                    whileHover={{
                      scale: 1.2,
                      backgroundColor: "#8B5CF6",
                    }}
                  />
                );
              },
            )}
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-[-25px] inset-x-0 flex items-center justify-between px-2">
            {activeTab === "daily" && (
              <>
                <span className="text-xs text-gray-400">1</span>
                <span className="text-xs text-gray-400">5</span>
                <span className="text-xs text-gray-400">10</span>
                <span className="text-xs text-gray-400">15</span>
                <span className="text-xs text-gray-400">20</span>
                <span className="text-xs text-gray-400">25</span>
                <span className="text-xs text-gray-400">30</span>
              </>
            )}
            {activeTab === "weekly" && (
              <>
                <span className="text-xs text-gray-400">Week 1</span>
                <span className="text-xs text-gray-400">Week 2</span>
                <span className="text-xs text-gray-400">Week 3</span>
                <span className="text-xs text-gray-400">Week 4</span>
              </>
            )}
            {activeTab === "monthly" && (
              <>
                <span className="text-xs text-gray-400">Jan</span>
                <span className="text-xs text-gray-400">Feb</span>
                <span className="text-xs text-gray-400">Mar</span>
                <span className="text-xs text-gray-400">Apr</span>
                <span className="text-xs text-gray-400">May</span>
                <span className="text-xs text-gray-400">Jun</span>
                <span className="text-xs text-gray-400">Jul</span>
                <span className="text-xs text-gray-400">Aug</span>
                <span className="text-xs text-gray-400">Sep</span>
                <span className="text-xs text-gray-400">Oct</span>
                <span className="text-xs text-gray-400">Nov</span>
                <span className="text-xs text-gray-400">Dec</span>
              </>
            )}
          </div>

          {/* Y-axis labels */}
          <div className="absolute left-[-35px] inset-y-0 flex flex-col items-end justify-between py-2">
            <span className="text-xs text-gray-400">{maxValue}</span>
            <span className="text-xs text-gray-400">
              {Math.round(maxValue * 0.75)}
            </span>
            <span className="text-xs text-gray-400">
              {Math.round(maxValue * 0.5)}
            </span>
            <span className="text-xs text-gray-400">
              {Math.round(maxValue * 0.25)}
            </span>
            <span className="text-xs text-gray-400">0</span>
          </div>
        </div>

        {/* Premium feature teaser */}
        {!isPremium && (
          <div className="mt-8 rounded-lg border border-dashed border-gray-700 bg-gray-800/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">
                  Unlock Advanced Analytics
                </h4>
                <p className="text-xs text-gray-400">
                  Get access to predictive insights and advanced filtering
                  options
                </p>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
              >
                Upgrade to Pro
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCharts;
