// Seed Data for Hotel PMS - HOTEL ASTHA
// Aligned with Dashboard design specifications

export const initialProperty = {
  id: 'prop_hotel_astha',
  name: 'HOTEL ASTHA',
  tagline: 'HOTEL ASTHA',
  initials: 'HA',
  email: 'info@asthasoftindia.com',
  phone: '7023318111',
  phoneCode: '+91',
  propertyType: 'Hotel',
  addressLine: 'Jalore',
  city: 'Jalore',
  state: 'Rajasthan',
  country: 'India',
  postalCode: '343001',
  location: 'Jalore, Jalore, India',
  website: 'https://hotelastha.com',
  currency: '₹ (Indian Rupee)',
  currencySymbol: '₹',
  timezone: 'Asia/Kolkata',
  timezoneLabel: 'IST, Indian Standard Time (Asia/Kolkata)',
  checkInTime: '14:00',
  checkOutTime: '11:00',
  createdAt: '22 Oct 2026',
  status: 'ACTIVE',
  businessDate: '2026-11-17', // System operational date
  gstin: '',
  legalName: 'HOTEL ASTHA',
  tradeName: 'HOTEL ASTHA',
  sacCode: '996311', // Accommodation SAC
  fnbSacCode: '996331', // F&B SAC
  terms: [],
  userProfile: {
    name: 'Astha India',
    role: 'Owner',
    initials: 'AI'
  }
};

export const initialRoomTypes = [
  {
    id: 'rt_ultra_premium',
    name: 'Ultra Premium',
    code: 'ULP',
    description: 'Ultra luxurious presidential suite with panoramic views and dedicated butler.',
    baseAdults: 2,
    maxAdults: 4,
    baseChildren: 1,
    maxChildren: 2,
    basePrice: 6500,
    extraAdultPrice: 2000,
    extraChildPrice: 1000,
    status: 'ACTIVE',
    color: '#10b981'
  },
  {
    id: 'rt_deluxe',
    name: 'Delux Room',
    code: 'DXL',
    description: 'Spacious deluxe room with premium linen, balcony, and mini-bar.',
    baseAdults: 1,
    maxAdults: 2,
    baseChildren: 2,
    maxChildren: 2,
    basePrice: 2500,
    extraAdultPrice: 1000,
    extraChildPrice: 500,
    status: 'ACTIVE',
    color: '#3b82f6'
  },
  {
    id: 'rt_premium',
    name: 'Premium',
    code: 'PRM',
    description: 'Luxury premium suite with jacuzzi and executive lounge access.',
    baseAdults: 4,
    maxAdults: 6,
    baseChildren: 2,
    maxChildren: 4,
    basePrice: 4500,
    extraAdultPrice: 1500,
    extraChildPrice: 750,
    status: 'ACTIVE',
    color: '#8b5cf6'
  },
  {
    id: 'rt_standard',
    name: 'Normal',
    code: 'NRM',
    description: 'Comfortable air-conditioned room with king bed and work desk.',
    baseAdults: 2,
    maxAdults: 4,
    baseChildren: 1,
    maxChildren: 1,
    basePrice: 1000,
    extraAdultPrice: 800,
    extraChildPrice: 400,
    status: 'ACTIVE',
    color: '#06b6d4'
  }
];

export const initialRooms = [
  { id: 'rm_501', roomNumber: '501', roomTypeId: 'rt_ultra_premium', floor: '5', status: 'clean', operational: 'available', notes: 'Ready for check-in' },
  { id: 'rm_101', roomNumber: '101', roomTypeId: 'rt_deluxe', floor: '1', status: 'clean', operational: 'available', notes: 'Turnaround required post check-out' },
  { id: 'rm_102', roomNumber: '102', roomTypeId: 'rt_deluxe', floor: '1', status: 'clean', operational: 'available', notes: '' },
  { id: 'rm_301', roomNumber: '301', roomTypeId: 'rt_premium', floor: '3', status: 'clean', operational: 'available', notes: 'Ready for check-in' },
  { id: 'rm_302', roomNumber: '302', roomTypeId: 'rt_premium', floor: '3', status: 'dirty', operational: 'available', notes: 'Ready for check-in' },
  { id: 'rm_201', roomNumber: '201', roomTypeId: 'rt_standard', floor: '2', status: 'clean', operational: 'available', notes: 'Ready for check-in' },
  { id: 'rm_202', roomNumber: '202', roomTypeId: 'rt_standard', floor: '2', status: 'clean', operational: 'available', notes: 'Ready for check-in' }
];

