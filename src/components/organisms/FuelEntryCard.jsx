import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const FuelEntryCard = ({ entry, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/5 to-primary/10 rounded-full -translate-y-4 translate-x-4"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-secondary-800">
                {format(entry.date, "MMM dd, yyyy")}
              </h3>
              <p className="text-sm text-secondary-500">
                {format(entry.date, "EEEE")}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(entry.id)}
              className="w-8 h-8 p-0 text-secondary-400 hover:text-error hover:bg-error/10"
            >
              <ApperIcon name="Trash2" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-secondary-500">Odometer</p>
              <p className="text-sm font-medium text-secondary-800">
                {entry.odometerReading.toLocaleString()} km
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-secondary-500">Fuel</p>
              <p className="text-sm font-medium text-secondary-800">
                {entry.fuelQuantity.toFixed(2)} L
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-secondary-500">Cost</p>
              <p className="text-sm font-medium text-secondary-800">
                ₹{entry.totalCost.toFixed(2)}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-secondary-500">Mileage</p>
              <p className="text-sm font-medium text-primary">
                {entry.mileage > 0 ? `${entry.mileage.toFixed(1)} km/l` : "N/A"}
              </p>
            </div>
          </div>

          {entry.tripDistance > 0 && (
            <div className="mt-4 p-3 bg-gradient-to-r from-success/5 to-success/10 rounded-lg border border-success/20">
              <div className="flex items-center gap-2 text-sm text-success">
                <ApperIcon name="Route" size={14} />
                <span>Trip: {entry.tripDistance.toLocaleString()} km</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default FuelEntryCard;