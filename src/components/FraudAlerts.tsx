import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, X, Eye } from 'lucide-react';

interface Alert {
  id: string;
  type: 'high_risk' | 'anomaly' | 'suspicious_pattern' | 'blacklist';
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium';
  timestamp: Date;
  txHash: string;
  dismissed: boolean;
}

const FraudAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const alertTypes = [
      {
        type: 'high_risk' as const,
        title: 'High Risk Transaction',
        description: 'Transaction exceeds risk threshold',
        severity: 'critical' as const
      },
      {
        type: 'anomaly' as const,
        title: 'Anomalous Behavior',
        description: 'Unusual transaction pattern detected',
        severity: 'high' as const
      },
      {
        type: 'suspicious_pattern' as const,
        title: 'Suspicious Pattern',
        description: 'Multiple rapid transactions from same wallet',
        severity: 'medium' as const
      },
      {
        type: 'blacklist' as const,
        title: 'Blacklisted Address',
        description: 'Transaction from known fraudulent address',
        severity: 'critical' as const
      }
    ];

    const generateAlert = (): Alert => {
      const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      return {
        id: Math.random().toString(36).substring(7),
        ...alertType,
        timestamp: new Date(),
        txHash: `0x${Math.random().toString(16).substring(2, 18)}...`,
        dismissed: false
      };
    };

    // Generate initial alerts
    const initialAlerts = Array.from({ length: 5 }, generateAlert);
    setAlerts(initialAlerts);

    // Add new alerts periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert = generateAlert();
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, dismissed: true } : alert
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'high': return 'border-primary bg-primary/10';
      case 'medium': return 'border-primary bg-primary/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'high': return <Shield className="w-5 h-5 text-primary" />;
      case 'medium': return <Shield className="w-5 h-5 text-primary" />;
      default: return <Shield className="w-5 h-5 text-gray-400" />;
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);

  return (
    <div className="bg-surface backdrop-blur-sm rounded-xl p-6 border border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">Fraud Alerts</h3>
            <p className="text-accent text-sm">{activeAlerts.length} active alerts</p>
          </div>
        </div>
        
        {activeAlerts.length > 0 && (
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-gray-300">No active fraud alerts</p>
            <p className="text-sm text-gray-500">System is monitoring transactions</p>
          </div>
        ) : (
          activeAlerts.map((alert, index) => (
            <div 
              key={alert.id}
              className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} ${
                index === 0 ? 'animate-pulse' : ''
              } transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getSeverityIcon(alert.severity)}
                  <div>
                    <h4 className="text-primary font-medium">{alert.title}</h4>
                    <p className="text-accent text-sm">{alert.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={() => {/* View details */}}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={() => dismissAlert(alert.id)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-accent">TX:</span>
                  <span className="text-primary font-mono">{alert.txHash}</span>
                </div>
                <span className="text-gray-500">
                  {alert.timestamp.toLocaleTimeString()}
                </span>
              </div>
              
              <div className="mt-3 flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                  'bg-primary/20 text-primary'
                }`}>
                  {alert.severity.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500">
                  Auto-action: {alert.severity === 'critical' ? 'Transaction Blocked' : 'Under Review'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FraudAlerts;