export const initialMealPlans = [
  {
    id: 'mp_std',
    code: 'STD',
    name: 'Standard',
    inclusions: ['Breakfast', 'Lunch', 'Dinner'],
    inclusionDetails: [
      { type: 'Breakfast', from: '7:30 AM', to: '10:30 AM' },
      { type: 'Lunch', from: '12:30 PM', to: '3:30 PM' },
      { type: 'Dinner', from: '7:30 PM', to: '10:30 PM' }
    ],
    pricingModel: 'PER_PERSON',
    adultPrice: 1000,
    childPrice: 500,
    status: 'ACTIVE'
  }
];

export const initialRatePlans = [
  {
    id: 'rp_starting',
    name: 'Starting',
    code: 'STR',
    status: 'ACTIVE',
    mealPlanId: 'mp_std',
    mealPlanName: 'Standard',
    roomTypeRates: {
      rt_deluxe: { active: true, basePrice: 2500, extraAdult: 800, extraChild: 400 },
      rt_normal: { active: true, basePrice: 1500, extraAdult: 500, extraChild: 250 },
      rt_standard: { active: true, basePrice: 1500, extraAdult: 500, extraChild: 250 }
    }
  },
  {
    id: 'rp_test_plan',
    name: 'test plan',
    code: '132',
    status: 'ACTIVE',
    mealPlanId: null,
    mealPlanName: '-',
    roomTypeRates: {
      rt_deluxe: { active: false, basePrice: 0, extraAdult: 0, extraChild: 0 },
      rt_normal: { active: false, basePrice: 0, extraAdult: 0, extraChild: 0 },
      rt_standard: { active: false, basePrice: 0, extraAdult: 0, extraChild: 0 }
    }
  }
];

export const initialReservations = [];

export const initialFolios = {};

export const initialStaffNotes = [];

export const initialOtaChannels = [
  {
    id: 'ota_booking',
    name: 'Booking.com',
    channelCode: 'BOOKING_COM',
    icon: '🏨',
    status: 'ACTIVE',
    lastSync: '2 mins ago',
    mappedRoomsCount: 2,
    rateModel: 'MARKUP_PERCENT',
    rateModifier: 15,
    activeBookings: 0,
    connectionStatus: 'Connected (Two-Way XML)'
  },
  {
    id: 'ota_agoda',
    name: 'Agoda',
    channelCode: 'AGODA',
    icon: '🌐',
    status: 'ACTIVE',
    lastSync: '5 mins ago',
    mappedRoomsCount: 2,
    rateModel: 'DIRECT_SYNC',
    rateModifier: 0,
    activeBookings: 0,
    connectionStatus: 'Connected'
  }
];

export const initialTeamMembers = [
  {
    id: 'usr_01',
    name: 'Astha India',
    email: 'owner@hotelastha.com',
    role: 'Owner',
    avatar: '👩‍💼',
    status: 'ACTIVE',
    properties: ['HOTEL ASTHA'],
    permissions: {
      reservations: { view: true, create: true, edit: true, cancel: true },
      nightAudit: { view: true, execute: true },
      ratesAndInventory: { view: true, edit: true, bulkUpdate: true, stopSell: true },
      team: { view: true, manage: true },
      dashboard: { view: true },
      piiAccess: true,
      ledger: { view: true, settle: true, override: true }
    }
  },
  {
    id: 'usr_02',
    name: 'Shankar L',
    initials: 'S',
    email: 'ss2137789@gmail.com',
    role: 'Hotel Manager / GM',
    status: 'ACTIVE',
    properties: ['HOTEL ASTHA'],
    invitedAt: '3 Nov 2026',
    hasAccount: true
  }
];

