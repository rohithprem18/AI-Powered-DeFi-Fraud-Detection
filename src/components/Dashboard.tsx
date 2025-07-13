import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, TrendingUp, Activity, Database, Cpu, Wallet, Globe } from 'lucide-react';
import RiskScoreChart from './RiskScoreChart';
import TransactionMonitor from './TransactionMonitor';
import FraudAlerts from './FraudAlerts';
import ModelPerformance from './ModelPerformance';
import BlockchainStatus from './BlockchainStatus';
import logo from '../assets/logo.png';

const Dashboard: React.FC = () => {
  const [realTimeData, setRealTimeData] = useState({
    totalTransactions: 156432,
    flaggedTransactions: 1247,
    riskScore: 23.7,
    activeContracts: 342
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 5),
        flaggedTransactions: prev.flaggedTransactions + (Math.random() > 0.8 ? 1 : 0),
        riskScore: 20 + Math.random() * 15,
        activeContracts: prev.activeContracts + (Math.random() > 0.9 ? 1 : 0)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: 'Total Transactions',
      value: realTimeData.totalTransactions.toLocaleString(),
      change: '+12.5%',
      icon: Activity,
      color: 'bg-primary'
    },
    {
      title: 'Flagged Transactions',
      value: realTimeData.flaggedTransactions.toLocaleString(),
      change: '-8.3%',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    {
      title: 'Average Risk Score',
      value: `${realTimeData.riskScore.toFixed(1)}%`,
      change: '-2.1%',
      icon: Shield,
      color: 'bg-primary'
    },
    {
      title: 'Active Smart Contracts',
      value: realTimeData.activeContracts.toLocaleString(),
      change: '+5.7%',
      icon: Database,
      color: 'bg-primary'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6 max-w-7xl mx-auto flex-1 w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-xl flex items-center justify-center">
              <img src={logo} alt="AI Powered Fraud Detection Logo" className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">AI-Powered Fraud Detection</h1>
              <p className="text-accent">DeFi & Web3 Security Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-accent">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Real-time monitoring active</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>ML Models: Online</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Ethereum & NEAR Protocol</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-surface backdrop-blur-sm rounded-xl p-6 border border-primary/20 hover:bg-surface transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-accent text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-primary' : 'text-red-400'}`}>
                    {stat.change} from last hour
                  </p>
                </div>
                <div className={`p-3 ${stat.color} rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-black" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Risk Score Chart */}
          <div className="lg:col-span-2">
            <RiskScoreChart />
          </div>
          
          {/* Fraud Alerts */}
          <div>
            <FraudAlerts />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Transaction Monitor */}
          <TransactionMonitor />
          
          {/* Model Performance */}
          <ModelPerformance />
        </div>

        {/* Blockchain Status */}
        <BlockchainStatus />
      </div>
      {/* Footer Attribution */}
      <footer className="w-full py-6 flex flex-col items-center justify-center bg-background border-t border-primary/20 mt-8">
        <span className="block text-primary text-lg font-semibold tracking-widest">AI POWERED FRAUD DETECTION</span>
        <span className="block text-accent text-sm mt-1">ROHITH PREM S DEVELOPED BY 2025</span>
      </footer>
    </div>
  );
};

export default Dashboard;