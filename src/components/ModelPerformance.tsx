import React, { useState, useEffect } from 'react';
import { Cpu, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

const ModelPerformance: React.FC = () => {
  const [metrics, setMetrics] = useState({
    accuracy: 94.7,
    precision: 92.3,
    recall: 96.1,
    f1Score: 94.2,
    falsePositives: 3.8,
    processingTime: 12.4
  });

  const [modelStatus, setModelStatus] = useState([
    { name: 'Random Forest', status: 'online', accuracy: 94.7, latency: 8.2 },
    { name: 'Neural Network', status: 'online', accuracy: 96.1, latency: 15.3 },
    { name: 'Anomaly Detection', status: 'online', accuracy: 91.8, latency: 5.7 },
    { name: 'Pattern Recognition', status: 'updating', accuracy: 93.4, latency: 11.2 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        accuracy: 94 + Math.random() * 3,
        precision: 91 + Math.random() * 4,
        recall: 95 + Math.random() * 3,
        f1Score: 93 + Math.random() * 3,
        falsePositives: 2 + Math.random() * 4,
        processingTime: 10 + Math.random() * 5
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-surface backdrop-blur-sm rounded-xl p-6 border border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary rounded-lg">
          <Cpu className="w-5 h-5 text-black" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">ML Model Performance</h3>
          <p className="text-accent text-sm">Real-time analytics</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-accent text-sm">Accuracy</span>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{metrics.accuracy.toFixed(1)}%</span>
            <span className="text-xs text-primary">+0.3%</span>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-accent text-sm">Precision</span>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{metrics.precision.toFixed(1)}%</span>
            <span className="text-xs text-primary">+0.1%</span>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-accent text-sm">Recall</span>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{metrics.recall.toFixed(1)}%</span>
            <span className="text-xs text-primary">+0.5%</span>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-accent text-sm">F1 Score</span>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{metrics.f1Score.toFixed(1)}%</span>
            <span className="text-xs text-primary">+0.2%</span>
          </div>
        </div>
      </div>

      {/* Model Status */}
      <div className="space-y-3">
        <h4 className="text-primary font-medium mb-3">Model Status</h4>
        {modelStatus.map((model, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
            <div className="flex items-center gap-3">
              {model.status === 'online' ? (
                <CheckCircle className="w-5 h-5 text-primary" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400" />
              )}
              <div>
                <span className="text-primary font-medium">{model.name}</span>
                <div className="flex items-center gap-4 text-sm text-accent">
                  <span>Accuracy: {model.accuracy}%</span>
                  <span>Latency: {model.latency}ms</span>
                </div>
              </div>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              model.status === 'online' ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-400'
            }`}>
              {model.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Processing Stats */}
      <div className="mt-6 p-4 bg-surface rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">{metrics.processingTime.toFixed(1)}ms</p>
            <p className="text-sm text-accent">Avg Processing Time</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{metrics.falsePositives.toFixed(1)}%</p>
            <p className="text-sm text-accent">False Positive Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPerformance;