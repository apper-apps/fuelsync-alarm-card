import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ onAction, actionText = "Add Your First Entry" }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center animate-float">
          <ApperIcon name="Fuel" size={48} className="text-primary" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
          <ApperIcon name="Plus" size={16} className="text-white" />
        </div>
      </div>

      <h3 className="text-2xl font-display font-bold bg-gradient-to-r from-secondary-700 to-secondary-500 bg-clip-text text-transparent mb-3">
        Ready to Track Your Mileage?
      </h3>
      
      <p className="text-secondary-500 mb-6 max-w-md leading-relaxed">
        Start logging your fuel-ups to track your Access 125's efficiency. 
        Get insights into your mileage trends and fuel costs.
      </p>

      <div className="mb-6">
        <Button
          onClick={onAction}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-3 shadow-lg"
        >
          <ApperIcon name="Plus" size={20} />
          {actionText}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md">
        {[
          { icon: "Gauge", title: "Track Mileage", desc: "Monitor km/l efficiency" },
          { icon: "TrendingUp", title: "View Trends", desc: "See performance over time" },
          { icon: "DollarSign", title: "Track Costs", desc: "Monitor fuel expenses" }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            className="p-4 bg-white rounded-lg shadow-card border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-accent/10 to-accent/20 rounded-lg flex items-center justify-center mb-2">
              <ApperIcon name={feature.icon} size={20} className="text-accent" />
            </div>
            <h4 className="font-medium text-secondary-700 text-sm mb-1">{feature.title}</h4>
            <p className="text-xs text-secondary-500">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Empty;