export const initialNightAudits = [
  {
    id: 'na_20261105',
    auditDate: '05 Nov 2026',
    rawDate: '2026-11-05',
    isCurrent: false,
    status: 'completed',
    statusLabel: 'Completed',
    startedAt: 'Nov 06, 2026 01:00',
    startedBy: 'System',
    completedAt: 'Nov 06, 2026 01:00',
    completedBy: 'Amit Patel',
    occupiedRooms: 0,
    vacantRooms: 4,
    totalRevenue: 0,
    totalTax: 0,
    adr: 0,
    revPar: 0,
    chargesPostedCount: 0,
    roomChargesLog: []
  },
  {
    id: 'na_20261102',
    auditDate: '02 Nov 2026',
    rawDate: '2026-11-02',
    isCurrent: false,
    status: 'completed',
    statusLabel: 'Completed',
    startedAt: 'Nov 03, 2026 01:00',
    startedBy: 'System',
    completedAt: 'Nov 03, 2026 01:00',
    completedBy: 'Amit Patel',
    occupiedRooms: 0,
    vacantRooms: 4,
    totalRevenue: 0,
    totalTax: 0,
    adr: 0,
    revPar: 0,
    chargesPostedCount: 0,
    roomChargesLog: []
  },
  {
    id: 'na_20261026',
    auditDate: '26 Oct 2026',
    rawDate: '2026-10-26',
    isCurrent: true,
    status: 'running',
    statusLabel: 'Running (Stage 1)',
    startedAt: 'Oct 27, 2026 01:00',
    startedBy: 'Astha India',
    completedAt: '—',
    completedBy: '—',
    occupiedRooms: 2,
    vacantRooms: 2,
    totalRevenue: 5250,
    totalTax: 630,
    adr: 2625,
    revPar: 1312.5,
    chargesPostedCount: 2,
    roomChargesLog: [
      { room: '101', guest: 'Mr Kkk Suthar', rate: 2625, tax: 315, net: 2940, folio: 'FOL_5' },
      { room: '102', guest: 'Mr Shankar Suthar', rate: 2625, tax: 315, net: 2940, folio: 'FOL_4' }
    ]
  },
  {
    id: 'na_20261025',
    auditDate: '25 Oct 2026',
    rawDate: '2026-10-25',
    isCurrent: false,
    status: 'completed',
    statusLabel: 'Completed',
    startedAt: 'Oct 26, 2026 01:00',
    startedBy: 'System',
    completedAt: 'Oct 26, 2026 01:00',
    completedBy: '—',
    occupiedRooms: 1,
    vacantRooms: 3,
    totalRevenue: 2625,
    totalTax: 315,
    adr: 2625,
    revPar: 656.25,
    chargesPostedCount: 1,
    roomChargesLog: [
      { room: '101', guest: 'Mr Kkk Suthar', rate: 2625, tax: 315, net: 2940, folio: 'FOL_5' }
    ]
  },
  {
    id: 'na_20261024',
    auditDate: '24 Oct 2026',
    rawDate: '2026-10-24',
    isCurrent: false,
    status: 'completed',
    statusLabel: 'Completed',
    startedAt: 'Oct 25, 2026 01:00',
    startedBy: 'System',
    completedAt: 'Oct 25, 2026 01:00',
    completedBy: '—',
    occupiedRooms: 2,
    vacantRooms: 2,
    totalRevenue: 5250,
    totalTax: 630,
    adr: 2625,
    revPar: 1312.5,
    chargesPostedCount: 2,
    roomChargesLog: [
      { room: '101', guest: 'Mr Krishna Suthar', rate: 2625, tax: 315, net: 2940, folio: 'FOL_2' },
      { room: '102', guest: 'Mr Shankar Suthar', rate: 2625, tax: 315, net: 2940, folio: 'FOL_4' }
    ]
  },
  {
    id: 'na_20261023',
    auditDate: '23 Oct 2026',
    rawDate: '2026-10-23',
    isCurrent: false,
    status: 'completed',
    statusLabel: 'Completed',
    startedAt: 'Oct 24, 2026 01:00',
    startedBy: 'System',
    completedAt: 'Oct 24, 2026 01:00',
    completedBy: '—',
    occupiedRooms: 1,
    vacantRooms: 3,
    totalRevenue: 2625,
    totalTax: 315,
    adr: 2625,
    revPar: 656.25,
    chargesPostedCount: 1,
    roomChargesLog: [
      { room: '101', guest: 'Mr Suresh Sharma', rate: 2625, tax: 315, net: 2940, folio: 'FOL_1' }
    ]
  },
  {
    id: 'na_20261022',
    auditDate: '22 Oct 2026',
    rawDate: '2026-10-22',
    isCurrent: false,
    status: 'completed',
    statusLabel: 'Completed',
    startedAt: 'Oct 23, 2026 01:00',
    startedBy: 'System',
    completedAt: 'Oct 23, 2026 01:00',
    completedBy: '—',
    occupiedRooms: 1,
    vacantRooms: 3,
    totalRevenue: 2625,
    totalTax: 315,
    adr: 2625,
    revPar: 656.25,
    chargesPostedCount: 1,
    roomChargesLog: [
      { room: '101', guest: 'Mr Suresh Sharma', rate: 2625, tax: 315, net: 2940, folio: 'FOL_1' }
    ]
  }
];

