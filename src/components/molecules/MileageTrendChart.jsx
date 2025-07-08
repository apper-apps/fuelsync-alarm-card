import React, { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { endOfWeek, format, parseISO, startOfWeek } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const MileageTrendChart = ({ entries = [] }) => {
  const [chartError, setChartError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const chartData = useMemo(() => {
    try {
      setIsLoading(true)
      setChartError(null)

      // Validate entries input
      if (!entries || !Array.isArray(entries) || entries.length === 0) {
        return {
          series: [],
          categories: []
        };
      }

      // Filter entries with valid mileage data - add safety checks
      const validEntries = entries.filter(entry => {
        return entry && 
               typeof entry === 'object' && 
               entry.mileage && 
               typeof entry.mileage === 'number' && 
               entry.mileage > 0 &&
               entry.date;
      });
      
      if (validEntries.length === 0) {
        return {
          series: [],
          categories: []
        };
      }

      // Group entries by week with error handling
      const weeklyData = validEntries.reduce((acc, entry) => {
        try {
          const date = parseISO(entry.date);
          
          // Validate parsed date
          if (isNaN(date.getTime())) {
            console.warn('Invalid date found:', entry.date);
            return acc;
          }
          
          const weekStart = startOfWeek(date);
          const weekKey = format(weekStart, 'yyyy-MM-dd');
          
          if (!acc[weekKey]) {
            acc[weekKey] = [];
          }
          acc[weekKey].push(entry);
          return acc;
        } catch (dateError) {
          console.warn('Date processing error for entry:', entry, dateError);
          return acc;
        }
      }, {});

      // Calculate weekly averages with validation
      const weeklyAverages = Object.entries(weeklyData)
        .map(([weekKey, weekEntries]) => {
          if (!weekEntries || weekEntries.length === 0) return null;
          
          const totalMileage = weekEntries.reduce((sum, entry) => {
            const mileage = parseFloat(entry.mileage) || 0;
            return sum + mileage;
          }, 0);
          
          const avgMileage = totalMileage / weekEntries.length;
          
          return {
            week: weekKey,
            avgMileage: avgMileage
          };
        })
        .filter(item => item !== null && !isNaN(item.avgMileage));

      // Sort by week with error handling
      weeklyAverages.sort((a, b) => {
        try {
          return new Date(a.week) - new Date(b.week);
        } catch (sortError) {
          console.warn('Sort error:', sortError);
          return 0;
        }
      });

      return {
        series: [{
          name: 'Average Mileage',
          data: weeklyAverages.map(item => parseFloat(item.avgMileage.toFixed(1)))
        }],
        categories: weeklyAverages.map(item => {
          try {
            return format(new Date(item.week), 'MMM dd');
          } catch (formatError) {
            console.warn('Format error:', formatError);
            return item.week;
          }
        })
      };
    } catch (error) {
      console.error('Chart data processing error:', error);
      setChartError(error.message || 'Failed to process chart data');
      return {
        series: [],
        categories: []
      };
    } finally {
      setIsLoading(false);
    }
  }, [entries]);

  const options = {
    chart: {
      type: 'line',
      height: 300,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      fontFamily: 'Inter, system-ui, sans-serif'
    },
    colors: ['#FF6B35'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    markers: {
      size: 6,
      colors: ['#FF6B35'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 8
      }
    },
grid: {
      show: true,
      borderColor: '#e9ecef',
      strokeDashArray: 3,
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    xaxis: {
      categories: chartData?.categories || [],
      labels: {
        style: {
          colors: '#6c757d',
          fontSize: '12px'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      title: {
        text: 'Mileage (km/l)',
        style: {
          color: '#6c757d',
          fontSize: '12px'
        }
      },
      labels: {
style: {
          colors: '#6c757d',
          fontSize: '12px'
        }
      }
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, system-ui, sans-serif'
      },
      marker: {
        show: true
      },
      y: {
        formatter: function (val) {
          return val + ' km/l'
        }
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 250
        },
        markers: {
          size: 4
        }
      }
    }]
  };

  // Error state
  if (chartError) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ApperIcon />
          <h3 className="text-lg font-semibold text-gray-800">Mileage Trend</h3>
        </div>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-error mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-2">Failed to load chart</p>
          <p className="text-sm text-gray-500">{chartError}</p>
        </div>
      </Card>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ApperIcon />
          <h3 className="text-lg font-semibold text-gray-800">Mileage Trend</h3>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  // No data state
  if (!chartData?.series?.length || chartData.series[0]?.data?.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ApperIcon />
          <h3 className="text-lg font-semibold text-gray-800">Mileage Trend</h3>
        </div>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-2">No mileage data available</p>
          <p className="text-sm text-gray-500">Add fuel entries with mileage to see trends</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <ApperIcon />
        <h3 className="text-lg font-semibold text-gray-800">Mileage Trend</h3>
      </div>
<div className="chart-container">
        <Chart
          options={options}
          series={chartData.series}
          type="line"
          height={300}
        />
      </div>
    </Card>
  );
};
// Add default props for better error prevention
MileageTrendChart.defaultProps = {
  entries: []
};

export default MileageTrendChart;