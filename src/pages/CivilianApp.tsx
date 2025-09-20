import React, { useState, useEffect } from 'react';
import { EmergencyButton } from '@/components/EmergencyButton';
import { VictimGuidance } from '@/components/VictimGuidance';
import { IncidentCard } from '@/components/IncidentCard';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MapPin, 
  Camera, 
  User, 
  ArrowLeft,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { mockAidPoints } from '@/lib/mockData';
import { Incident } from '@/types/incident';
import { useToast } from '@/hooks/use-toast';

export const CivilianApp: React.FC = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [currentIncident, setCurrentIncident] = useState<Incident | null>(null);
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => setLocation(position.coords),
      (error) => console.error('Location error:', error)
    );
  }, []);

  const handleEmergencyActivate = (audioData?: any) => {
    setEmergencyActive(true);
    
    // Simulate incident creation
    setTimeout(() => {
      const newIncident: Incident = {
        id: `INC-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        source: audioData ? 'voice' : 'app',
        transcript: audioData ? 'Help needed immediately!' : undefined,
        language: 'en',
        lat: location?.latitude || 12.9716,
        lon: location?.longitude || 77.5946,
        address: 'Current Location',
        type: 'medical',
        severity_score: 75,
        severity_level: 'high',
        status: 'dispatched',
        anonymous: isAnonymous,
        victims_count: 1,
        description: 'Emergency assistance requested',
        eta_minutes: 7,
      };
      
      setCurrentIncident(newIncident);
      
      toast({
        title: "Emergency Alert Sent",
        description: "Help is on the way. Stay calm.",
        className: "bg-gradient-safe text-white",
      });
    }, 2000);
  };

  const handlePhotoUpload = () => {
    toast({
      title: "Photo Uploaded",
      description: "Image sent to emergency responders",
    });
  };

  const handleBackToSafety = () => {
    setEmergencyActive(false);
    setCurrentIncident(null);
  };

  if (emergencyActive && currentIncident) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBackToSafety}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-xl font-bold">Emergency Active</h1>
          </div>

          {/* Status Alert */}
          <Alert className="bg-gradient-safe text-white border-0">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-lg">
              Your emergency has been received. Help is coming.
            </AlertDescription>
          </Alert>

          {/* Incident Status */}
          <IncidentCard 
            incident={currentIncident} 
            role="civilian"
          />

          {/* Victim Guidance */}
          <VictimGuidance
            disasterType={currentIncident.type}
            nearbyAid={mockAidPoints}
            eta={currentIncident.eta_minutes}
          />

          {/* Additional Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={handlePhotoUpload}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Upload Photo
            </Button>
            <Button 
              variant="outline"
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Update Location
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* App Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Emergency Response
          </h1>
          <p className="text-muted-foreground">
            Tap and hold the button below in case of emergency
          </p>
        </div>

        {/* Emergency Button */}
        <div className="flex justify-center">
          <EmergencyButton onEmergencyActivate={handleEmergencyActivate} />
        </div>

        {/* Location Status */}
        <div className="flex items-center justify-center gap-2 text-sm">
          {location ? (
            <>
              <MapPin className="w-4 h-4 text-success" />
              <span className="text-success">Location detected</span>
            </>
          ) : (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              <span className="text-muted-foreground">Getting location...</span>
            </>
          )}
        </div>

        {/* Anonymous Mode Toggle */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant={isAnonymous ? "default" : "outline"}
            size="sm"
            onClick={() => setIsAnonymous(!isAnonymous)}
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            {isAnonymous ? 'Anonymous Mode ON' : 'Anonymous Mode OFF'}
          </Button>
        </div>

        {/* Language Options */}
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm">English</Button>
          <Button variant="outline" size="sm">हिन्दी</Button>
          <Button variant="outline" size="sm">ಕನ್ನಡ</Button>
        </div>
      </div>
    </div>
  );
};