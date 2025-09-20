export type IncidentType = 
  | 'flood' 
  | 'fire' 
  | 'earthquake' 
  | 'riot' 
  | 'medical' 
  | 'chemical' 
  | 'accident' 
  | 'other';

export type IncidentStatus = 
  | 'new' 
  | 'dispatched' 
  | 'enroute' 
  | 'rescued' 
  | 'closed' 
  | 'false_alarm';

export type SeverityLevel = 
  | 'critical' 
  | 'high' 
  | 'medium' 
  | 'low' 
  | 'minimal';

export interface Incident {
  id: string;
  created_at: string;
  updated_at: string;
  source: 'voice' | 'ivr' | 'sms' | 'app';
  transcript?: string;
  language: string;
  lat: number;
  lon: number;
  address: string;
  type: IncidentType;
  severity_score: number;
  severity_level: SeverityLevel;
  status: IncidentStatus;
  reporter_contact?: string;
  anonymous: boolean;
  victims_count: number;
  description: string;
  eta_minutes?: number;
  assigned_units?: ResponderUnit[];
  attachments?: string[];
}

export interface ResponderUnit {
  id: string;
  org: 'police' | 'fire' | 'ambulance' | 'ngo' | 'volunteer';
  name: string;
  phone: string;
  capabilities: string[];
  base_lat: number;
  base_lon: number;
  availability_status: 'available' | 'busy' | 'offline';
  current_lat?: number;
  current_lon?: number;
}

export interface AidPoint {
  id: string;
  type: 'shelter' | 'hospital' | 'police' | 'pharmacy' | 'food' | 'water';
  name: string;
  lat: number;
  lon: number;
  hours: string;
  capacity?: number;
  current_occupancy?: number;
  distance?: number;
  contact?: string;
}

export interface Dispatch {
  id: string;
  incident_id: string;
  unit_id: string;
  channel: 'sms' | 'voice' | 'app';
  ack_status: 'pending' | 'acknowledged' | 'declined';
  ack_time?: string;
  eta_minutes?: number;
  arrival_time?: string;
  escalation_level: number;
}