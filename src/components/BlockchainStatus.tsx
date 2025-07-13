import React, { useState, useEffect } from 'react';
import { Globe, Wallet, Database, Zap, CheckCircle, AlertCircle } from 'lucide-react';

const BlockchainStatus: React.FC = () => {
  const [blockchainData, setBlockchainData] = useState({
    ethereum: {
      status: 'online',
      latency: 145,
      blockHeight: 18756432,
      gasPrice: 23.4,
      activeContracts: 156,
      monitoredWallets: 2847
    },
    near: {
      status: 'online',
      latency: 89,
      blockHeight: 104785692,
      gasPrice: 0.0001,
      activeContracts: 89,
      monitoredWallets: 1249
    }
  });

  const [protocolStatus, setProtocolStatus] = useState([
    { name: 'Uniswap V3', blockchain: 'Ethereum', status: 'online', tvl: '$4.2B', riskLevel: 'low' },
    { name: 'PancakeSwap', blockchain: 'Ethereum', status: 'online', tvl: '$2.8B', riskLevel: 'low' },
    { name: 'Ref Finance', blockchain: 'NEAR', status: 'online', tvl: '$45M', riskLevel: 'medium' },
    { name: 'Aurora DEX', blockchain: 'NEAR', status: 'maintenance', tvl: '$23M', riskLevel: 'low' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockchainData(prev => ({
        ethereum: {
          ...prev.ethereum,
          latency: 140 + Math.random() * 20,
          blockHeight: prev.ethereum.blockHeight + Math.floor(Math.random() * 3),
          gasPrice: 20 + Math.random() * 10
        },
        near: {
          ...prev.near,
          latency: 80 + Math.random() * 20,
          blockHeight: prev.near.blockHeight + Math.floor(Math.random() * 5),
          gasPrice: 0.0001 + Math.random() * 0.0002
        }
      }));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Helper for status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'maintenance': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-accent';
    }
  };
  // Helper for risk color
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'high': return 'bg-red-500/20 text-red-400';
      default: return 'bg-accent text-accent';
    }
  };

  return (
    <div className="bg-surface backdrop-blur-sm rounded-xl p-6 border border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary rounded-lg">
          <Globe className="w-5 h-5 text-black" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">Blockchain Network Status</h3>
          <p className="text-accent text-sm">Multi-chain monitoring</p>
        </div>
      </div>

      {/* Blockchain Networks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Ethereum */}
        <div className="bg-surface rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">ETH</span>
              </div>
              <div>
                <h4 className="text-primary font-semibold">Ethereum</h4>
                <p className="text-accent text-sm">Mainnet</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Online</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-accent text-sm">Latency</p>
              <p className="text-primary font-semibold">{blockchainData.ethereum.latency.toFixed(0)}ms</p>
            </div>
            <div>
              <p className="text-accent text-sm">Block Height</p>
              <p className="text-primary font-semibold">{blockchainData.ethereum.blockHeight.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-accent text-sm">Gas Price</p>
              <p className="text-primary font-semibold">{blockchainData.ethereum.gasPrice.toFixed(1)} gwei</p>
            </div>
            <div>
              <p className="text-accent text-sm">Contracts</p>
              <p className="text-primary font-semibold">{blockchainData.ethereum.activeContracts}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-accent">{blockchainData.ethereum.monitoredWallets} wallets</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              <span className="text-accent">{blockchainData.ethereum.activeContracts} contracts</span>
            </div>
          </div>
        </div>

        {/* NEAR */}
        <div className="bg-surface rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">N</span>
              </div>
              <div>
                <h4 className="text-primary font-semibold">NEAR Protocol</h4>
                <p className="text-accent text-sm">Mainnet</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Online</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-accent text-sm">Latency</p>
              <p className="text-primary font-semibold">{blockchainData.near.latency.toFixed(0)}ms</p>
            </div>
            <div>
              <p className="text-accent text-sm">Block Height</p>
              <p className="text-primary font-semibold">{blockchainData.near.blockHeight.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-accent text-sm">Gas Price</p>
              <p className="text-primary font-semibold">{blockchainData.near.gasPrice.toFixed(4)} NEAR</p>
            </div>
            <div>
              <p className="text-accent text-sm">Contracts</p>
              <p className="text-primary font-semibold">{blockchainData.near.activeContracts}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-accent">{blockchainData.near.monitoredWallets} wallets</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              <span className="text-accent">{blockchainData.near.activeContracts} contracts</span>
            </div>
          </div>
        </div>
      </div>

      {/* DeFi Protocol Status */}
      <div>
        <h4 className="text-primary font-medium mb-4">DeFi Protocol Monitoring</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {protocolStatus.map((protocol, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-surface rounded-lg">
              <div className="flex items-center gap-3">
                {protocol.status === 'online' ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : protocol.status === 'maintenance' ? (
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-medium">{protocol.name}</span>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                      {protocol.blockchain}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-accent">
                    <span>TVL: {protocol.tvl}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(protocol.riskLevel)}`}>
                      {protocol.riskLevel} risk
                    </span>
                  </div>
                </div>
              </div>
              <Zap className={`w-5 h-5 ${protocol.status === 'online' ? 'text-green-400' : protocol.status === 'maintenance' ? 'text-yellow-400' : 'text-red-400'}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockchainStatus;