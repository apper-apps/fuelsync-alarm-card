import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const FloatingActionButton = ({ onClick }) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        <Button
          onClick={onClick}
          className="w-14 h-14 rounded-full shadow-deep hover:shadow-lg bg-gradient-to-r from-primary to-primary/80 text-white p-0"
          size="lg"
        >
          <ApperIcon name="Plus" size={24} />
        </Button>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingActionButton;