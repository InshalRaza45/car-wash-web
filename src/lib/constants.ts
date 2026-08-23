/**
 * CarClean 3D Automotive Experience — Master Constants & Configuration
 * Factual Brand Data Source: CarClean Company, Pforzheim
 */

export const BRAND_INFO = {
  name: 'CarClean Company',
  legalName: 'CarClean Company GmbH',
  tagline: 'Premium Automotive Care & Detailing',
  foundedYear: '2014',
  location: {
    street: 'Wilhelm-Becker-Str. 18',
    city: 'Pforzheim',
    postalCode: '75179',
    state: 'Baden-Württemberg',
    country: 'Germany',
    fullAddress: 'Wilhelm-Becker-Str. 18, 75179 Pforzheim, Germany',
    googleMapsUrl: 'https://maps.google.com/?q=Wilhelm-Becker-Str.+18,+75179+Pforzheim',
  },
  contact: {
    phone: '+49 (0) 7231 978 50',
    phoneRaw: '+49723197850',
    email: 'info@carclean-company.de',
    whatsapp: '+4915123456789',
  },
  hours: {
    weekdays: 'Mon – Fri: 08:00 – 18:00',
    saturday: 'Sat: 09:00 – 14:00',
    sunday: 'Sun: Closed (Washpark 24/7)',
  },
  stats: [
    { value: 10, suffix: '+', label: 'Years of Experience', description: 'Mastering the craft of automotive detailing since 2014' },
    { value: 5000, suffix: '+', label: 'Vehicles Perfected', description: 'From daily drivers to rare collector supercars' },
    { value: 100, suffix: '%', label: 'Quality Commitment', description: 'Pforzheim certified ceramic & paint protection specialists' },
    { value: 7, suffix: ' Bays', label: 'SB Washpark Bays', description: 'Self-service bays with heated osmosis water' },
  ],
} as const

/**
 * 6 Core Visual States across the 0 -> 1 Scroll Timeline
 */
export enum VehicleState {
  DIRTY = 'DIRTY',
  WASHING = 'WASHING',
  CLEAN = 'CLEAN',
  DETAILED = 'DETAILED',
  PROTECTED = 'PROTECTED',
  FINAL = 'FINAL',
}

export interface VehicleStateMilestone {
  state: VehicleState
  progress: number
  label: string
  germanLabel: string
  description: string
  dirtFactor: number
  foamFactor: number
  waterFactor: number
  clearcoatRoughness: number
  clearcoatStrength: number
  ceramicIridescence: number
}

