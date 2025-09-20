import { Incident, ResponderUnit, AidPoint } from '@/types/incident';

// More realistic incidents with AI-detected patterns
export const realisticIncidents: Incident[] = [
  {
    id: 'INC-2024-001',
    created_at: new Date(Date.now() - 2 * 60000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 60000).toISOString(),
    source: 'voice',
    transcript: 'Building collapsed! Many people trapped, I can hear screams from inside. Near Whitefield Metro Station!',
    language: 'en',
    lat: 12.9784,
    lon: 77.7499,
    address: 'Whitefield Metro Station, Bangalore',
    type: 'earthquake',
    severity_score: 98,
    severity_level: 'critical',
    status: 'dispatched',
    reporter_contact: '+91XXXXXX1234',
    anonymous: false,
    victims_count: 45,
    description: 'Multi-story building collapse, structural failure detected by seismic sensors',
    eta_minutes: 5,
    ai_insights: {
      pattern: 'Clustered incidents detected in 2km radius',
      confidence: 0.92,
      recommendation: 'Deploy heavy rescue equipment, medical teams priority',
      risk_escalation: 'Adjacent buildings show stress patterns'
    }
  },
  {
    id: 'INC-2024-002',
    created_at: new Date(Date.now() - 8 * 60000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 60000).toISOString(),
    source: 'app',
    transcript: 'Major accident on ORR near Silk Board. Multiple vehicles involved, fuel leaking!',
    language: 'en',
    lat: 12.9172,
    lon: 77.6228,
    address: 'Outer Ring Road, Silk Board Junction',
    type: 'accident',
    severity_score: 85,
    severity_level: 'high',
    status: 'enroute',
    anonymous: false,
    victims_count: 12,
    description: 'Multi-vehicle collision with hazmat risk',
    eta_minutes: 3,
    ai_insights: {
      pattern: 'Traffic surge detected, alternate routes blocked',
      confidence: 0.88,
      recommendation: 'Hazmat team required, establish 200m perimeter',
      risk_escalation: 'Rush hour congestion increasing response time'
    }
  },
  {
    id: 'INC-2024-003',
    created_at: new Date(Date.now() - 15 * 60000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 60000).toISOString(),
    source: 'voice',
    transcript: 'आग! बहुत तेज़ आग फैल रही है! कोरमंगला में तीन दुकानें जल रही हैं!',
    language: 'hi',
    lat: 12.9352,
    lon: 77.6245,
    address: '5th Block, Koramangala',
    type: 'fire',
    severity_score: 79,
    severity_level: 'high',
    status: 'enroute',
    reporter_contact: '+91XXXXXX5678',
    anonymous: false,
    victims_count: 8,
    description: 'Commercial complex fire, spreading to adjacent structures',
    eta_minutes: 4,
    ai_insights: {
      pattern: 'Wind direction SW at 15km/h, fire spread risk high',
      confidence: 0.91,
      recommendation: 'Deploy 3 units, evacuate 500m radius',
      risk_escalation: 'Gas pipeline detected 50m away'
    }
  },
  {
    id: 'INC-2024-004',
    created_at: new Date(Date.now() - 25 * 60000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 60000).toISOString(),
    source: 'sensors',
    language: 'en',
    lat: 12.9698,
    lon: 77.7500,
    address: 'Marathahalli Bridge Area',
    type: 'flood',
    severity_score: 72,
    severity_level: 'high',
    status: 'rescued',
    anonymous: true,
    victims_count: 150,
    description: 'Flash flood, water level rising 30cm/hour',
    eta_minutes: 0,
    ai_insights: {
      pattern: 'Drainage overflow detected at 3 points',
      confidence: 0.95,
      recommendation: 'Mass evacuation required, deploy boats',
      risk_escalation: 'Power substation at risk in 45 minutes'
    }
  },
  {
    id: 'INC-2024-005',
    created_at: new Date(Date.now() - 4 * 60000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60000).toISOString(),
    source: 'voice',
    transcript: 'ಎದೆನೋವು! ದಯವಿಟ್ಟು ಬೇಗ ಬನ್ನಿ! ಉಸಿರಾಟದ ತೊಂದರೆ!',
    language: 'kn',
    lat: 12.9592,
    lon: 77.6974,
    address: 'HSR Layout, Sector 4',
    type: 'medical',
    severity_score: 90,
    severity_level: 'critical',
    status: 'dispatched',
    reporter_contact: '+91XXXXXX9012',
    anonymous: false,
    victims_count: 1,
    description: 'Cardiac emergency, patient conscious but critical',
    eta_minutes: 2,
    ai_insights: {
      pattern: 'Nearest cardiac unit available',
      confidence: 0.97,
      recommendation: 'Prep for immediate transport to Apollo Hospital',
      risk_escalation: 'Golden hour critical - 42 minutes remaining'
    }
  },
  {
    id: 'INC-2024-006',
    created_at: new Date(Date.now() - 12 * 60000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 60000).toISOString(),
    source: 'app',
    language: 'en',
    lat: 12.9141,
    lon: 77.6411,
    address: 'BTM Layout, 2nd Stage',
    type: 'violence',
    severity_score: 65,
    severity_level: 'medium',
    status: 'enroute',
    anonymous: true,
    victims_count: 5,
    description: 'Civil unrest reported, crowd gathering',
    eta_minutes: 6,
    ai_insights: {
      pattern: 'Social media activity spike detected',
      confidence: 0.78,
      recommendation: 'Deploy crowd control units, establish communication',
      risk_escalation: 'Potential for escalation - monitor closely'
    }
  },
  {
    id: 'INC-2024-007',
    created_at: new Date(Date.now() - 30 * 60000).toISOString(),
    updated_at: new Date(Date.now() - 25 * 60000).toISOString(),
    source: 'voice',
    transcript: 'Gas leak! Strong smell, people feeling dizzy. Evacuate immediately!',
    language: 'en',
    lat: 12.9037,
    lon: 77.5995,
    address: 'Jayanagar 4th Block',
    type: 'hazmat',
    severity_score: 88,
    severity_level: 'high',
    status: 'rescued',
    anonymous: false,
    victims_count: 200,
    description: 'Industrial gas leak, toxic exposure risk',
    eta_minutes: 0,
    ai_insights: {
      pattern: 'Weather conditions worsening dispersion',
      confidence: 0.93,
      recommendation: 'Evacuate 1km radius, hazmat protocol activated',
      risk_escalation: 'School and hospital in affected zone'
    }
  },
  {
    id: 'INC-2024-008',
    created_at: new Date(Date.now() - 6 * 60000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 60000).toISOString(),
    source: 'sensors',
    language: 'en',
    lat: 12.9488,
    lon: 77.7012,
    address: 'Bellandur Lake Area',
    type: 'environmental',
    severity_score: 55,
    severity_level: 'medium',
    status: 'new',
    anonymous: true,
    victims_count: 0,
    description: 'Toxic foam overflow detected, air quality deteriorating',
    eta_minutes: undefined,
    ai_insights: {
      pattern: 'Pollution levels exceeding safe limits',
      confidence: 0.99,
      recommendation: 'Issue health advisory, deploy containment team',
      risk_escalation: 'Residential areas at risk if wind changes'
    }
  }
];

