import React, { useState } from 'react';
import { Analytics } from '@/components/Analytics';
import { IncidentMap } from '@/components/IncidentMap';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  AlertTriangle, 
  TrendingUp,
  Download,
  RefreshCw,
  Calendar,
  MapPin,
  BarChart,
  CheckCircle
} from 'lucide-react';
import { mockIncidents, mockAidPoints } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export const CommandCenter: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  const surgeDetection = [
    { area: 'MG Road', level: 'critical', incidents: 12, trend: '+45%' },
    { area: 'Koramangala', level: 'high', incidents: 8, trend: '+23%' },
    { area: 'BTM Layout', level: 'medium', incidents: 5, trend: '+12%' },
  ];

  const handleExport = () => {
    console.log('Exporting report...');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Command Center</h1>
            <p className="text-muted-foreground">District Emergency Operations</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            
            <Button variant="outline">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="surge">Surge Detection</TabsTrigger>
            <TabsTrigger value="resources">Resource Planning</TabsTrigger>
            <TabsTrigger value="insights">After-Action</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Real-time Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 p-0 overflow-hidden">
                <div className="h-[500px]">
                  <IncidentMap
                    incidents={mockIncidents}
                    aidPoints={mockAidPoints}
                    showHeatmap={true}
                  />
                </div>
              </Card>
              
              <div className="space-y-4">
                <Card className="p-4 bg-gradient-emergency text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80">Active Emergencies</p>
                      <p className="text-3xl font-bold">24</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-white/80" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Critical</span>
                      <span className="font-bold">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>High Priority</span>
                      <span className="font-bold">8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Medium</span>
                      <span className="font-bold">13</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    System Health
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Agent Network</span>
                      <Badge className="bg-success text-white">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Response Units</span>
                      <span className="font-bold">28/35 Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">System Load</span>
                      <span className="font-bold">68%</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Analytics Dashboard */}
            <Analytics timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="surge" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Surge Detection & Prediction
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {surgeDetection.map((area) => (
                  <Card key={area.area} className={cn(
                    "p-4 border-l-4",
                    area.level === 'critical' && "border-l-emergency",
                    area.level === 'high' && "border-l-warning",
                    area.level === 'medium' && "border-l-info"
                  )}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{area.area}</h4>
                        <p className="text-2xl font-bold mt-1">{area.incidents}</p>
                        <p className="text-sm text-muted-foreground">incidents</p>
                      </div>
                      <div className="text-right">
                        <Badge className={cn(
                          area.level === 'critical' && "bg-emergency text-white",
                          area.level === 'high' && "bg-warning text-white",
                          area.level === 'medium' && "bg-info text-white"
                        )}>
                          {area.level}
                        </Badge>
                        <p className="text-sm font-medium mt-2">{area.trend}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-bold mb-3">Predictive Analysis</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-background rounded">
                    <span>Flood Risk - Ward 2</span>
                    <span className="text-warning font-bold">78% probability in 6 hours</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-background rounded">
                    <span>Heat Stress - Central District</span>
                    <span className="text-orange-500 font-bold">High risk tomorrow 2-5 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-background rounded">
                    <span>Crowd Surge - Stadium Area</span>
                    <span className="text-info font-bold">Event scheduled, 50K expected</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Resource Allocation & Gaps
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3">Resource Distribution</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Ambulances</span>
                        <span className="text-sm">18/25 deployed</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-info h-2 rounded-full" style={{ width: '72%' }} />
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Fire Units</span>
                        <span className="text-sm">8/12 deployed</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-warning h-2 rounded-full" style={{ width: '67%' }} />
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Police Units</span>
                        <span className="text-sm">22/30 deployed</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-safe h-2 rounded-full" style={{ width: '73%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold mb-3">Critical Gaps</h3>
                  <div className="space-y-3">
                    <Alert className="bg-emergency/10 border-emergency/20">
                      <AlertTriangle className="h-4 w-4 text-emergency" />
                      <AlertDescription>
                        <strong>Ward 2:</strong> Need 3 additional ambulances immediately
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="bg-warning/10 border-warning/20">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <AlertDescription>
                        <strong>Ward 4:</strong> Ladder truck unavailable, backup requested
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="bg-info/10 border-info/20">
                      <AlertTriangle className="h-4 w-4 text-info" />
                      <AlertDescription>
                        <strong>Ward 7:</strong> Shelter at 90% capacity
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BarChart className="w-6 h-6 text-primary" />
                After-Action Insights
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="p-4 text-center">
                  <p className="text-3xl font-bold text-success">3.2 min</p>
                  <p className="text-sm text-muted-foreground">Best Response Time</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-3xl font-bold">94.5%</p>
                  <p className="text-sm text-muted-foreground">SLA Compliance</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-3xl font-bold text-warning">12</p>
                  <p className="text-sm text-muted-foreground">Escalations</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-3xl font-bold">342</p>
                  <p className="text-sm text-muted-foreground">Lives Saved</p>
                </Card>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-3">Performance Trends</h3>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Response time chart visualization</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold mb-3">Lessons Learned</h3>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Multi-lingual voice processing reduced response time by 40%</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Agent-2N network backup successfully handled 12 escalations</span>
                    </li>
                    <li className="flex gap-2">
                      <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                      <span>Need additional resources in Ward 2 during peak hours</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};