export const VEHICLE_STATE_MILESTONES: VehicleStateMilestone[] = [
  {
    state: VehicleState.DIRTY,
    progress: 0.0,
    label: 'State: Heavy Grime & Oxidation',
    germanLabel: 'Zustand: Verschmutzung & Oxidation',
    description: 'Road film, brake dust, and environmental contamination masking paint luster.',
    dirtFactor: 1.0,
    foamFactor: 0.0,
    waterFactor: 0.0,
    clearcoatRoughness: 0.8,
    clearcoatStrength: 0.1,
    ceramicIridescence: 0.0,
  },
  {
    state: VehicleState.WASHING,
    progress: 0.18,
    label: 'Stage 1: Active Snow Foam & Decontamination',
    germanLabel: 'Stufe 1: Aktivschaum & Vorreinigung',
    description: 'pH-neutral active foam encapsulates grit; high-pressure rinse dissolves road tar.',
    dirtFactor: 0.5,
    foamFactor: 0.95,
    waterFactor: 0.85,
    clearcoatRoughness: 0.5,
    clearcoatStrength: 0.3,
    ceramicIridescence: 0.0,
  },
  {
    state: VehicleState.CLEAN,
    progress: 0.38,
    label: 'Stage 2: Precision Clean & De-ironized',
    germanLabel: 'Stufe 2: Gründliche Reinigung',
    description: 'Pore-deep clean surface reveals baseline paint defects and swirl patterns.',
    dirtFactor: 0.0,
    foamFactor: 0.0,
    waterFactor: 0.1,
    clearcoatRoughness: 0.3,
    clearcoatStrength: 0.5,
    ceramicIridescence: 0.0,
  },
  {
    state: VehicleState.DETAILED,
    progress: 0.58,
    label: 'Stage 3: Multi-Stage Swirl-Free Polish',
    germanLabel: 'Stufe 3: Mehrstufige Lackpolitur',
    description: 'Correction compounds eliminate 95%+ of holograms and micro-scratches.',
    dirtFactor: 0.0,
    foamFactor: 0.0,
    waterFactor: 0.0,
    clearcoatRoughness: 0.08,
    clearcoatStrength: 0.85,
    ceramicIridescence: 0.2,
  },
  {
    state: VehicleState.PROTECTED,
    progress: 0.78,
    label: 'Stage 4: Certified 9H Ceramic Seal',
    germanLabel: 'Stufe 4: 9H Keramikversiegelung',
    description: 'Inorganic SiO2 molecular layer bonds to clearcoat with 115° contact angle.',
    dirtFactor: 0.0,
    foamFactor: 0.0,
    waterFactor: 0.0,
    clearcoatRoughness: 0.02,
    clearcoatStrength: 1.0,
    ceramicIridescence: 0.9,
  },
  {
    state: VehicleState.FINAL,
    progress: 1.0,
    label: 'Stage 5: Showroom Masterpiece Finish',
    germanLabel: 'Stufe 5: Perfektes Showroom-Finish',
    description: 'Flawless optical reflection, wet candy depth, and lasting hydrophobic armor.',
    dirtFactor: 0.0,
    foamFactor: 0.0,
    waterFactor: 0.0,
    clearcoatRoughness: 0.01,
    clearcoatStrength: 1.0,
    ceramicIridescence: 1.0,
  },
]

/**
 * 11 Story Journey Chapters
 */
export interface StoryMilestone {
  id: string
  range: [number, number]
  title: string
  subtitle: string
  germanTitle: string
}

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    id: 'hero-entrance',
    range: [0.00, 0.15],
    title: '01: Neglected Vehicle Entrance',
    subtitle: 'From Dirty to Remarkable',
    germanTitle: 'Verschmutzte Fahrzeugeinfahrt',
  },
  {
    id: 'dust-contamination',
    range: [0.15, 0.28],
    title: '02: Road Contamination',
    subtitle: 'Every journey leaves a mark',
    germanTitle: 'Straßenschmutz & Oxidation',
  },
  {
    id: 'water-sweep',
    range: [0.28, 0.40],
    title: '03: High-Pressure Decontamination',
    subtitle: 'Every detail matters',
    germanTitle: 'Hochdruck-Vorreinigung',
  },
  {
    id: 'interactive-details',
    range: [0.40, 0.55],
    title: '04: 3D Telemetry Inspection',
    subtitle: 'The difference is in the details',
    germanTitle: '3D Hotspot-Inspektion',
  },
  {
    id: 'services-scroll',
    range: [0.55, 0.64],
    title: '05: Complete Treatment Portfolio',
    subtitle: 'One vehicle. Complete care.',
    germanTitle: 'Komplette Fahrzeugpflege',
  },
  {
    id: 'before-after',
    range: [0.64, 0.72],
    title: '06: Interactive Surface Split',
    subtitle: 'Look closer at the transformation',
    germanTitle: 'Vorher-Nachher-Vergleich',
  },
  {
    id: 'process-steps',
    range: [0.72, 0.80],
    title: '07: Certified 5-Step Protocol',
    subtitle: 'From arrival to perfection',
    germanTitle: '5-Stufen-Arbeitsprozess',
  },
  {
    id: 'washpark-showcase',
    range: [0.80, 0.88],
    title: '08: 7 SB Wash Bays & 20 Vacuums',
    subtitle: 'Modern self-service facility',
    germanTitle: 'SB-Waschpark Pforzheim',
  },
  {
    id: 'fleet-corporate',
    range: [0.88, 0.94],
    title: '09: B2B Fleet Maintenance',
    subtitle: 'Corporate asset preservation',
    germanTitle: 'Gewerbe & Flottenpflege',
  },
  {
    id: 'about-heritage',
    range: [0.94, 0.97],
    title: '10: Passion & Certified Craftsmanship',
    subtitle: 'Pforzheim detailing masters',
    germanTitle: 'Über CarClean Pforzheim',
  },
  {
    id: 'showroom-finish',
    range: [0.97, 1.00],
    title: '11: Showroom Reveal & Booking',
    subtitle: 'Schedule your transformation',
    germanTitle: 'Abschluss & Terminvereinbarung',
  },
]

