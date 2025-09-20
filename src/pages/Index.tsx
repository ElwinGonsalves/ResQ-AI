import React, { useState } from 'react';
import { CivilianApp } from './CivilianApp';
import { ResponderConsole } from './ResponderConsole';
import { CommandCenter } from './CommandCenter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Phone, 
  Shield, 
  BarChart3, 
  AlertTriangle,
  Users,
  Globe,
  Zap,
  Languages,
  Radio,
  Mic
} from 'lucide-react';

const Index = () => {
  const [selectedView, setSelectedView] = useState<'home' | 'civilian' | 'responder' | 'command'>('home');

  if (selectedView === 'civilian') {
    return <CivilianApp />;
  }

  if (selectedView === 'responder') {
    return <ResponderConsole />;
  }

  if (selectedView === 'command') {
    return <CommandCenter />;
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-emergency opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-emergency rounded-full shadow-emergency">
                <AlertTriangle className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-foreground">
              Emergency Response Network
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Voice-first, multilingual, agentic disaster network that turns a victim's cry for help 
              into verified location, instant triage, routed responders, live guidance, 
              and community backup—within seconds.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Badge icon={Globe} text="Multi-lingual" />
              <Badge icon={Zap} text="< 10s Response" />
              <Badge icon={Radio} text="Agent Network" />
              <Badge icon={Languages} text="Any Language" />
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Select Your Role</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Civilian App */}
          <Card 
            className="p-6 hover:shadow-emergency transition-all cursor-pointer group"
            onClick={() => setSelectedView('civilian')}
          >
            <div className="space-y-4">
              <div className="p-3 bg-gradient-emergency rounded-lg w-fit group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold">Civilian SOS</h3>
              
              <p className="text-muted-foreground">
                Emergency assistance at your fingertips. Voice-activated SOS, 
                real-time guidance, and nearby safe points.
              </p>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Voice emergency in any language
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Auto GPS sharing
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Live ETA tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Disaster-specific guidance
                </li>
              </ul>
              
              <Button className="w-full bg-gradient-emergency text-white hover:opacity-90">
                Launch Civilian App
              </Button>
            </div>
          </Card>

          {/* Responder Console */}
          <Card 
            className="p-6 hover:shadow-info transition-all cursor-pointer group"
            onClick={() => setSelectedView('responder')}
          >
            <div className="space-y-4">
              <div className="p-3 bg-gradient-info rounded-lg w-fit group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold">Responder Console</h3>
              
              <p className="text-muted-foreground">
                Real-time incident management for police, fire, and medical teams. 
                Dispatch, routing, and coordination.
              </p>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Live incident map
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  One-click acknowledgment
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Auto-routing with ETA
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Resource management
                </li>
              </ul>
              
              <Button className="w-full bg-gradient-info text-white hover:opacity-90">
                Open Responder Console
              </Button>
            </div>
          </Card>

          {/* Command Center */}
          <Card 
            className="p-6 hover:shadow-success transition-all cursor-pointer group"
            onClick={() => setSelectedView('command')}
          >
            <div className="space-y-4">
              <div className="p-3 bg-gradient-safe rounded-lg w-fit group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold">Command Center</h3>
              
              <p className="text-muted-foreground">
                District-level analytics and coordination. Surge detection, 
                resource planning, and after-action insights.
              </p>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Macro situational awareness
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Predictive analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Resource optimization
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Performance metrics
                </li>
              </ul>
              
              <Button className="w-full bg-gradient-safe text-white hover:opacity-90">
                Enter Command Center
              </Button>
            </div>
          </Card>
        </div>

        {/* System Architecture */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Multi-Agent Architecture</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: 'Agent-1: Intake', desc: 'Voice + GPS capture', icon: Mic },
              { name: 'Agent-0: Brain', desc: 'Translate & analyze', icon: Globe },
              { name: 'Agent-2: Dispatch', desc: 'Route responders', icon: Users },
              { name: 'Agent-3: Guidance', desc: 'Victim support', icon: Heart },
              { name: 'Agent-2N: Backup', desc: 'Network escalation', icon: Radio },
            ].map((agent, idx) => (
              <Card key={idx} className="p-4 text-center">
                <agent.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h4 className="font-bold text-sm">{agent.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{agent.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-2 px-3 py-1 bg-card rounded-full">
    <Icon className="w-4 h-4 text-primary" />
    <span className="text-sm font-medium">{text}</span>
  </div>
);

const CheckIcon = () => (
  <div className="w-4 h-4 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
    <div className="w-2 h-2 rounded-full bg-success" />
  </div>
);

const Heart = () => <Shield className="w-4 h-4" />;

export default Index;