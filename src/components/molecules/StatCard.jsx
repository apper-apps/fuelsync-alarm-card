import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const StatCard = ({ icon, title, value, unit, subtitle, trend, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn("", className)}
    >
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-primary/10 rounded-full -translate-y-6 translate-x-6"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
              <ApperIcon name={icon} size={20} className="text-primary" />
            </div>
            <h3 className="text-sm font-medium text-secondary-600">{title}</h3>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-secondary-800 animate-count-up">
                {value}
              </span>
              {unit && (
                <span className="text-sm text-secondary-500">{unit}</span>
              )}
            </div>
            
            {subtitle && (
              <p className="text-xs text-secondary-500">{subtitle}</p>
            )}
            
            {trend && (
              <div className="flex items-center gap-1 text-xs">
                <ApperIcon 
                  name={trend > 0 ? "TrendingUp" : "TrendingDown"} 
                  size={12} 
                  className={trend > 0 ? "text-success" : "text-error"}
                />
                <span className={trend > 0 ? "text-success" : "text-error"}>
                  {Math.abs(trend)}%
                </span>
                <span className="text-secondary-500">vs last month</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;