/**
 * 7 Automotive Services
 */
export interface ServiceItem {
  id: string
  title: string
  germanTitle: string
  description: string
  features: string[]
  badge: string
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'vehicle-cleaning',
    title: 'Complete Vehicle Care',
    germanTitle: 'Komplette Fahrzeugreinigung',
    description: 'Meticulous exterior hand wash, wheel rim de-ironization, and paint decontamination using pure osmosis water.',
    features: ['Hand wash with pH-neutral active foam', 'Deep wheel barrel & caliper cleaning', 'Osmosis spot-free high-gloss drying'],
    badge: 'Stage 01',
  },
  {
    id: 'paint-correction',
    title: 'Multi-Stage Paint Correction',
    germanTitle: 'Lackaufbereitung & Politur',
    description: 'Swirl, hologram, and scratch removal via multi-stage rotary and random orbital machine polishing.',
    features: ['Up to 95% swirl & scratch removal', 'Orange peel reduction & mirror clarity', 'Paint depth digital gauge audit'],
    badge: 'Stage 02',
  },
  {
    id: 'ceramic-coating',
    title: 'Certified 9H Ceramic Coating',
    germanTitle: 'Keramikversiegelung',
    description: 'Permanent inorganic nano-ceramic SiO2 glass seal with extreme hydrophobicity and chemical resistance.',
    features: ['115° Contact angle water beading', 'Permanent UV & oxidation protection', 'Certified warranty document'],
    badge: 'Stage 03',
  },
  {
    id: 'interior-detailing',
    title: 'Interior Hygiene & Leather Care',
    germanTitle: 'Innenraumreinigung & Lederpflege',
    description: 'Deep fiber extraction, steam sanitation, matte dashboard protection, and conditioning of fine automotive leather.',
    features: ['Deep upholstery wet extraction', 'Leather conditioning with UV block', 'Ozone air disinfection'],
    badge: 'Stage 04',
  },
  {
    id: 'leasing-return',
    title: 'Leasing Return Preparation',
    germanTitle: 'Leasingrückläufer Aufbereitung',
    description: 'Eliminates unexpected dealership deductions through targeted smart repair and appraisal checklist standards.',
    features: ['Targeted scratch & dent repair', 'Odor and stain removal', 'Official inspection protocol'],
    badge: 'Stage 05',
  },
  {
    id: 'tuev-prep',
    title: 'TÜV & General Inspection Prep',
    germanTitle: 'TÜV & HU-Vorbereitung',
    description: 'Chassis wash, engine bay decontamination, and optical restoration before official roadworthiness inspection.',
    features: ['Dry ice / steam engine cleaning', 'Underbody chassis spray', 'Headlight UV restoration'],
    badge: 'Stage 06',
  },
  {
    id: 'tire-wheel-care',
    title: 'Wheel Ceramic & Tire Sealing',
    germanTitle: 'Felgen- & Reifenservice',
    description: 'High-temperature ceramic seal for brake calipers and rims, preventing brake dust burn-in.',
    features: ['Brake dust hydrophobic barrier', 'Satin finish tire dressing', 'Caliper heat-resistant coating'],
    badge: 'Stage 07',
  },
]

/**
 * 3D Hotspots on Vehicle Body
 */
export interface VehicleHotspot {
  id: string
  area: string
  title: string
  description: string
  position: [number, number, number]
  cameraPos: [number, number, number]
  cameraTarget: [number, number, number]
  specs: string[]
}

