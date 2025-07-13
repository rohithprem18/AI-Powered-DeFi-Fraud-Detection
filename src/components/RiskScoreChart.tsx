import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

const RiskScoreChart: React.FC = () => {
  const [chartData, setChartData] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  useEffect(() => {
    // Generate initial data
    const generateData = () => {
      const data = [];
      const labels = [];
      const now = new Date();
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        labels.push(time.getHours().toString().padStart(2, '0') + ':00');
        data.push(15 + Math.random() * 25);
      }
      
      setChartData(data);
      setTimeLabels(labels);
    };

    generateData();

    // Update data every 5 seconds
    const interval = setInterval(() => {
      setChartData(prev => [...prev.slice(1), 15 + Math.random() * 25]);
      setTimeLabels(prev => {
        const newLabel = new Date().getHours().toString().padStart(2, '0') + ':00';
        return [...prev.slice(1), newLabel];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...chartData);
  const avgRisk = chartData.reduce((a, b) => a + b, 0) / chartData.length;

  return (
    <div className="bg-surface backdrop-blur-sm rounded-xl p-6 border border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <BarChart3 className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">Risk Score Trends</h3>
            <p className="text-accent text-sm">24-hour AI analysis</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{avgRisk.toFixed(1)}%</p>
          <p className="text-sm text-accent">Average Risk</p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64 mb-4">
        <div className="absolute inset-0 flex items-end justify-between gap-1">
          {chartData.map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className={`w-full rounded-t transition-all duration-500 ${
                  value > 30 ? 'bg-red-500' : 'bg-primary'
                }`}
                style={{ height: `${(value / maxValue) * 100}%` }}
              ></div>
            </div>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-accent">
          <span>{maxValue.toFixed(0)}%</span>
          <span>{(maxValue * 0.75).toFixed(0)}%</span>
          <span>{(maxValue * 0.5).toFixed(0)}%</span>
          <span>{(maxValue * 0.25).toFixed(0)}%</span>
          <span>0%</span>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-accent mb-4">
        {timeLabels.filter((_, index) => index % 4 === 0).map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span className="text-accent">Low/Medium Risk (≤30%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-accent">High Risk (&gt;30%)</span>
        </div>
      </div>
    </div>
  );
};

export default RiskScoreChart;