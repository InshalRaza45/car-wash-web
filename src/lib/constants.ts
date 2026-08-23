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
    clearcoatRoughness: 0.35,
    clearcoatStrength: 0.5,
    ceramicIridescence: 0.1,
  },
  {
    state: VehicleState.DETAILED,
    progress: 0.58,
    label: 'Stage 3: Multi-Stage Paint Correction',
    germanLabel: 'Stufe 3: Mehrstufige Lackkorrektur',
    description: 'Rotary & dual-action micro-polishing eliminates 95%+ swirl marks and hazing.',
    dirtFactor: 0.0,
    foamFactor: 0.0,
    waterFactor: 0.0,
    clearcoatRoughness: 0.08,
    clearcoatStrength: 0.85,
    ceramicIridescence: 0.3,
  },
  {
    state: VehicleState.PROTECTED,
    progress: 0.78,
    label: 'Stage 4: Ceramic Shield & Hydrophobic Bond',
    germanLabel: 'Stufe 4: Keramikversiegelung & Schutz',
    description: 'Molecular ceramic bonding provides ultra-deep gloss and extreme water beading.',
    dirtFactor: 0.0,
    foamFactor: 0.0,
    waterFactor: 0.0,
    clearcoatRoughness: 0.03,
    clearcoatStrength: 1.0,
    ceramicIridescence: 0.9,
  },
  {
    state: VehicleState.FINAL,
    progress: 1.0,
    label: 'Showroom Finish: Masterpiece Perfection',
    germanLabel: 'Showroom-Finish: Perfektion',
    description: 'Uncompromising clarity, mirror reflections, and long-term asset preservation.',
    dirtFactor: 0.0,
    foamFactor: 0.0,
    waterFactor: 0.0,
    clearcoatRoughness: 0.02,
    clearcoatStrength: 1.0,
    ceramicIridescence: 1.0,
  },
]

/**
 * 11 Master Story Journey Milestones
 */
export const STORY_MILESTONES = [
  { id: 'hero-dirty', range: [0.00, 0.08], title: '01. Problem: Contamination' },
  { id: 'water-sweep', range: [0.08, 0.18], title: '02. Wash: Snow Foam & Rinse' },
  { id: 'ceramic-wrap', range: [0.18, 0.28], title: '03. Ceramic: Contour Wrap' },
  { id: 'inspection-3d', range: [0.28, 0.40], title: '04. 3D Inspection: Hotspots' },
  { id: 'services-flow', range: [0.40, 0.55], title: '05. Services: 7 Treatments' },
  { id: 'before-after', range: [0.55, 0.64], title: '06. Before / After: Beam' },
  { id: 'reveal-finish', range: [0.64, 0.72], title: '07. Finish: Macro Surface' },
  { id: 'process-scan', range: [0.72, 0.80], title: '08. Process: Quality Scan' },
  { id: 'washpark', range: [0.80, 0.88], title: '09. Washpark: 7 Bays' },
  { id: 'fleet-b2b', range: [0.88, 0.94], title: '10. B2B: Fleet Solutions' },
  { id: 'showroom-cta', range: [0.94, 1.00], title: '11. Showroom: Appointment' },
] as const

/**
 * 7 Dedicated Automotive Services
 */
