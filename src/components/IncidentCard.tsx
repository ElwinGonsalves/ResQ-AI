import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  PhoneCall,
  Navigation,
  Shield
} from 'lucide-react';
import { Incident } from '@/types/incident';
import { cn } from '@/lib/utils';

interface IncidentCardProps {
  incident: Incident;
  onAcknowledge?: () => void;
  onDispatch?: () => void;
  onViewDetails?: () => void;
  role?: 'civilian' | 'responder' | 'admin';
}

export const IncidentCard: React.FC<IncidentCardProps> = ({
  incident,
  onAcknowledge,
  onDispatch,
  onViewDetails,
  role = 'responder'
}) => {
  const getSeverityColor = (level: string) => {
    const colors = {
      critical: 'bg-severity-critical',
      high: 'bg-severity-high',
      medium: 'bg-severity-medium',
      low: 'bg-severity-low',
      minimal: 'bg-severity-minimal',
    };
    return colors[level as keyof typeof colors];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertTriangle className="w-4 h-4" />;
      case 'dispatched':
        return <Navigation className="w-4 h-4" />;
      case 'enroute':
        return <Shield className="w-4 h-4" />;
      case 'rescued':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className={cn(
      "p-4 border-l-4 transition-all hover:shadow-lg",
      getSeverityColor(incident.severity_level),
      incident.status === 'new' && "animate-pulse-emergency"
    )}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold capitalize">
              {incident.type} Emergency
            </h3>
            <p className="text-sm text-muted-foreground">
              ID: {incident.id} • {new Date(incident.created_at).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className={cn(
              "flex items-center gap-1",
              incident.status === 'new' && "border-emergency text-emergency"
            )}>
              {getStatusIcon(incident.status)}
              {incident.status}
            </Badge>
            <Badge className={cn(
              getSeverityColor(incident.severity_level),
              "text-white"
            )}>
              {incident.severity_level}
            </Badge>
          </div>
        </div>

        {/* Incident Details */}
        <div className="space-y-2">
          {incident.transcript && (
            <p className="text-sm italic bg-muted/50 p-2 rounded">
              "{incident.transcript}"
            </p>
          )}
          
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              {incident.address}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              {incident.victims_count} affected
            </span>
          </div>

          {incident.eta_minutes !== undefined && (
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>ETA: {incident.eta_minutes} minutes</span>
            </div>
          )}
        </div>

        {/* Actions */}
        {role === 'responder' && (
          <div className="flex gap-2 pt-2">
            {incident.status === 'new' && onAcknowledge && (
              <Button 
                onClick={onAcknowledge}
                className="bg-gradient-emergency text-white hover:opacity-90"
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                Acknowledge
              </Button>
            )}
            {incident.status === 'dispatched' && onDispatch && (
              <Button 
                onClick={onDispatch}
                className="bg-gradient-info text-white hover:opacity-90"
              >
                <Navigation className="w-4 h-4 mr-2" />
                En Route
              </Button>
            )}
            <Button 
              variant="outline"
              onClick={onViewDetails}
            >
              View Details
            </Button>
          </div>
        )}

        {role === 'civilian' && incident.eta_minutes !== undefined && (
          <div className="bg-success/20 text-success p-2 rounded-md">
            <p className="text-sm font-semibold">
              Help is on the way! ETA: {incident.eta_minutes} minutes
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};