export const VEHICLE_HOTSPOTS: VehicleHotspot[] = [
  {
    id: 'paintwork',
    area: 'Hood & Front Panels',
    title: 'Multi-Stage Paint Correction',
    description: '3-stage optical compound cutting, jewel polishing, and 9H ceramic glass bonding for mirror reflections.',
    position: [0, 0.45, 1.4],
    cameraPos: [1.2, 0.9, 2.2],
    cameraTarget: [0, 0.4, 1.2],
    specs: ['95%+ Swirl Elimination', 'Digital Paint Thickness Audit', 'SiO2 Nano Matrix'],
  },
  {
    id: 'interior',
    area: 'Cockpit & Leather Seating',
    title: 'Hygienic Interior Sanitation',
    description: 'Deep carpet fiber wet-extraction, leather pore cleaning, and anti-static UV matte dashboard coating.',
    position: [0.35, 0.65, 0.1],
    cameraPos: [0.9, 1.1, 0.8],
    cameraTarget: [0.1, 0.5, 0.1],
    specs: ['Ozone Disinfection', 'Aniline Leather Moisturizing', 'Anti-Static Dust Shield'],
  },
  {
    id: 'wheels',
    area: 'Alloy Wheels & Calipers',
    title: 'Ceramic Wheel Armor',
    description: 'High-heat wheel ceramic coating prevents abrasive iron brake dust from baking into the alloy clearcoat.',
    position: [0.95, 0.15, 1.1],
    cameraPos: [1.8, 0.4, 1.5],
    cameraTarget: [0.85, 0.2, 1.1],
    specs: ['800°C Heat Resistance', 'Easy-Clean Hydrophobic Finish', 'Brake Dust Repellent'],
  },
  {
    id: 'windshield',
    area: 'Optical Glass & Mirrors',
    title: 'Rain-Repellent Glass Coating',
    description: 'Fluoropolymer glass coating creates a water-shedding barrier for crystal-clear night and rain visibility.',
    position: [0, 0.72, 0.6],
    cameraPos: [0.8, 1.3, 1.4],
    cameraTarget: [0, 0.65, 0.5],
    specs: ['Hydrophobic Roll-Off at 50 km/h', 'Reduced Wiper Blade Wear', 'Anti-Glare Night Vision'],
  },
  {
    id: 'diffuser',
    area: 'Rear Aero & Exhaust Tips',
    title: 'Carbon & Chrome Restoration',
    description: 'Carbon fiber UV sealant and exhaust tip soot removal with mirror chrome metal polish.',
    position: [0, 0.35, -1.8],
    cameraPos: [-1.4, 0.7, -2.5],
    cameraTarget: [0, 0.35, -1.6],
    specs: ['Carbon Fiber UV Resin Shield', 'Exhaust Soot Dissolution', 'Deep Contrast Aero Trim'],
  },
]

/**
 * 5 Process Stages
 */
export interface ProcessStep {
  step: string
  title: string
  germanTitle: string
  description: string
  checkIndicator: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Diagnosis & Paint Measurement',
    germanTitle: 'Diagnose & Schichtdickenmessung',
    description: 'We measure paint thickness across all panels using ultrasonic gauges and inspect under 5000K LED inspection lighting.',
    checkIndicator: 'Digital Audit Completed',
  },
  {
    step: '02',
    title: 'Touchless Pre-Wash & Decontamination',
    germanTitle: 'Vorreinigung & Flugrostentfernung',
    description: 'Snow foam loosens dirt, while iron-fallout removers dissolve embedded industrial and brake dust particles.',
    checkIndicator: 'Decontamination Verified',
  },
  {
    step: '03',
    title: 'Multi-Stage Swirl-Free Polish',
    germanTitle: 'Lackkorrektur & Hochglanzpolitur',
    description: 'Rotary and eccentric polishers with micro-abrasive compounds eliminate swirls, scratches, and hazing.',
    checkIndicator: 'Optical Mirror Refinement',
  },
  {
    step: '04',
    title: '9H Ceramic Seal & Curing',
    germanTitle: 'Keramikversiegelung & Infrarot-Härtung',
    description: 'Application of certified 9H ceramic coating followed by short-wave infrared heat curing for permanent adhesion.',
    checkIndicator: 'Infrared Cured',
  },
  {
    step: '05',
    title: 'Quality Audit & Handover',
    germanTitle: 'Endkontrolle & Fahrzeugübergabe',
    description: 'Final multi-point light inspection with customer walk-around and issuance of the CarClean warranty certificate.',
    checkIndicator: 'Showroom Handover Ready',
  },
]