export interface ServiceItem {
  id: string
  title: string
  germanTitle: string
  badge: string
  description: string
  cameraAngle: [number, number, number]
  target: [number, number, number]
  features: string[]
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'vehicle-cleaning',
    title: 'Vehicle Cleaning & Washpark',
    germanTitle: 'Fahrzeugwäsche & Pflege',
    badge: 'Stage 01',
    description: 'Gentle textile foam washing, underbody rinse, and streak-free osmosis demineralized water for flawless spot-free drying.',
    cameraAngle: [3.2, 1.8, 3.6],
    target: [0, 0.4, 0],
    features: ['Active snow foam pre-soak', 'Wheel barrel & caliper de-ironizing', 'Underbody chassis flush', 'Osmosis spot-free rinse'],
  },
  {
    id: 'premium-detailing',
    title: 'Multi-Stage Paint Correction',
    germanTitle: 'Lackkorrektur & Aufbereitung',
    badge: 'Stage 02',
    description: 'Rotary & dual-action micro-polishing to permanently eliminate 95%+ of swirl marks, spiderwebs, hazing, and wash scratches.',
    cameraAngle: [1.2, 0.9, 2.0],
    target: [0.3, 0.5, 0.2],
    features: ['Digital paint depth gauge measurement', '3-step compounding & finishing polish', 'Orange-peel smoothing', 'Hologram-free mirror depth'],
  },
  {
    id: 'ceramic-coating',
    title: 'Ceramic Coating & Sealant',
    germanTitle: 'Keramikversiegelung',
    badge: 'Stage 03',
    description: 'Ultra-hard 9H molecular ceramic bond offering extreme hydrophobic self-cleaning properties and UV chemical protection.',
    cameraAngle: [-2.6, 1.4, 3.2],
    target: [0, 0.4, 0],
    features: ['9H hardness ceramic bond', 'Extreme contact angle water beading', '3–5 year warranty protection', 'Deep candy-gloss finish'],
  },
  {
    id: 'dry-interior-cleaning',
    title: 'Dry & Steam Interior Detailing',
    germanTitle: 'Innenraum-Tiefenreinigung',
    badge: 'Stage 04',
    description: 'Deep hygienic steam extraction, leather conditioning, ozone odor neutralization, and pore-clean matte finish restoration.',
    cameraAngle: [0.0, 1.2, 0.8],
    target: [0, 0.5, -0.2],
    features: ['High-temp dry steam disinfection', 'Nappa leather feeding & protection', 'Alcantara gentle fiber revival', 'HEPA air vent sanitation'],
  },
  {
    id: 'leasing-return',
    title: 'Leasing Return Preparation',
    germanTitle: 'Leasingrückläufer-Aufbereitung',
    badge: 'Stage 05',
    description: 'Comprehensive inspection and cosmetic reconditioning to avoid costly dealership return deductions.',
    cameraAngle: [3.6, 1.2, -2.4],
    target: [0, 0.4, 0],
    features: ['Smart repair for minor scratches', 'Rim scuff & kerb rash remediation', 'Interior stain removal', 'Official inspection protocol check'],
  },
  {
    id: 'tuv-inspection',
    title: 'TÜV & Technical Pre-Check',
    germanTitle: 'TÜV-Vorabprüfung & Service',
    badge: 'Stage 06',
    description: 'Comprehensive vehicle safety and technical pre-inspection ensuring a hassle-free official roadworthiness certification.',
    cameraAngle: [-3.4, 1.6, -1.8],
    target: [0, 0.4, 0],
    features: ['Chassis & brake inspection check', 'Lighting & beam alignment', 'Fluid levels & undercarriage audit', 'Direct TÜV appointment handling'],
  },
  {
    id: 'tire-service',
    title: 'Wheel & Tire Care System',
    germanTitle: 'Reifenservice & Felgenpflege',
    badge: 'Stage 07',
    description: 'Precision wheel mounting, dynamic balancing, ceramic rim coating, and tire conditioning for optimal safety and aesthetics.',
    cameraAngle: [-1.4, 0.4, 1.4],
    target: [-0.95, 0.28, 1.25],
    features: ['Ceramic high-temp rim protection', 'Precision wheel balancing', 'Deep tire rubber nourishment', 'Seasonal wheel storage handling'],
  },
]

/**
 * 3D Hotspots on Vehicle Body
 */
export interface VehicleHotspot {
  id: string
  title: string
  area: string
  position: [number, number, number]
  cameraTarget: [number, number, number]
  cameraPos: [number, number, number]
  description: string
  specs: string[]
}

export const VEHICLE_HOTSPOTS: VehicleHotspot[] = [
  {
    id: 'paintwork',
    title: 'Paint Correction & Ceramic 9H',
    area: 'Hood & Front Fascia',
    position: [0, 0.65, 1.1],
    cameraTarget: [0, 0.5, 0.8],
    cameraPos: [0.8, 1.1, 2.2],
    description: 'Multi-stage machine correction eliminates swirls, water spots, and micro-scratches before sealing under permanent 9H ceramic nano-glass.',
    specs: ['Swirl removal: 95%+', 'Gloss increase: +45 GU', 'Hydrophobic angle: 115°'],
  },
  {
    id: 'interior',
    title: 'Hygienic Interior Restoration',
    area: 'Cockpit & Leather Seating',
    position: [0.3, 0.85, -0.1],
    cameraTarget: [0.1, 0.6, -0.2],
    cameraPos: [0.0, 1.2, 1.1],
    description: 'Steam sterilization, deep leather conditioning with matte UV block, carpet fiber extraction, and ozone air purification.',
    specs: ['Steam Temp: 160°C', 'Zero silicone gloss', '100% allergen elimination'],
  },
  {
    id: 'wheels',
    title: 'Wheel & Brake Caliper Sealant',
    area: 'Front Left 21" Alloy',
    position: [-0.98, 0.32, 1.25],
    cameraTarget: [-0.95, 0.28, 1.25],
    cameraPos: [-1.8, 0.5, 1.8],
    description: 'Acid-free decontamination removes baked-on brake dust followed by a 1200°C heat-resistant ceramic rim coating.',
    specs: ['Heat resistance: 1200°C', 'Brake dust repelling', 'Effortless touchless cleaning'],
  },
  {
    id: 'windshield',
    title: 'Hydrophobic Glass Shield',
    area: 'Windshield & Panoramic Roof',
    position: [0, 0.95, 0.4],
    cameraTarget: [0, 0.8, 0.2],
    cameraPos: [0, 1.6, 2.2],
    description: 'Fluoropolymer glass treatment allows rainwater to bead and roll off instantly at 50 km/h without wiper action.',
    specs: ['Roll-off speed: >50 km/h', 'Night glare reduction', 'Frost adhesion inhibitor'],
  },
  {
    id: 'rear-diffuser',
    title: 'Carbon & Plastic Restoration',
    area: 'Rear Diffuser & Exhaust',
    position: [0, 0.45, -2.1],
    cameraTarget: [0, 0.4, -1.8],
    cameraPos: [-1.6, 0.8, -3.2],
    description: 'Deep UV-stabilized plastic nourishment and stainless steel exhaust tip hand polishing to factory mirror chrome.',
    specs: ['UV-resistant deep black', 'Non-greasy satin finish', 'Mirror exhaust tips'],
  },
]

