import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  Globe, 
  Users, 
  Heart, 
  AlertCircle,
  CheckCircle,
  Activity,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Agent {
  id: string;
  name: string;
  status: 'active' | 'processing' | 'idle' | 'error';
  lastAction?: string;
  processedCount?: number;
}

export const AgentStatus: React.FC = () => {
  const agents: Agent[] = [
    {
      id: 'agent-1',
      name: 'Intake Agent',
      status: 'active',
      lastAction: 'Processing voice input in Hindi',
      processedCount: 245
    },
    {
      id: 'agent-0',
      name: 'Brain Agent',
      status: 'processing',
      lastAction: 'Translating and analyzing threat level',
      processedCount: 243
    },
    {
      id: 'agent-2',
      name: 'Dispatch Agent',
      status: 'active',
      lastAction: 'Routing to nearest fire station',
      processedCount: 238
    },
    {
      id: 'agent-3',
      name: 'Guidance Agent',
      status: 'idle',
      lastAction: 'Providing flood evacuation steps',
      processedCount: 235
    },
    {
      id: 'agent-2n',
      name: 'Network Backup Agent',
      status: 'idle',
      lastAction: 'Escalated to district level',
      processedCount: 12
    },
  ];

  const getAgentIcon = (name: string) => {
    if (name.includes('Intake')) return <Mic className="w-4 h-4" />;
    if (name.includes('Brain')) return <Globe className="w-4 h-4" />;
    if (name.includes('Dispatch')) return <Users className="w-4 h-4" />;
    if (name.includes('Guidance')) return <Heart className="w-4 h-4" />;
    if (name.includes('Network')) return <AlertCircle className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-white';
      case 'processing':
        return 'bg-warning text-white';
      case 'idle':
        return 'bg-muted text-muted-foreground';
      case 'error':
        return 'bg-emergency text-white';
      default:
        return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-3 h-3" />;
      case 'processing':
        return <Loader2 className="w-3 h-3 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        Agent Network Status
      </h3>
      
      <div className="space-y-3">
        {agents.map((agent) => (
          <div key={agent.id} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex gap-3">
              <div className={cn(
                "p-2 rounded-full",
                agent.status === 'active' && "bg-success/20 text-success",
                agent.status === 'processing' && "bg-warning/20 text-warning animate-pulse",
                agent.status === 'idle' && "bg-muted text-muted-foreground",
                agent.status === 'error' && "bg-emergency/20 text-emergency"
              )}>
                {getAgentIcon(agent.name)}
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{agent.name}</p>
                  <Badge className={cn(
                    "text-xs flex items-center gap-1",
                    getStatusColor(agent.status)
                  )}>
                    {getStatusIcon(agent.status)}
                    {agent.status}
                  </Badge>
                </div>
                
                {agent.lastAction && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {agent.lastAction}
                  </p>
                )}
              </div>
            </div>
            
            {agent.processedCount !== undefined && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Processed</p>
                <p className="font-bold">{agent.processedCount}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gradient-info rounded-lg text-white">
        <div className="flex justify-between items-center">
          <span className="text-sm">System Latency</span>
          <span className="font-bold">0.8s avg</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm">Queue Depth</span>
          <span className="font-bold">3 incidents</span>
        </div>
      </div>
    </Card>
  );
};