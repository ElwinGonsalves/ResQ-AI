import React, { useState } from 'react';
import { IncidentMap } from '@/components/IncidentMap';
import { IncidentCard } from '@/components/IncidentCard';
import { AgentStatus } from '@/components/AgentStatus';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Filter, 
  RefreshCw, 
  MapPin, 
  List,
  Radio,
  Users,
  Clock
} from 'lucide-react';
import { mockIncidents, mockAidPoints, mockResponderUnits } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export const ResponderConsole: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();

  const filteredIncidents = filterStatus === 'all' 
    ? mockIncidents 
    : mockIncidents.filter(inc => inc.status === filterStatus);

  const handleAcknowledge = (incidentId: string) => {
    toast({
      title: "Incident Acknowledged",
      description: `You have acknowledged incident ${incidentId}`,
      className: "bg-gradient-safe text-white",
    });
  };

  const handleDispatch = (incidentId: string) => {
    toast({
      title: "En Route",
      description: `Unit dispatched to incident ${incidentId}`,
      className: "bg-gradient-info text-white",
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Data Refreshed",
      description: "Incident data has been updated",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Emergency Response Console</h1>
            <Badge className="bg-gradient-emergency text-white">
              {filteredIncidents.filter(i => i.status === 'new').length} New
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              <Button
                size="sm"
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                onClick={() => setViewMode('map')}
              >
                <MapPin className="w-4 h-4 mr-1" />
                Map
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-1" />
                List
              </Button>
            </div>
            
            <Button onClick={handleRefresh} size="sm" variant="outline">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-60px)]">
        {/* Sidebar */}
        <aside className="w-96 bg-card border-r overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Filters */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={filterStatus === 'new' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('new')}
              >
                New
              </Button>
              <Button
                size="sm"
                variant={filterStatus === 'dispatched' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('dispatched')}
              >
                Dispatched
              </Button>
              <Button
                size="sm"
                variant={filterStatus === 'enroute' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('enroute')}
              >
                En Route
              </Button>
            </div>

            {/* Incident List */}
            <div className="space-y-3">
              {filteredIncidents.map((incident) => (
                <IncidentCard
                  key={incident.id}
                  incident={incident}
                  onAcknowledge={() => handleAcknowledge(incident.id)}
                  onDispatch={() => handleDispatch(incident.id)}
                  onViewDetails={() => setSelectedIncident(incident.id)}
                  role="responder"
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <Tabs defaultValue="operations" className="flex-1 flex flex-col">
            <TabsList className="m-4">
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="communications">Communications</TabsTrigger>
            </TabsList>

            <TabsContent value="operations" className="flex-1 px-4 pb-4">
              {viewMode === 'map' ? (
                <div className="h-full">
                  <IncidentMap
                    incidents={filteredIncidents}
                    aidPoints={mockAidPoints}
                    onIncidentClick={(incident) => setSelectedIncident(incident.id)}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <AgentStatus />
                  
                  <Card className="p-4">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Response Times
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span>Average Response</span>
                        <span className="font-bold">6.8 min</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span>Fastest Response</span>
                        <span className="font-bold text-success">3.2 min</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span>Incidents Pending</span>
                        <span className="font-bold text-warning">4</span>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="resources" className="flex-1 px-4 pb-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {mockResponderUnits.map((unit) => (
                  <Card key={unit.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{unit.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{unit.org}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {unit.capabilities.map((cap) => (
                            <Badge key={cap} variant="outline" className="text-xs">
                              {cap}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge className={
                        unit.availability_status === 'available' 
                          ? 'bg-success text-white' 
                          : 'bg-muted text-muted-foreground'
                      }>
                        {unit.availability_status}
                      </Badge>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-muted-foreground">Contact: {unit.phone}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="communications" className="flex-1 px-4 pb-4">
              <Card className="p-4">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Radio className="w-5 h-5 text-primary" />
                  Radio Communications
                </h3>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  <div className="flex gap-3 p-3 bg-muted rounded">
                    <span className="text-xs text-muted-foreground">14:23:45</span>
                    <div>
                      <p className="font-medium">Unit Alpha to Control</p>
                      <p className="text-sm">Arrived at scene, assessing situation</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 bg-muted rounded">
                    <span className="text-xs text-muted-foreground">14:22:30</span>
                    <div>
                      <p className="font-medium">Control to Unit Alpha</p>
                      <p className="text-sm">Proceed to incident INC-001, building collapse</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 bg-muted rounded">
                    <span className="text-xs text-muted-foreground">14:21:15</span>
                    <div>
                      <p className="font-medium">Medical Team 1</p>
                      <p className="text-sm">Requesting backup, multiple casualties</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Input placeholder="Type message..." />
                  <Button>Send</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};