// More detailed responder units
export const realisticResponderUnits: ResponderUnit[] = [
  {
    id: 'BFD-UNIT-001',
    org: 'fire',
    name: 'Bangalore Fire Station Alpha',
    phone: '101',
    capabilities: ['fire', 'rescue', 'hazmat', 'high-rise', 'water-rescue'],
    base_lat: 12.9700,
    base_lon: 77.5900,
    availability_status: 'busy',
    current_lat: 12.9784,
    current_lon: 77.7499,
    current_incident: 'INC-2024-001',
    equipment: ['Ladder truck', 'Rescue tools', 'Breathing apparatus'],
    personnel: 8
  },
  {
    id: 'EMS-UNIT-001',
    org: 'ambulance',
    name: 'Emergency Medical Service Team 1',
    phone: '108',
    capabilities: ['trauma', 'cardiac', 'pediatric', 'critical-care'],
    base_lat: 12.9600,
    base_lon: 77.6300,
    availability_status: 'available',
    equipment: ['Defibrillator', 'Ventilator', 'Trauma kit'],
    personnel: 4
  },
  {
    id: 'KSP-UNIT-001',
    org: 'police',
    name: 'Karnataka State Police Rapid Response',
    phone: '100',
    capabilities: ['crowd_control', 'traffic', 'security', 'investigation'],
    base_lat: 12.9500,
    base_lon: 77.6200,
    availability_status: 'busy',
    current_lat: 12.9141,
    current_lon: 77.6411,
    current_incident: 'INC-2024-006',
    personnel: 12
  },
  {
    id: 'SDRF-UNIT-001',
    org: 'disaster',
    name: 'State Disaster Response Force',
    phone: '1070',
    capabilities: ['rescue', 'medical', 'hazmat', 'evacuation'],
    base_lat: 12.9400,
    base_lon: 77.6100,
    availability_status: 'available',
    equipment: ['Heavy rescue equipment', 'Boats', 'Generators'],
    personnel: 20
  },
  {
    id: 'NGO-UNIT-001',
    org: 'volunteer',
    name: 'Bangalore Citizen Response Team',
    phone: '+91XXXXXX0001',
    capabilities: ['first_aid', 'search', 'supplies', 'communication'],
    base_lat: 12.9300,
    base_lon: 77.6000,
    availability_status: 'available',
    personnel: 15
  }
];

