
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  change,
  trend = "neutral"
}) => {
  return (
    <Card className="overflow-hidden animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={cn("p-2 rounded-md", color)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="text-2xl font-bold text-gray-900 mt-1">{value}</h4>
          </div>
          {change && (
            <div 
              className={cn(
                "flex items-center text-sm font-medium",
                trend === "up" ? "text-green-600" : 
                trend === "down" ? "text-red-600" : 
                "text-gray-500"
              )}
            >
              {trend === "up" && <TrendingUp className="mr-1 h-4 w-4" />}
              {trend === "down" && <TrendingDown className="mr-1 h-4 w-4" />}
              {trend === "neutral" && <Minus className="mr-1 h-4 w-4" />}
              {change}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
