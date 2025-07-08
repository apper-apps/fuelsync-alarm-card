import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { format, parseISO, startOfWeek, endOfWeek } from 'date-fns';
import { Card } from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const MileageTrendChart = ({ entries }) => {
  const chartData = useMemo(() => {
    if (!entries || entries.length === 0) {
      return {
        series: [],
        categories: []
      };
    }

    // Filter entries with valid mileage data
    const validEntries = entries.filter(entry => entry.mileage > 0);
    
    if (validEntries.length === 0) {
      return {
        series: [],
        categories: []
      };
    }

    // Group entries by week
    const weeklyData = validEntries.reduce((acc, entry) => {
      const date = parseISO(entry.date);
      const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday start
      const weekKey = format(weekStart, 'yyyy-MM-dd');
      
      if (!acc[weekKey]) {
        acc[weekKey] = {
          weekStart,
          entries: []
        };
      }
      
      acc[weekKey].entries.push(entry);
      return acc;
    }, {});

    // Calculate weekly average mileage
    const weeklyAverages = Object.entries(weeklyData)
      .map(([weekKey, data]) => {
        const avgMileage = data.entries.reduce((sum, entry) => sum + entry.mileage, 0) / data.entries.length;
        return {
          week: format(data.weekStart, 'MMM dd'),
          weekFull: format(data.weekStart, 'MMM dd, yyyy'),
          mileage: Number(avgMileage.toFixed(2))
        };
      })
      .sort((a, b) => new Date(a.weekFull) - new Date(b.weekFull));

    return {
      series: [{
        name: 'Average Mileage',
        data: weeklyAverages.map(item => item.mileage)
      }],
      categories: weeklyAverages.map(item => item.week)
    };
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
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: '#6C757D',
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
          color: '#6C757D',
          fontSize: '12px',
          fontWeight: 500
        }
      },
      labels: {
        style: {
          colors: '#6C757D',
          fontSize: '12px'
        },
        formatter: function(value) {
          return value.toFixed(1);
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
        formatter: function(value) {
          return value.toFixed(1) + ' km/l';
        }
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 250
        },
        xaxis: {
          labels: {
            style: {
              fontSize: '10px'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              fontSize: '10px'
            }
          }
        }
      }
    }]
  };

  if (chartData.series.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <ApperIcon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-secondary-800">Mileage Trend</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
            <ApperIcon name="BarChart3" size={24} className="text-secondary-400" />
          </div>
          <p className="text-secondary-600 mb-2">No mileage data available</p>
          <p className="text-sm text-secondary-500">Add more fuel entries to see trends</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <ApperIcon name="TrendingUp" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-secondary-800">Mileage Trend</h3>
      </div>
      <div className="w-full">
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

export default MileageTrendChart;