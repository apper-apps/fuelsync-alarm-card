import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="text-center space-y-2">
        <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mx-auto animate-pulse"></div>
        <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded mx-auto animate-pulse"></div>
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl p-6 shadow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="space-y-3">
              <div className="h-6 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="h-10 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fuel entries skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl p-6 shadow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i + 3) * 0.1 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="h-5 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="space-y-1">
                  <div className="h-4 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                  <div className="h-5 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAB skeleton */}
      <div className="fixed bottom-6 right-6">
        <div className="w-14 h-14 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;