/**
 * 5 Process Steps ("From Arrival to Perfection")
 */
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Vehicle Analysis & Paint Inspection',
    germanTitle: 'Fahrzeuganalyse & Lackmessung',
    description: 'Digital ultrasound paint depth measurement across 40+ points to detect previous repaints and clearcoat thickness.',
    lightTarget: [0, 1.2, 1.2],
    checkIndicator: '✓ Analysis Protocol Verified',
  },
  {
    step: '02',
    title: 'Custom Care Consultation',
    germanTitle: 'Individuelle Beratung',
    description: 'Personalized treatment strategy aligned with vehicle usage, storage conditions, and customer expectations.',
    lightTarget: [-0.8, 1.0, 0],
    checkIndicator: '✓ Scope of Work Defined',
  },
  {
    step: '03',
    title: 'Multi-Stage Deep Decontamination',
    germanTitle: 'Mehrstufige Tiefenreinigung',
    description: 'pH-neutral snow foam bath, iron fallout dissolution, tar removal, and synthetic clay bar de-gritting.',
    lightTarget: [0.8, 0.8, -0.5],
    checkIndicator: '✓ Decontamination Complete',
  },
  {
    step: '04',
    title: 'Machine Polish & Ceramic Bonding',
    germanTitle: 'Lackveredelung & Keramikversiegelung',
    description: 'Precision dual-action polishing under 5000K daylight inspection lamps followed by hand-applied ceramic coating.',
    lightTarget: [0, 0.9, 0],
    checkIndicator: '✓ 9H Coating Cured',
  },
  {
    step: '05',
    title: 'Final Quality Audit & Handover',
    germanTitle: 'Qualitätskontrolle & Übergabe',
    description: '360° light tunnel inspection audit and issuance of the CarClean digital warranty certificate.',
    lightTarget: [0, 1.4, 0],
    checkIndicator: '✓ Showroom Certification Issued',
  },
] as const

/**
 * Washpark Feature Stations
 */
export const WASHPARK_FEATURES = [
  {
    title: '7 Self-Service Wash Bays',
    specs: 'Extra-wide covered bays with high-clearance for transporters and sports cars',
    icon: 'Droplets',
  },
  {
    title: '20 High-Power Vacuum Bays',
    specs: 'Ergonomic dual-hose suction systems with compressed air blowing guns',
    icon: 'Wind',
  },
  {
    title: '100% Osmosis Demineralized Water',
    specs: 'Mineral-free pure water for spot-free, streak-free natural drying without chamois',
    icon: 'Sparkles',
  },
  {
    title: 'Heated Active Foam Technology',
    specs: 'Gentle pH-balanced snow foam guns that loosen stubborn dirt without scratching',
    icon: 'Zap',
  },
]

/**
 * Master Animation Timeline Configuration
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
    desktop: { maxCount: 1400, foamCount: 700, mistCount: 500 },
    tablet: { maxCount: 600, foamCount: 300, mistCount: 200 },
    mobile: { maxCount: 200, foamCount: 100, mistCount: 50 },
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
    bloom: { intensity: 0.4, luminanceThreshold: 0.85, luminanceSmoothing: 0.2 },
    vignette: { offset: 0.25, darkness: 0.6 },
  },
  lenis: {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical' as const,
    gestureOrientation: 'vertical' as const,
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.4,
  },
  reducedMotion: {
    cameraPos: [3.6, 1.4, 4.0] as [number, number, number],
    cameraTarget: [0, 0.4, 0] as [number, number, number],
  },
} as const
