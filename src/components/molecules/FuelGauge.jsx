import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const FuelGauge = ({ level = 0.7, mileage = 0, className = "" }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (level * circumference);

  return (
    <div className={`relative w-32 h-32 ${className}`}>
      <svg
        className="w-full h-full -rotate-90"
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        
        {/* Fuel level circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="url(#fuelGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="fuelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#FF4500" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <ApperIcon name="Fuel" size={20} className="text-primary mb-1" />
        <div className="text-center">
          <div className="text-lg font-bold text-secondary-800">
            {mileage.toFixed(1)}
          </div>
          <div className="text-xs text-secondary-500">km/l</div>
        </div>
      </div>
    </div>
  );
};

export default FuelGauge;