/**
 * Washpark 4 Feature Stations
 */
export const WASHPARK_FEATURES = [
  {
    title: '7 Covered SB Wash Bays',
    specs: 'Spacious bays with heated high-pressure lances, active snow foam guns, and gentle wheel cleaning programs',
    icon: 'Droplets',
  },
  {
    title: '20 High-Power Vacuum Bays',
    specs: 'Continuous high-suction central turbines with ergonomic nozzles for effortless interior cleaning',
    icon: 'Wind',
  },
  {
    title: '100% Demineralized Osmosis Water',
    specs: 'Ultra-pure osmosis water leaves zero water spots or mineral rings, drying completely streak-free in the sun',
    icon: 'Sparkles',
  },
  {
    title: 'Heated Active Foam Technology',
    specs: 'Gentle pH-balanced snow foam guns that loosen stubborn dirt without scratching',
    icon: 'Zap',
  },
]

/**
 * Master Animation Timeline Configuration (Lightweight & 60+ FPS Optimized)
 */
export const animationConfig = {
  camera: {
    fov: { desktop: 36, tablet: 42, mobile: 50 },
    waypoints: [
      { progress: 0.00, pos: [4.2, 1.4, 4.6] as [number, number, number], target: [0, 0.35, 0] as [number, number, number] },
      { progress: 0.12, pos: [2.8, 1.2, 3.4] as [number, number, number], target: [0.2, 0.45, 0.2] as [number, number, number] },
      { progress: 0.24, pos: [-2.8, 1.5, 3.2] as [number, number, number], target: [-0.1, 0.4, 0] as [number, number, number] },
      { progress: 0.36, pos: [0.9, 0.95, 2.2] as [number, number, number], target: [0.2, 0.55, 0.4] as [number, number, number] },
      { progress: 0.48, pos: [3.4, 1.6, 2.8] as [number, number, number], target: [0, 0.4, 0] as [number, number, number] },
      { progress: 0.60, pos: [-2.2, 1.1, 2.4] as [number, number, number], target: [-0.1, 0.4, 0.2] as [number, number, number] },
      { progress: 0.72, pos: [0.5, 0.7, 1.6] as [number, number, number], target: [0.1, 0.5, 0.3] as [number, number, number] },
      { progress: 0.82, pos: [3.8, 2.2, 4.0] as [number, number, number], target: [0, 0.4, 0] as [number, number, number] },
      { progress: 0.92, pos: [-4.2, 1.4, 3.4] as [number, number, number], target: [0, 0.35, 0] as [number, number, number] },
      { progress: 1.00, pos: [3.6, 1.3, 3.8] as [number, number, number], target: [0, 0.4, 0] as [number, number, number] },
    ],
  },
  vehicle: {
    initialPosition: [0, -0.15, 0] as [number, number, number],
    initialRotation: [0, -0.35, 0] as [number, number, number],
    floatAmplitude: 0.015,
    floatSpeed: 1.4,
  },
  particles: {
    desktop: { maxCount: 750, foamCount: 380, mistCount: 250 },
    tablet: { maxCount: 320, foamCount: 160, mistCount: 100 },
    mobile: { maxCount: 120, foamCount: 60, mistCount: 30 },
  },
  lighting: {
    ambientIntensity: 0.55,
    keyLightColor: '#FFFFFF',
    keyLightIntensity: 2.4,
    rimLightColor: '#00D2FF',
    rimLightIntensity: 3.2,
    underglowColor: '#0070F3',
    underglowIntensity: 1.4,
  },
  postprocessing: {
    bloom: { intensity: 0.35, luminanceThreshold: 0.88, luminanceSmoothing: 0.2 },
    vignette: { offset: 0.25, darkness: 0.55 },
  },
  lenis: {
    duration: 1.05,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical' as const,
    gestureOrientation: 'vertical' as const,
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.2,
  },
  reducedMotion: {
    cameraPos: [3.6, 1.4, 4.0] as [number, number, number],
    cameraTarget: [0, 0.4, 0] as [number, number, number],
  },
} as const
