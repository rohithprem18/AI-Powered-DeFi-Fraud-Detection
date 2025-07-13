import React, { useState, useEffect } from 'react';
import { Activity, ExternalLink, Shield, AlertTriangle } from 'lucide-react';

interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  amount: string;
  currency: string;
  riskScore: number;
  timestamp: Date;
  blockchain: 'Ethereum' | 'NEAR';
  status: 'approved' | 'flagged' | 'blocked';
}

const TransactionMonitor: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Generate initial transactions
    const generateTransaction = (): Transaction => {
      const currencies = ['ETH', 'NEAR', 'USDC', 'USDT', 'DAI'];
      const blockchain = Math.random() > 0.5 ? 'Ethereum' : 'NEAR';
      const riskScore = Math.random() * 100;
      
      return {
        id: Math.random().toString(36).substring(7),
        hash: `0x${Math.random().toString(16).substring(2, 18)}...`,
        from: `0x${Math.random().toString(16).substring(2, 8)}...`,
        to: `0x${Math.random().toString(16).substring(2, 8)}...`,
        amount: (Math.random() * 1000).toFixed(2),
        currency: currencies[Math.floor(Math.random() * currencies.length)],
        riskScore,
        timestamp: new Date(),
        blockchain,
        status: riskScore > 70 ? 'blocked' : riskScore > 40 ? 'flagged' : 'approved'
      };
    };

    const initialTransactions = Array.from({ length: 10 }, generateTransaction);
    setTransactions(initialTransactions);

    // Add new transactions periodically
    const interval = setInterval(() => {
      const newTransaction = generateTransaction();
      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-primary';
      case 'flagged': return 'text-primary';
      case 'blocked': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <Shield className="w-4 h-4" />;
      case 'flagged': return <AlertTriangle className="w-4 h-4" />;
      case 'blocked': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-surface backdrop-blur-sm rounded-xl p-6 border border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary rounded-lg">
          <Activity className="w-5 h-5 text-black" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">Live Transaction Monitor</h3>
          <p className="text-accent text-sm">Real-time fraud analysis</p>
        </div>
      </div>

      <div className="space-y-3">
        {transactions.map((tx, index) => (
          <div 
            key={tx.id}
            className={`p-4 rounded-lg border border-primary/10 transition-all duration-300 ${
              index === 0 ? 'bg-primary/10 animate-pulse' : 'bg-surface'
            } hover:bg-primary/5`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={getStatusColor(tx.status)}>
                  {getStatusIcon(tx.status)}
                </span>
                <span className="text-white font-medium">{tx.amount} {tx.currency}</span>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                  {tx.blockchain}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${
                  tx.riskScore > 70 ? 'text-red-400' : 
                  'text-primary'
                }`}>
                  {tx.riskScore.toFixed(0)}%
                </span>
                <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div>
                <span>From: {tx.from}</span>
                <span className="mx-2">→</span>
                <span>To: {tx.to}</span>
              </div>
              <span>{tx.timestamp.toLocaleTimeString()}</span>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Risk Assessment</span>
                <span>{tx.riskScore.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-500 ${
                    tx.riskScore > 70 ? 'bg-red-500' : 
                    'bg-primary'
                  }`}
                  style={{ width: `${tx.riskScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionMonitor;