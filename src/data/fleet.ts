// Fleet data from Thewawanitkij_Fleet_TH-EN.pdf (TEWAWANITKIJ CO., LTD.)
// PII removed: no license plates, operator names, or personal phone numbers.
export const fleetStats = {
  coreMachines: 38,
  supportEquipment: 12,
  brands: 13,
};

export const fleetBrands = [
  'HINO', 'ISUZU', 'TOYOTA', 'SUZUKI', 'NISSAN', 'CATERPILLAR',
  'KOMATSU', 'KOBELCO', 'SANY', 'SAKAI', 'XCMG', 'TADANO', 'KUBOTA',
];

export const fleetCategories = [
  {
    name: 'รถบรรทุก',
    en: 'Trucks',
    count: 10,
    items: [
      { type: 'รถ 6 ล้อ (กลาง)', model: 'HINO DOMINATOR FC9J', qty: 1 },
      { type: 'รถ 6 ล้อ (ใหญ่)', model: 'HINO VICTER FG8J', qty: 6 },
      { type: 'รถ 10 ล้อ', model: 'HINO VICTER FM8J', qty: 2 },
    ],
  },
  {
    name: 'รถหนักและงานพิเศษ',
    en: 'Heavy & Specialized Trucks',
    count: 5,
    items: [
      { type: 'เครนโมบาย 25 ตัน', model: 'TADANO GRN1 / FB5111', qty: 1 },
      { type: 'รถเฮี๊ยบ 5 ตัน (10 ล้อ)', model: 'ISUZU FVZ', qty: 1 },
      { type: 'รถเฮี๊ยบ 5 ตัน', model: 'HINO MEGA FG1J', qty: 1 },
      { type: 'หัวลาก (เทรลเลอร์)', model: 'HINO 700', qty: 1 },
    ],
  },
  {
    name: 'รถขุด / แบคโฮ',
    en: 'Excavators',
    count: 16,
    items: [
      { type: 'รถขุดเล็ก PC35-PC55', model: 'SANY SY35 · KOBELCO SK45 · SANY SY55', qty: 3 },
      { type: 'รถขุดกลาง PC70-PC75', model: 'CAT 307E · KOBELCO SK75', qty: 2 },
      { type: 'รถขุด PC130-PC140', model: 'CAT 313D/313GC · KOMATSU · KOBELCO SK130/SK140 · SANY SY135C/SY140', qty: 7 },
      { type: 'รถขุดใหญ่ PC200-PC215', model: 'SANY SY200/SY215 · KOBELCO SK200', qty: 4 },
    ],
  },
  {
    name: 'รถบด',
    en: 'Rollers & Compaction',
    count: 3,
    items: [
      { type: 'รถบด 10 ตัน', model: 'SAKAI SV500D · XCMG XS113', qty: 2 },
      { type: 'รถบด 4 ตัน', model: 'SAKAI TG40', qty: 1 },
    ],
  },
  {
    name: 'กระบะและรถเล็ก',
    en: 'Pickups & Light Vehicles',
    count: 4,
    items: [
      { type: 'กระบะ', model: 'TOYOTA VIGO · TOYOTA HILUX', qty: 2 },
      { type: 'รถ 4 ล้อ', model: 'TOYOTA CHAMP · SUZUKI CARRY', qty: 2 },
    ],
  },
  {
    name: 'อุปกรณ์เสริมและหัวงาน',
    en: 'Support Equipment & Attachments',
    count: 12,
    items: [
      { type: 'รถเกรด', model: 'CAT 140G', qty: 1 },
      { type: 'แทรกเตอร์', model: 'KUBOTA', qty: 1 },
      { type: 'รถบรรทุกน้ำ', model: 'NISSAN NAVARA', qty: 1 },
      { type: 'หัวเจาะ / หัวทุบคอนกรีต / หัวคีบ / หัวเจาะดิน', model: 'Breaker · Concrete Crusher · Grapple · Auger', qty: 4 },
      { type: 'เครื่องปั่นไฟ · เครื่องเชื่อม', model: 'Niigata 5kW · Welpro', qty: 4 },
      { type: 'ตู้สำนักงาน · ตู้ห้องน้ำ', model: 'Office Container 3×6m · Toilet Container', qty: 1 },
    ],
  },
];
