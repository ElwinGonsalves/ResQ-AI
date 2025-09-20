import React from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MapPin, 
  Phone, 
  Heart, 
  Home, 
  Shield,
  Navigation,
  Info
} from 'lucide-react';
import { AidPoint } from '@/types/incident';
import { disasterGuidance } from '@/lib/mockData';

interface VictimGuidanceProps {
  disasterType: string;
  nearbyAid: AidPoint[];
  eta?: number;
}

export const VictimGuidance: React.FC<VictimGuidanceProps> = ({
  disasterType,
  nearbyAid,
  eta
}) => {
  const guidance = disasterGuidance[disasterType as keyof typeof disasterGuidance] || disasterGuidance.medical;

  const getAidIcon = (type: string) => {
    const icons = {
      hospital: <Heart className="w-5 h-5" />,
      shelter: <Home className="w-5 h-5" />,
      police: <Shield className="w-5 h-5" />,
      pharmacy: <Heart className="w-5 h-5" />,
      food: <Home className="w-5 h-5" />,
      water: <Home className="w-5 h-5" />,
    };
    return icons[type as keyof typeof icons] || <MapPin className="w-5 h-5" />;
  };

  return (
    <div className="space-y-4">
      {/* ETA Alert */}
      {eta !== undefined && (
        <Alert className="bg-gradient-safe text-white border-0">
          <Navigation className="h-4 w-4" />
          <AlertDescription className="text-lg font-semibold">
            Help is on the way! Arriving in {eta} minutes
          </AlertDescription>
        </Alert>
      )}

      {/* Emergency Guidance */}
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-bold">{guidance.title} - What to Do</h3>
          </div>
          
          <ol className="space-y-2">
            {guidance.steps.map((step, index) => (
              <li key={index} className="flex gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <span className="text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Card>

      {/* Nearby Aid Points */}
      <Card className="p-4">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-info" />
          Nearest Safe Points
        </h3>
        
        <div className="space-y-3">
          {nearbyAid.slice(0, 5).map((aid) => (
            <div key={aid.id} className="flex justify-between items-start p-3 bg-muted rounded-lg">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  {getAidIcon(aid.type)}
                </div>
                <div>
                  <p className="font-semibold">{aid.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {aid.type} • {aid.distance?.toFixed(1)} km away
                  </p>
                  <p className="text-sm text-muted-foreground">{aid.hours}</p>
                </div>
              </div>
              
              {aid.contact && (
                <a href={`tel:${aid.contact}`} className="flex items-center gap-1 text-primary">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">Call</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Emergency Numbers */}
      <Card className="p-4 bg-gradient-emergency text-white">
        <h3 className="text-lg font-bold mb-2">Emergency Contacts</h3>
        <div className="grid grid-cols-3 gap-2">
          <a href="tel:100" className="flex flex-col items-center p-2 bg-white/20 rounded">
            <Phone className="w-6 h-6 mb-1" />
            <span className="text-xs">Police</span>
            <span className="font-bold">100</span>
          </a>
          <a href="tel:101" className="flex flex-col items-center p-2 bg-white/20 rounded">
            <Phone className="w-6 h-6 mb-1" />
            <span className="text-xs">Fire</span>
            <span className="font-bold">101</span>
          </a>
          <a href="tel:108" className="flex flex-col items-center p-2 bg-white/20 rounded">
            <Phone className="w-6 h-6 mb-1" />
            <span className="text-xs">Ambulance</span>
            <span className="font-bold">108</span>
          </a>
        </div>
      </Card>
    </div>
  );
};