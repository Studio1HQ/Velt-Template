import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Lock, Save, Sparkles } from "lucide-react";

interface AdvancedFiltersProps {
  isPremium?: boolean;
}

const AdvancedFilters = ({ isPremium = false }: AdvancedFiltersProps) => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  const [confidenceThreshold, setConfidenceThreshold] = useState([75]);

  return (
    <Card className="border-gray-800 bg-gray-900 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            Advanced Filters
            {!isPremium && (
              <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs">
                PRO
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1 border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
            disabled={!isPremium}
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Filter</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!isPremium ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 rounded-full bg-gray-800 p-3">
              <Lock className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-white">
              Unlock Advanced Filtering
            </h3>
            <p className="mb-4 max-w-md text-sm text-gray-400">
              Upgrade to our Pro plan to access powerful filtering capabilities,
              including custom parameters, predictive analytics, and saved
              filter presets.
            </p>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600">
              Upgrade to Pro
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date-range" className="text-sm text-gray-300">
                  Date Range
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-range"
                      variant="outline"
                      className="w-full justify-start border-gray-700 bg-gray-800 text-left font-normal text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-gray-800 border-gray-700"
                    align="start"
                  >
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={setDateRange as any}
                      numberOfMonths={2}
                      className="bg-gray-800 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="segment" className="text-sm text-gray-300">
                  User Segment
                </Label>
                <Select defaultValue="all">
                  <SelectTrigger
                    id="segment"
                    className="border-gray-700 bg-gray-800 text-gray-300"
                  >
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-gray-300">
                    <SelectItem value="all" className="hover:bg-gray-700">
                      All Users
                    </SelectItem>
                    <SelectItem value="new" className="hover:bg-gray-700">
                      New Users
                    </SelectItem>
                    <SelectItem value="returning" className="hover:bg-gray-700">
                      Returning Users
                    </SelectItem>
                    <SelectItem value="premium" className="hover:bg-gray-700">
                      Premium Users
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confidence"
                className="text-sm text-gray-300 flex items-center gap-2"
              >
                Prediction Confidence Threshold
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              </Label>
              <div className="pt-2 pb-4">
                <Slider
                  id="confidence"
                  defaultValue={[75]}
                  max={100}
                  step={1}
                  value={confidenceThreshold}
                  onValueChange={setConfidenceThreshold}
                  className="py-2"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Low confidence (more results)</span>
                <span>{confidenceThreshold}%</span>
                <span>High confidence (fewer results)</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="custom-param" className="text-sm text-gray-300">
                  Custom Parameter
                </Label>
                <Input
                  id="custom-param"
                  placeholder="Enter parameter name"
                  className="border-gray-700 bg-gray-800 text-gray-300 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-value" className="text-sm text-gray-300">
                  Parameter Value
                </Label>
                <Input
                  id="custom-value"
                  placeholder="Enter parameter value"
                  className="border-gray-700 bg-gray-800 text-gray-300 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="predictive" />
                <Label
                  htmlFor="predictive"
                  className="text-sm text-gray-300 flex items-center gap-2"
                >
                  Enable Predictive Analytics
                  <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                </Label>
              </div>

              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600">
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedFilters;
