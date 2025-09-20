import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users,
  AlertTriangle,
  Activity,
  MapPin,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsProps {
  timeRange?: 'today' | 'week' | 'month';
}

export const Analytics: React.FC<AnalyticsProps> = ({ timeRange = 'today' }) => {
  const metrics = {
    totalIncidents: 127,
    avgResponseTime: 6.8,
    rescuedCount: 342,
    activeUnits: 28,
    criticalZones: 3,
    slaCompliance: 94.5,
  };

  const trends = {
    incidents: +12.5,
    responseTime: -8.3,
    rescued: +23.4,
    sla: +2.1,
  };

  const MetricCard = ({ 
    title, 
    value, 
    trend, 
    icon: Icon,
    color 
  }: { 
    title: string;
    value: string | number;
    trend?: number;
    icon: any;
    color: string;
  }) => (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend !== undefined && (
            <div className={cn(
              "flex items-center gap-1 mt-2",
              trend > 0 ? "text-success" : "text-emergency"
            )}>
              {trend > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>
        <div className={cn("p-2 rounded-lg", color)}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </Card>
  );

  const wardData = [
    { ward: 'Ward 1', incidents: 23, responseTime: 5.2, status: 'normal' },
    { ward: 'Ward 2', incidents: 45, responseTime: 8.1, status: 'critical' },
    { ward: 'Ward 3', incidents: 12, responseTime: 4.5, status: 'normal' },
    { ward: 'Ward 4', incidents: 38, responseTime: 7.3, status: 'warning' },
    { ward: 'Ward 5', incidents: 9, responseTime: 3.8, status: 'normal' },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Incidents"
          value={metrics.totalIncidents}
          trend={trends.incidents}
          icon={AlertTriangle}
          color="bg-gradient-emergency"
        />
        <MetricCard
          title="Avg Response Time"
          value={`${metrics.avgResponseTime} min`}
          trend={trends.responseTime}
          icon={Clock}
          color="bg-gradient-info"
        />
        <MetricCard
          title="People Rescued"
          value={metrics.rescuedCount}
          trend={trends.rescued}
          icon={Users}
          color="bg-gradient-safe"
        />
        <MetricCard
          title="SLA Compliance"
          value={`${metrics.slaCompliance}%`}
          trend={trends.sla}
          icon={Shield}
          color="bg-gradient-critical"
        />
      </div>

      {/* Ward Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Ward-wise Performance
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Ward</th>
                <th className="text-left py-2">Incidents</th>
                <th className="text-left py-2">Avg Response</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {wardData.map((ward) => (
                <tr key={ward.ward} className="border-b">
                  <td className="py-3 font-medium">{ward.ward}</td>
                  <td className="py-3">{ward.incidents}</td>
                  <td className="py-3">{ward.responseTime} min</td>
                  <td className="py-3">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      ward.status === 'critical' && "bg-emergency/20 text-emergency",
                      ward.status === 'warning' && "bg-warning/20 text-warning",
                      ward.status === 'normal' && "bg-success/20 text-success"
                    )}>
                      {ward.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Resource Gaps */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Resource Analysis
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-emergency/10 rounded-lg">
            <div>
              <p className="font-medium">Ward 2 - Ambulance Shortage</p>
              <p className="text-sm text-muted-foreground">3 units needed, 1 available</p>
            </div>
            <span className="text-emergency font-bold">Critical</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg">
            <div>
              <p className="font-medium">Ward 4 - Fire Equipment</p>
              <p className="text-sm text-muted-foreground">Ladder truck unavailable</p>
            </div>
            <span className="text-warning font-bold">Warning</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
            <div>
              <p className="font-medium">Ward 1 - Full Coverage</p>
              <p className="text-sm text-muted-foreground">All resources available</p>
            </div>
            <span className="text-success font-bold">Optimal</span>
          </div>
        </div>
      </Card>
    </div>
  );
};