// Enhanced aid points
export const realisticAidPoints: AidPoint[] = [
  {
    id: 'HOSP-001',
    type: 'hospital',
    name: 'Apollo Hospital Bannerghatta',
    lat: 12.8893,
    lon: 77.5975,
    hours: '24/7',
    capacity: 500,
    current_occupancy: 380,
    distance: 2.3,
    contact: '080-2630-4050',
    specialties: ['Trauma', 'Cardiac', 'Neurology'],
    ambulances_available: 3
  },
  {
    id: 'HOSP-002',
    type: 'hospital',
    name: 'Manipal Hospital Whitefield',
    lat: 12.9698,
    lon: 77.7500,
    hours: '24/7',
    capacity: 450,
    current_occupancy: 410,
    distance: 0.8,
    contact: '080-2520-2520',
    specialties: ['Emergency', 'Burns', 'Orthopedic'],
    ambulances_available: 2
  },
  {
    id: 'SHELTER-001',
    type: 'shelter',
    name: 'Community Relief Center Koramangala',
    lat: 12.9352,
    lon: 77.6245,
    hours: '24/7 during emergency',
    capacity: 300,
    current_occupancy: 125,
    distance: 1.5,
    supplies: ['Food', 'Water', 'Blankets', 'First Aid']
  },
  {
    id: 'POLICE-001',
    type: 'police',
    name: 'Whitefield Police Station',
    lat: 12.9784,
    lon: 77.7499,
    hours: '24/7',
    distance: 0.3,
    contact: '100',
    units_available: 4
  },
  {
    id: 'BLOOD-001',
    type: 'bloodbank',
    name: 'Red Cross Blood Bank',
    lat: 12.9592,
    lon: 77.6974,
    hours: '24/7',
    distance: 3.2,
    contact: '080-2522-7777',
    blood_units: {
      'O+': 45,
      'O-': 12,
      'A+': 38,
      'A-': 8,
      'B+': 32,
      'AB+': 15
    }
  }
];

export const disasterGuidance = {
  fire: {
    title: 'Fire Emergency',
    steps: [
      'Stay low to avoid smoke inhalation',
      'Feel doors before opening - if hot, find another exit',
      'Cover nose and mouth with wet cloth if possible',
      'Never use elevators during fire',
      'Call 101 immediately',
      'Move to assembly point after evacuation',
    ],
  },
  flood: {
    title: 'Flood Emergency',
    steps: [
      'Move to higher ground immediately',
      'Avoid walking in moving water',
      'Stay away from electrical equipment',
      'Do not drive through flooded areas',
      'Boil water before drinking',
      'Signal for help from rooftop if trapped',
    ],
  },
  earthquake: {
    title: 'Earthquake Emergency',
    steps: [
      'Drop, Cover, and Hold On',
      'Stay away from windows and heavy objects',
      'If outdoors, move to open area',
      'Do not use elevators',
      'Check for injuries after shaking stops',
      'Be prepared for aftershocks',
    ],
  },
  medical: {
    title: 'Medical Emergency',
    steps: [
      'Check breathing and pulse',
      'Do not move injured unless in immediate danger',
      'Apply pressure to stop bleeding',
      'Keep the person warm and comfortable',
      'Provide CPR if trained and needed',
      'Stay with patient until help arrives',
    ],
  },
  accident: {
    title: 'Road Accident',
    steps: [
      'Ensure your safety first',
      'Call emergency services immediately',
      'Do not move severely injured victims',
      'Control bleeding with direct pressure',
      'Keep victims warm and calm',
      'Direct traffic away from accident site',
    ],
  },
  hazmat: {
    title: 'Chemical/Gas Leak',
    steps: [
      'Evacuate area immediately',
      'Move upwind from the source',
      'Avoid touching contaminated surfaces',
      'Remove contaminated clothing',
      'Rinse exposed skin with water',
      'Seek medical attention for exposure',
    ],
  },
};