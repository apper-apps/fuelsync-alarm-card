import { useMemo } from "react";
import StatCard from "@/components/molecules/StatCard";
import FuelGauge from "@/components/molecules/FuelGauge";
import MileageTrendChart from "@/components/molecules/MileageTrendChart";
const Dashboard = ({ entries }) => {
  const stats = useMemo(() => {
    if (!entries || entries.length === 0) {
      return {
        totalEntries: 0,
        totalDistance: 0,
        totalFuelCost: 0,
        totalFuelUsed: 0,
        averageMileage: 0,
        lastMileage: 0,
      };
    }

    const validEntries = entries.filter(entry => entry.mileage > 0);
    const totalFuelCost = entries.reduce((sum, entry) => sum + entry.totalCost, 0);
    const totalFuelUsed = entries.reduce((sum, entry) => sum + entry.fuelQuantity, 0);
    const totalDistance = entries.length > 0 ? 
      entries[entries.length - 1].odometerReading - entries[0].odometerReading : 0;
    
    const averageMileage = validEntries.length > 0 ? 
      validEntries.reduce((sum, entry) => sum + entry.mileage, 0) / validEntries.length : 0;
    
    const lastMileage = validEntries.length > 0 ? validEntries[validEntries.length - 1].mileage : 0;

    return {
      totalEntries: entries.length,
      totalDistance,
      totalFuelCost,
      totalFuelUsed,
      averageMileage,
      lastMileage,
    };
  }, [entries]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-secondary-800 to-secondary-600 bg-clip-text text-transparent">
          FuelSync Dashboard
        </h1>
        <p className="text-secondary-600">Track your Access 125 fuel efficiency</p>
      </div>

      {/* Fuel Gauge */}
      <div className="flex justify-center">
        <FuelGauge 
          level={Math.min(stats.averageMileage / 60, 1)} 
          mileage={stats.averageMileage}
        />
      </div>
{/* Mileage Trend Chart */}
      <MileageTrendChart entries={entries} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="Gauge"
          title="Average Mileage"
          value={stats.averageMileage.toFixed(1)}
          unit="km/l"
          subtitle="Overall efficiency"
        />
        
        <StatCard
          icon="Route"
          title="Total Distance"
          value={stats.totalDistance.toLocaleString()}
          unit="km"
          subtitle="Since tracking"
        />
        
        <StatCard
          icon="DollarSign"
          title="Total Fuel Cost"
          value={`₹${stats.totalFuelCost.toFixed(0)}`}
          subtitle="All fuel expenses"
        />
        
        <StatCard
          icon="Fuel"
          title="Total Fuel Used"
          value={stats.totalFuelUsed.toFixed(1)}
          unit="L"
          subtitle="Fuel consumed"
        />
      </div>

      {/* Recent Performance */}
      {stats.lastMileage > 0 && (
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">
                {stats.lastMileage.toFixed(1)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-secondary-800">Latest Mileage</h3>
              <p className="text-sm text-secondary-600">
                {stats.lastMileage > stats.averageMileage ? "Above" : "Below"} average performance
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;