export const initialAuditTrail = [
  {
    id: 'at_01',
    timestamp: '2026-10-24 10:15:30',
    actor: 'Astha India',
    action: 'CHECK_IN',
    entity: 'RESERVATION',
    entityId: '#RES_001',
    details: 'Guest Suresh Sharma checked in to Room 101.'
  },
  {
    id: 'at_02',
    timestamp: '2026-10-24 09:40:12',
    actor: 'Astha India',
    action: 'CHECK_OUT',
    entity: 'RESERVATION',
    entityId: '#RES_002',
    details: 'Guest Pooja Verma checked out. Room 102 transitioned to CLEAN.'
  }
];

export const initialGuests = [
  {
    id: 'gst_shaknrk',
    name: 'Mr Shaknrk Suthar',
    email: 'ssajhdjka@gmail.com',
    phone: '+91 9239288392',
    gender: 'Male',
    guestType: 'Adult',
    nationality: 'India',
    birthDate: null,
    addedOn: '2026-11-12',
    isVIP: false,
    reservationIds: ['res_11']
  },
  {
    id: 'gst_krishana',
    name: 'Mr Krishana Suthar',
    email: 'shanak@gmail.com',
    phone: '+91 9738873383',
    gender: 'Male',
    guestType: 'Adult',
    nationality: 'India',
    birthDate: null,
    addedOn: '2026-11-12',
    isVIP: false,
    reservationIds: ['res_10']
  },
  {
    id: 'gst_shankar',
    name: 'Mr Shankar Suthar',
    email: 'ss2137789@gmail.com',
    phone: '+91 98932938982',
    gender: 'Male',
    guestType: 'Adult',
    nationality: 'India',
    birthDate: '2002-09-27',
    addedOn: '2026-11-12',
    isVIP: false,
    reservationIds: ['res_12', 'res_4', 'res_1']
  },
  {
    id: 'gst_2',
    name: 'Mr Test Name',
    email: 'info@asthasoftindia.com',
    phone: '+91 7023318111',
    gender: 'Male',
    guestType: 'Adult',
    nationality: '—',
    birthDate: null,
    addedOn: '2026-10-22',
    isVIP: true,
    reservationIds: []
  }
];

export const initialTaxRules = [
  {
    id: 'tax_rule_india_gst',
    name: 'India Hotel Slab GST',
    presentationLabel: 'GST',
    categoryType: 'GST',
    calculationMode: 'percentage',
    priceInclusion: 'EXCLUSIVE',
    useSlabs: true,
    slabs: [
      { min: 1, max: 7500, rate: 5 },
      { min: 7501, max: null, rate: 18 }
    ],
    splits: [
      { name: 'CGST', share: 0.5 },
      { name: 'SGST', share: 0.5 }
    ],
    status: 'active'
  }
];

export const initialServiceCharges = [];

