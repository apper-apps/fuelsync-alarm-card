import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-error/10 to-error/20 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertTriangle" size={40} className="text-error" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-error to-error/80 rounded-full flex items-center justify-center">
          <ApperIcon name="X" size={12} className="text-white" />
        </div>
      </div>

      <h3 className="text-xl font-display font-bold text-secondary-700 mb-3">
        Oops! Something went wrong
      </h3>
      
      <p className="text-secondary-500 mb-6 max-w-md">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
          >
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </Button>
        )}
        
        <Button
          variant="secondary"
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
        >
          <ApperIcon name="RotateCcw" size={16} />
          Refresh Page
        </Button>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <p className="text-sm text-secondary-600">
          <strong>Need help?</strong> Try refreshing the page or check your internet connection.
        </p>
      </div>
    </motion.div>
  );
};

export default Error;