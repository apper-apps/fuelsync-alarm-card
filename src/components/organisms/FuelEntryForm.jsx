import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Card from "@/components/atoms/Card";

const FuelEntryForm = ({ isOpen, onClose, onSubmit, lastEntry }) => {
  const [formData, setFormData] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    odometerReading: "",
    fuelQuantity: "",
    pricePerLiter: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.odometerReading || formData.odometerReading <= 0) {
      newErrors.odometerReading = "Please enter a valid odometer reading";
    }
    
    if (lastEntry && Number(formData.odometerReading) <= lastEntry.odometerReading) {
      newErrors.odometerReading = "Odometer reading must be greater than last entry";
    }
    
    if (!formData.fuelQuantity || formData.fuelQuantity <= 0) {
      newErrors.fuelQuantity = "Please enter a valid fuel quantity";
    }
    
    if (!formData.pricePerLiter || formData.pricePerLiter <= 0) {
      newErrors.pricePerLiter = "Please enter a valid price per liter";
    }
    
    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const entry = {
      id: Date.now().toString(),
      date: new Date(formData.date),
      odometerReading: Number(formData.odometerReading),
      fuelQuantity: Number(formData.fuelQuantity),
      pricePerLiter: Number(formData.pricePerLiter),
      totalCost: Number(formData.fuelQuantity) * Number(formData.pricePerLiter),
    };

    // Calculate mileage if there's a previous entry
    if (lastEntry) {
      entry.tripDistance = entry.odometerReading - lastEntry.odometerReading;
      entry.mileage = entry.tripDistance / lastEntry.fuelQuantity;
    } else {
      entry.tripDistance = 0;
      entry.mileage = 0;
    }

    onSubmit(entry);
    onClose();
    
    // Reset form
    setFormData({
      date: format(new Date(), "yyyy-MM-dd"),
      odometerReading: "",
      fuelQuantity: "",
      pricePerLiter: "",
    });
    setErrors({});
    
    toast.success("Fuel entry added successfully!");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Form */}
          <motion.div
            className="relative w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Fuel" size={20} className="text-primary" />
                  </div>
                  <h2 className="text-xl font-display font-bold text-secondary-800">
                    Add Fuel Entry
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="w-8 h-8 p-0"
                >
                  <ApperIcon name="X" size={16} />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  error={errors.date}
                  required
                />

                <FormField
                  label="Odometer Reading"
                  type="number"
                  placeholder="Enter current km reading"
                  value={formData.odometerReading}
                  onChange={(e) => handleChange("odometerReading", e.target.value)}
                  error={errors.odometerReading}
                  required
                />

                <FormField
                  label="Fuel Quantity"
                  type="number"
                  step="0.01"
                  placeholder="Enter liters filled"
                  value={formData.fuelQuantity}
                  onChange={(e) => handleChange("fuelQuantity", e.target.value)}
                  error={errors.fuelQuantity}
                  required
                />

                <FormField
                  label="Price per Liter"
                  type="number"
                  step="0.01"
                  placeholder="Enter price per liter"
                  value={formData.pricePerLiter}
                  onChange={(e) => handleChange("pricePerLiter", e.target.value)}
                  error={errors.pricePerLiter}
                  required
                />

                {/* Calculated total */}
                {formData.fuelQuantity && formData.pricePerLiter && (
                  <div className="p-4 bg-gradient-to-r from-accent/5 to-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Total Cost:</span>
                      <span className="text-lg font-semibold text-accent">
                        ₹{(Number(formData.fuelQuantity) * Number(formData.pricePerLiter)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                  >
                    <ApperIcon name="Plus" size={16} />
                    Add Entry
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FuelEntryForm;