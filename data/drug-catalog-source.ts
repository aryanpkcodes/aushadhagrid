import type { DrugCategory, FacilityTier } from '@/types'

// Deterministic seed source for the generic medicine catalog.
// Each base drug expands into 1-4 strength/form variants to build a
// realistic 300+ entry district formulary. No randomness is used anywhere
// in this file — variant generation is purely positional/deterministic.

export interface BaseDrug {
  name: string
  category: DrugCategory
  variants: { strength: string; form: string; unitType: string }[]
  coldChain?: boolean
  essential?: boolean
  tiers: FacilityTier[]
}

const TAB = 'Tablet'
const CAP = 'Capsule'
const SYR = 'Syrup'
const INJ = 'Injection'
const IVF = 'IV Fluid'
const OINT = 'Ointment'
const DROP = 'Drops'
const CREAM = 'Cream'
const SUSP = 'Suspension'
const POWD = 'Powder'
const LOT = 'Lotion'
const SACHET = 'Sachet'

const ALL_TIERS: FacilityTier[] = ['PHC', 'CHC', 'TALUK_HOSPITAL', 'DISTRICT_HOSPITAL', 'DEPOT']
const HOSPITAL_TIERS: FacilityTier[] = ['CHC', 'TALUK_HOSPITAL', 'DISTRICT_HOSPITAL', 'DEPOT']
const TERTIARY_TIERS: FacilityTier[] = ['DISTRICT_HOSPITAL', 'DEPOT']

export const BASE_DRUGS: BaseDrug[] = [
  // ---------- PHC ESSENTIALS ----------
  { name: 'Paracetamol', category: 'ANTIPYRETIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '500 mg', form: TAB, unitType: 'tablet' },
    { strength: '125 mg/5 ml', form: SYR, unitType: 'bottle' },
    { strength: '150 mg', form: INJ, unitType: 'vial' },
  ]},
  { name: 'ORS', category: 'PHC_ESSENTIALS', tiers: ALL_TIERS, essential: true, variants: [
    { strength: 'WHO Formula', form: SACHET, unitType: 'sachet' },
  ]},
  { name: 'Zinc Sulfate', category: 'PEDIATRIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '20 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Ibuprofen', category: 'ANALGESIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '400 mg', form: TAB, unitType: 'tablet' },
    { strength: '100 mg/5 ml', form: SYR, unitType: 'bottle' },
  ]},
  { name: 'Diclofenac', category: 'ANALGESIC', tiers: ALL_TIERS, variants: [
    { strength: '50 mg', form: TAB, unitType: 'tablet' },
    { strength: '75 mg/3 ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Aspirin', category: 'CARDIOVASCULAR', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '75 mg', form: TAB, unitType: 'tablet' },
    { strength: '300 mg', form: TAB, unitType: 'tablet' },
  ]},

  // ---------- ANTIBIOTICS ----------
  { name: 'Amoxicillin', category: 'ANTIBIOTIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '250 mg', form: CAP, unitType: 'capsule' },
    { strength: '500 mg', form: CAP, unitType: 'capsule' },
    { strength: '125 mg/5 ml', form: SUSP, unitType: 'bottle' },
  ]},
  { name: 'Azithromycin', category: 'ANTIBIOTIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '500 mg', form: TAB, unitType: 'tablet' },
    { strength: '200 mg/5 ml', form: SUSP, unitType: 'bottle' },
  ]},
  { name: 'Doxycycline', category: 'ANTIBIOTIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '100 mg', form: CAP, unitType: 'capsule' },
  ]},
  { name: 'Cefixime', category: 'ANTIBIOTIC', tiers: ALL_TIERS, variants: [
    { strength: '200 mg', form: TAB, unitType: 'tablet' },
    { strength: '100 mg/5 ml', form: SUSP, unitType: 'bottle' },
  ]},
  { name: 'Metronidazole', category: 'ANTIBIOTIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '400 mg', form: TAB, unitType: 'tablet' },
    { strength: '500 mg/100 ml', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Albendazole', category: 'ANTIBIOTIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '400 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Mebendazole', category: 'ANTIBIOTIC', tiers: ALL_TIERS, variants: [
    { strength: '100 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Ciprofloxacin', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '500 mg', form: TAB, unitType: 'tablet' },
    { strength: '200 mg/100 ml', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Ceftriaxone', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '1 g', form: INJ, unitType: 'vial' },
    { strength: '250 mg', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Cefotaxime', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '1 g', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Piperacillin/Tazobactam', category: 'ANTIBIOTIC', tiers: TERTIARY_TIERS, variants: [
    { strength: '4.5 g', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Amikacin', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '500 mg/2 ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Gentamicin', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '80 mg/2 ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Meropenem', category: 'ANTIBIOTIC', tiers: TERTIARY_TIERS, variants: [
    { strength: '1 g', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Vancomycin', category: 'ANTIBIOTIC', tiers: TERTIARY_TIERS, variants: [
    { strength: '500 mg', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Clindamycin', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '300 mg', form: CAP, unitType: 'capsule' },
  ]},
  { name: 'Amoxicillin/Clavulanate', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '625 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Ofloxacin', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '200 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Cloxacillin', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '500 mg', form: CAP, unitType: 'capsule' },
  ]},
  { name: 'Erythromycin', category: 'ANTIBIOTIC', tiers: ALL_TIERS, variants: [
    { strength: '250 mg', form: TAB, unitType: 'tablet' },
  ]},

  // ---------- ANTIPYRETIC / ANALGESIC extras ----------
  { name: 'Tramadol', category: 'ANALGESIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '50 mg', form: CAP, unitType: 'capsule' },
  ]},
  { name: 'Morphine', category: 'EMERGENCY', tiers: TERTIARY_TIERS, variants: [
    { strength: '10 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Nimesulide', category: 'ANALGESIC', tiers: ALL_TIERS, variants: [
    { strength: '100 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Mefenamic Acid', category: 'ANALGESIC', tiers: ALL_TIERS, variants: [
    { strength: '500 mg', form: TAB, unitType: 'tablet' },
  ]},

  // ---------- GASTROINTESTINAL ----------
  { name: 'Omeprazole', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '20 mg', form: CAP, unitType: 'capsule' },
  ]},
  { name: 'Pantoprazole', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '40 mg', form: TAB, unitType: 'tablet' },
    { strength: '40 mg', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Domperidone', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, variants: [
    { strength: '10 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Ondansetron', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '4 mg', form: TAB, unitType: 'tablet' },
    { strength: '2 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Ranitidine', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, variants: [
    { strength: '150 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Lactulose', category: 'GASTROINTESTINAL', tiers: HOSPITAL_TIERS, variants: [
    { strength: '10 g/15 ml', form: SYR, unitType: 'bottle' },
  ]},
  { name: 'Oral Rehydration Salts (Low Osmolarity)', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: SACHET, unitType: 'sachet' },
  ]},
  { name: 'Loperamide', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, variants: [
    { strength: '2 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Drotaverine', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, variants: [
    { strength: '80 mg', form: TAB, unitType: 'tablet' },
  ]},

  // ---------- RESPIRATORY ----------
  { name: 'Salbutamol', category: 'RESPIRATORY', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '100 mcg MDI', form: 'Inhaler', unitType: 'inhaler' },
    { strength: '2 mg/5 ml', form: SYR, unitType: 'bottle' },
    { strength: 'Respirator Solution', form: 'Nebulization', unitType: 'vial' },
  ]},
  { name: 'Budesonide', category: 'RESPIRATORY', tiers: HOSPITAL_TIERS, variants: [
    { strength: '200 mcg MDI', form: 'Inhaler', unitType: 'inhaler' },
    { strength: 'Respules', form: 'Nebulization', unitType: 'ampoule' },
  ]},
  { name: 'Beclomethasone', category: 'RESPIRATORY', tiers: HOSPITAL_TIERS, variants: [
    { strength: '100 mcg MDI', form: 'Inhaler', unitType: 'inhaler' },
  ]},
  { name: 'Ipratropium Bromide', category: 'RESPIRATORY', tiers: HOSPITAL_TIERS, variants: [
    { strength: 'Nebulization Solution', form: 'Nebulization', unitType: 'ampoule' },
  ]},
  { name: 'Chlorpheniramine', category: 'RESPIRATORY', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '4 mg', form: TAB, unitType: 'tablet' },
    { strength: '2 mg/5 ml', form: SYR, unitType: 'bottle' },
  ]},
  { name: 'Cetirizine', category: 'RESPIRATORY', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '10 mg', form: TAB, unitType: 'tablet' },
    { strength: '5 mg/5 ml', form: SYR, unitType: 'bottle' },
  ]},
  { name: 'Loratadine', category: 'RESPIRATORY', tiers: ALL_TIERS, variants: [
    { strength: '10 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Dextromethorphan Cough Syrup', category: 'RESPIRATORY', tiers: ALL_TIERS, variants: [
    { strength: '10 mg/5 ml', form: SYR, unitType: 'bottle' },
  ]},
  { name: 'Doxofylline', category: 'RESPIRATORY', tiers: HOSPITAL_TIERS, variants: [
    { strength: '400 mg', form: TAB, unitType: 'tablet' },
  ]},

  // ---------- CARDIOVASCULAR ----------
  { name: 'Amlodipine', category: 'CARDIOVASCULAR', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '5 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Losartan', category: 'CARDIOVASCULAR', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '50 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Telmisartan', category: 'CARDIOVASCULAR', tiers: ALL_TIERS, variants: [
    { strength: '40 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Atenolol', category: 'CARDIOVASCULAR', tiers: ALL_TIERS, variants: [
    { strength: '50 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Metoprolol', category: 'CARDIOVASCULAR', tiers: HOSPITAL_TIERS, variants: [
    { strength: '25 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Furosemide', category: 'CARDIOVASCULAR', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '40 mg', form: TAB, unitType: 'tablet' },
    { strength: '10 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Atorvastatin', category: 'CARDIOVASCULAR', tiers: ALL_TIERS, variants: [
    { strength: '10 mg', form: TAB, unitType: 'tablet' },
    { strength: '20 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Clopidogrel', category: 'CARDIOVASCULAR', tiers: HOSPITAL_TIERS, variants: [
    { strength: '75 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Digoxin', category: 'CARDIOVASCULAR', tiers: HOSPITAL_TIERS, variants: [
    { strength: '0.25 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Dopamine', category: 'EMERGENCY', tiers: TERTIARY_TIERS, essential: true, variants: [
    { strength: '40 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Noradrenaline', category: 'EMERGENCY', tiers: TERTIARY_TIERS, essential: true, variants: [
    { strength: '2 mg/2 ml', form: INJ, unitType: 'ampoule' },
  ]},

  // ---------- DIABETES ----------
  { name: 'Metformin', category: 'DIABETES', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '500 mg', form: TAB, unitType: 'tablet' },
    { strength: '1000 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Glibenclamide', category: 'DIABETES', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '5 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Glimepiride', category: 'DIABETES', tiers: ALL_TIERS, variants: [
    { strength: '2 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Insulin (Human, Regular)', category: 'DIABETES', tiers: HOSPITAL_TIERS, coldChain: true, essential: true, variants: [
    { strength: '40 IU/ml', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Insulin (NPH)', category: 'DIABETES', tiers: HOSPITAL_TIERS, coldChain: true, variants: [
    { strength: '40 IU/ml', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Sitagliptin', category: 'DIABETES', tiers: HOSPITAL_TIERS, variants: [
    { strength: '50 mg', form: TAB, unitType: 'tablet' },
  ]},

  // ---------- MATERNAL / OBSTETRIC ----------
  { name: 'Iron & Folic Acid (IFA)', category: 'MATERNAL_HEALTH', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '100 mg/500 mcg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Calcium + Vitamin D3', category: 'MATERNAL_HEALTH', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '500 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Folic Acid', category: 'MATERNAL_HEALTH', tiers: ALL_TIERS, variants: [
    { strength: '5 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Oxytocin', category: 'OBSTETRIC', tiers: HOSPITAL_TIERS, essential: true, coldChain: true, variants: [
    { strength: '10 IU/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Methylergometrine', category: 'OBSTETRIC', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '0.2 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Misoprostol', category: 'OBSTETRIC', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '200 mcg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Magnesium Sulfate', category: 'OBSTETRIC', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '50% w/v', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Betamethasone', category: 'OBSTETRIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '4 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Nifedipine', category: 'OBSTETRIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '10 mg', form: CAP, unitType: 'capsule' },
  ]},

  // ---------- PEDIATRIC ----------
  { name: 'Paracetamol Pediatric Drops', category: 'PEDIATRIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '100 mg/ml', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Vitamin A', category: 'PEDIATRIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '1 lakh IU', form: DROP, unitType: 'bottle' },
    { strength: '2 lakh IU', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Multivitamin Syrup', category: 'PEDIATRIC', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: SYR, unitType: 'bottle' },
  ]},
  { name: 'Amoxicillin Pediatric Drops', category: 'PEDIATRIC', tiers: ALL_TIERS, variants: [
    { strength: '50 mg/ml', form: DROP, unitType: 'bottle' },
  ]},

  // ---------- EMERGENCY ----------
  { name: 'Adrenaline', category: 'EMERGENCY', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '1 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Atropine', category: 'EMERGENCY', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '0.6 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Hydrocortisone', category: 'EMERGENCY', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '100 mg', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Dexamethasone', category: 'EMERGENCY', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '4 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Diazepam', category: 'EMERGENCY', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '5 mg', form: TAB, unitType: 'tablet' },
    { strength: '10 mg/2 ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Midazolam', category: 'EMERGENCY', tiers: HOSPITAL_TIERS, variants: [
    { strength: '5 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Phenytoin', category: 'EMERGENCY', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '100 mg', form: TAB, unitType: 'tablet' },
    { strength: '50 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Naloxone', category: 'EMERGENCY', tiers: TERTIARY_TIERS, variants: [
    { strength: '0.4 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Calcium Gluconate', category: 'EMERGENCY', tiers: HOSPITAL_TIERS, variants: [
    { strength: '10% w/v', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Mannitol', category: 'EMERGENCY', tiers: TERTIARY_TIERS, essential: true, variants: [
    { strength: '20% w/v', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Anti-Snake Venom (Polyvalent)', category: 'EMERGENCY', tiers: TERTIARY_TIERS, coldChain: true, essential: true, variants: [
    { strength: '10 ml', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Anti-Rabies Vaccine', category: 'EMERGENCY', tiers: HOSPITAL_TIERS, coldChain: true, essential: true, variants: [
    { strength: '0.5 ml', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Tetanus Toxoid', category: 'EMERGENCY', tiers: ALL_TIERS, coldChain: true, essential: true, variants: [
    { strength: '0.5 ml', form: INJ, unitType: 'vial' },
  ]},

  // ---------- IV FLUIDS ----------
  { name: 'Normal Saline', category: 'IV_FLUID', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '0.9% 500 ml', form: IVF, unitType: 'bottle' },
    { strength: '0.9% 1000 ml', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Ringer Lactate', category: 'IV_FLUID', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '500 ml', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Dextrose 5%', category: 'IV_FLUID', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: 'D5 500 ml', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Dextrose 10%', category: 'IV_FLUID', tiers: HOSPITAL_TIERS, variants: [
    { strength: 'D10 500 ml', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Dextrose Normal Saline', category: 'IV_FLUID', tiers: HOSPITAL_TIERS, variants: [
    { strength: 'DNS 500 ml', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Sodium Bicarbonate', category: 'IV_FLUID', tiers: HOSPITAL_TIERS, variants: [
    { strength: '7.5% 10 ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Potassium Chloride', category: 'IV_FLUID', tiers: HOSPITAL_TIERS, variants: [
    { strength: '15% 10 ml', form: INJ, unitType: 'ampoule' },
  ]},

  // ---------- INFECTION CONTROL ----------
  { name: 'Povidone-Iodine', category: 'INFECTION_CONTROL', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '5% w/v', form: 'Solution', unitType: 'bottle' },
    { strength: '5% w/w', form: OINT, unitType: 'tube' },
  ]},
  { name: 'Chlorhexidine', category: 'INFECTION_CONTROL', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '4% w/v', form: 'Solution', unitType: 'bottle' },
    { strength: '7.1% w/w Gel', form: 'Gel', unitType: 'tube' },
  ]},
  { name: 'Hydrogen Peroxide', category: 'INFECTION_CONTROL', tiers: ALL_TIERS, variants: [
    { strength: '6% w/v', form: 'Solution', unitType: 'bottle' },
  ]},
  { name: 'Surgical Spirit', category: 'INFECTION_CONTROL', tiers: ALL_TIERS, variants: [
    { strength: '70% v/v', form: 'Solution', unitType: 'bottle' },
  ]},
  { name: 'Bleaching Powder', category: 'INFECTION_CONTROL', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '33% Available Chlorine', form: POWD, unitType: 'kg' },
  ]},
  { name: 'Sodium Hypochlorite', category: 'INFECTION_CONTROL', tiers: ALL_TIERS, variants: [
    { strength: '1% w/v', form: 'Solution', unitType: 'bottle' },
  ]},

  // ---------- VITAMINS / MINERALS ----------
  { name: 'Vitamin B Complex', category: 'VITAMIN_MINERAL', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: TAB, unitType: 'tablet' },
    { strength: 'Standard', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Cholecalciferol (Vitamin D3)', category: 'VITAMIN_MINERAL', tiers: ALL_TIERS, variants: [
    { strength: '60,000 IU', form: 'Sachet/Cap', unitType: 'sachet' },
  ]},
  { name: 'Calcium Carbonate', category: 'VITAMIN_MINERAL', tiers: ALL_TIERS, variants: [
    { strength: '500 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Zinc + Multivitamin', category: 'VITAMIN_MINERAL', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: TAB, unitType: 'tablet' },
  ]},

  // ---------- CHRONIC DISEASE ----------
  { name: 'Levothyroxine', category: 'CHRONIC_DISEASE', tiers: ALL_TIERS, variants: [
    { strength: '50 mcg', form: TAB, unitType: 'tablet' },
    { strength: '100 mcg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Carbamazepine', category: 'CHRONIC_DISEASE', tiers: HOSPITAL_TIERS, variants: [
    { strength: '200 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Sodium Valproate', category: 'CHRONIC_DISEASE', tiers: HOSPITAL_TIERS, variants: [
    { strength: '200 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Salbutamol + Theophylline', category: 'CHRONIC_DISEASE', tiers: HOSPITAL_TIERS, variants: [
    { strength: 'Standard', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Allopurinol', category: 'CHRONIC_DISEASE', tiers: ALL_TIERS, variants: [
    { strength: '100 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Isoniazid', category: 'CHRONIC_DISEASE', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '300 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Rifampicin', category: 'CHRONIC_DISEASE', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '450 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Ethambutol', category: 'CHRONIC_DISEASE', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '800 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Pyrazinamide', category: 'CHRONIC_DISEASE', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '750 mg', form: TAB, unitType: 'tablet' },
  ]},

  // ---------- DERMATOLOGY ----------
  { name: 'Clotrimazole', category: 'DERMATOLOGY', tiers: ALL_TIERS, variants: [
    { strength: '1% w/w', form: CREAM, unitType: 'tube' },
  ]},
  { name: 'Betamethasone Cream', category: 'DERMATOLOGY', tiers: ALL_TIERS, variants: [
    { strength: '0.05% w/w', form: CREAM, unitType: 'tube' },
  ]},
  { name: 'Permethrin', category: 'DERMATOLOGY', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '5% w/w', form: LOT, unitType: 'bottle' },
  ]},
  { name: 'Calamine Lotion', category: 'DERMATOLOGY', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: LOT, unitType: 'bottle' },
  ]},
  { name: 'Silver Sulfadiazine', category: 'DERMATOLOGY', tiers: HOSPITAL_TIERS, variants: [
    { strength: '1% w/w', form: CREAM, unitType: 'tube' },
  ]},
  { name: 'Mupirocin', category: 'DERMATOLOGY', tiers: ALL_TIERS, variants: [
    { strength: '2% w/w', form: OINT, unitType: 'tube' },
  ]},
  { name: 'Fluconazole', category: 'DERMATOLOGY', tiers: ALL_TIERS, variants: [
    { strength: '150 mg', form: CAP, unitType: 'capsule' },
  ]},

  // ---------- ENT ----------
  { name: 'Xylometazoline', category: 'ENT', tiers: ALL_TIERS, variants: [
    { strength: '0.1% w/v', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Ciprofloxacin Ear Drops', category: 'ENT', tiers: ALL_TIERS, variants: [
    { strength: '0.3% w/v', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Clotrimazole Ear Drops', category: 'ENT', tiers: ALL_TIERS, variants: [
    { strength: '1% w/v', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Benzocaine Ear Drops', category: 'ENT', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: DROP, unitType: 'bottle' },
  ]},

  // ---------- OPHTHALMOLOGY ----------
  { name: 'Chloramphenicol Eye Drops', category: 'OPHTHALMOLOGY', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '0.5% w/v', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Ciprofloxacin Eye Drops', category: 'OPHTHALMOLOGY', tiers: ALL_TIERS, variants: [
    { strength: '0.3% w/v', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Tetracycline Eye Ointment', category: 'OPHTHALMOLOGY', tiers: ALL_TIERS, variants: [
    { strength: '1% w/w', form: OINT, unitType: 'tube' },
  ]},
  { name: 'Homatropine Eye Drops', category: 'OPHTHALMOLOGY', tiers: HOSPITAL_TIERS, variants: [
    { strength: '2% w/v', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Timolol Eye Drops', category: 'OPHTHALMOLOGY', tiers: HOSPITAL_TIERS, variants: [
    { strength: '0.5% w/v', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Sodium Chloride Eye Drops', category: 'OPHTHALMOLOGY', tiers: ALL_TIERS, variants: [
    { strength: '0.9% w/v', form: DROP, unitType: 'bottle' },
  ]},

  // ---------- ADDITIONAL PHC / GENERAL BULK ----------
  { name: 'Pyridoxine', category: 'PHC_ESSENTIALS', tiers: ALL_TIERS, variants: [
    { strength: '10 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Antacid (Aluminium/Magnesium Hydroxide)', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: SUSP, unitType: 'bottle' },
    { strength: 'Standard', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Salbutamol Tablet', category: 'RESPIRATORY', tiers: ALL_TIERS, variants: [
    { strength: '4 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Prednisolone', category: 'CHRONIC_DISEASE', tiers: HOSPITAL_TIERS, variants: [
    { strength: '10 mg', form: TAB, unitType: 'tablet' },
    { strength: '20 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Hydroxyzine', category: 'PHC_ESSENTIALS', tiers: ALL_TIERS, variants: [
    { strength: '25 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Promethazine', category: 'PHC_ESSENTIALS', tiers: ALL_TIERS, variants: [
    { strength: '25 mg', form: TAB, unitType: 'tablet' },
    { strength: '25 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Ivermectin', category: 'ANTIBIOTIC', tiers: ALL_TIERS, variants: [
    { strength: '12 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Praziquantel', category: 'ANTIBIOTIC', tiers: ALL_TIERS, variants: [
    { strength: '600 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Chloroquine', category: 'ANTIBIOTIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '250 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Artesunate', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '60 mg', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Primaquine', category: 'ANTIBIOTIC', tiers: ALL_TIERS, variants: [
    { strength: '7.5 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Doxycycline Malaria Prophylaxis Pack', category: 'ANTIBIOTIC', tiers: ALL_TIERS, variants: [
    { strength: '100 mg', form: CAP, unitType: 'capsule' },
  ]},
  { name: 'Rabies Immunoglobulin', category: 'EMERGENCY', tiers: TERTIARY_TIERS, coldChain: true, variants: [
    { strength: '300 IU/ml', form: INJ, unitType: 'vial' },
  ]},
  { name: 'BCG Vaccine', category: 'PHC_ESSENTIALS', tiers: ALL_TIERS, coldChain: true, essential: true, variants: [
    { strength: 'Standard', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Measles-Rubella Vaccine', category: 'PHC_ESSENTIALS', tiers: ALL_TIERS, coldChain: true, essential: true, variants: [
    { strength: 'Standard', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Oral Polio Vaccine', category: 'PHC_ESSENTIALS', tiers: ALL_TIERS, coldChain: true, essential: true, variants: [
    { strength: 'Standard', form: DROP, unitType: 'vial' },
  ]},
  { name: 'Pentavalent Vaccine', category: 'PHC_ESSENTIALS', tiers: ALL_TIERS, coldChain: true, essential: true, variants: [
    { strength: 'Standard', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Hepatitis B Vaccine', category: 'PHC_ESSENTIALS', tiers: ALL_TIERS, coldChain: true, essential: true, variants: [
    { strength: 'Standard', form: INJ, unitType: 'vial' },
  ]},

  // ---------- ADDITIONAL ANTIBIOTICS ----------
  { name: 'Ampicillin', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '500 mg', form: CAP, unitType: 'capsule' },
    { strength: '500 mg', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Cefadroxil', category: 'ANTIBIOTIC', tiers: ALL_TIERS, variants: [
    { strength: '500 mg', form: CAP, unitType: 'capsule' },
  ]},
  { name: 'Cefpodoxime', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '200 mg', form: TAB, unitType: 'tablet' },
    { strength: '50 mg/5 ml', form: SUSP, unitType: 'bottle' },
  ]},
  { name: 'Levofloxacin', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '500 mg', form: TAB, unitType: 'tablet' },
    { strength: '500 mg/100 ml', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Norfloxacin', category: 'ANTIBIOTIC', tiers: ALL_TIERS, variants: [
    { strength: '400 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Tinidazole', category: 'ANTIBIOTIC', tiers: ALL_TIERS, variants: [
    { strength: '500 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Nitrofurantoin', category: 'ANTIBIOTIC', tiers: ALL_TIERS, variants: [
    { strength: '100 mg', form: CAP, unitType: 'capsule' },
  ]},
  { name: 'Cotrimoxazole', category: 'ANTIBIOTIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '480 mg', form: TAB, unitType: 'tablet' },
    { strength: '240 mg/5 ml', form: SUSP, unitType: 'bottle' },
  ]},
  { name: 'Chloramphenicol', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '500 mg', form: CAP, unitType: 'capsule' },
    { strength: '1 g', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Colistin', category: 'ANTIBIOTIC', tiers: TERTIARY_TIERS, variants: [
    { strength: '1 MIU', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Teicoplanin', category: 'ANTIBIOTIC', tiers: TERTIARY_TIERS, variants: [
    { strength: '200 mg', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Linezolid', category: 'ANTIBIOTIC', tiers: TERTIARY_TIERS, variants: [
    { strength: '600 mg', form: TAB, unitType: 'tablet' },
    { strength: '600 mg/300 ml', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Fluconazole Injection', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '2 mg/ml', form: INJ, unitType: 'bottle' },
  ]},
  { name: 'Itraconazole', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '100 mg', form: CAP, unitType: 'capsule' },
  ]},

  // ---------- ADDITIONAL CARDIOVASCULAR ----------
  { name: 'Ramipril', category: 'CARDIOVASCULAR', tiers: HOSPITAL_TIERS, variants: [
    { strength: '5 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Enalapril', category: 'CARDIOVASCULAR', tiers: ALL_TIERS, variants: [
    { strength: '5 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Hydrochlorothiazide', category: 'CARDIOVASCULAR', tiers: ALL_TIERS, variants: [
    { strength: '12.5 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Spironolactone', category: 'CARDIOVASCULAR', tiers: HOSPITAL_TIERS, variants: [
    { strength: '25 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Isosorbide Dinitrate', category: 'CARDIOVASCULAR', tiers: HOSPITAL_TIERS, variants: [
    { strength: '5 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Nitroglycerin Infusion', category: 'CARDIOVASCULAR', tiers: TERTIARY_TIERS, variants: [
    { strength: '5 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Heparin', category: 'CARDIOVASCULAR', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '5000 IU/ml', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Enoxaparin', category: 'CARDIOVASCULAR', tiers: HOSPITAL_TIERS, variants: [
    { strength: '40 mg/0.4 ml', form: INJ, unitType: 'syringe' },
  ]},
  { name: 'Warfarin', category: 'CARDIOVASCULAR', tiers: HOSPITAL_TIERS, variants: [
    { strength: '5 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Rosuvastatin', category: 'CARDIOVASCULAR', tiers: ALL_TIERS, variants: [
    { strength: '10 mg', form: TAB, unitType: 'tablet' },
  ]},

  // ---------- ADDITIONAL DIABETES ----------
  { name: 'Insulin (Premixed 30/70)', category: 'DIABETES', tiers: HOSPITAL_TIERS, coldChain: true, variants: [
    { strength: '40 IU/ml', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Voglibose', category: 'DIABETES', tiers: HOSPITAL_TIERS, variants: [
    { strength: '0.3 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Pioglitazone', category: 'DIABETES', tiers: HOSPITAL_TIERS, variants: [
    { strength: '15 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Glucose Test Strips', category: 'DIABETES', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: 'Strip', unitType: 'strip' },
  ]},
  { name: 'Dextrose 25% Injection', category: 'DIABETES', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '25% 25 ml', form: INJ, unitType: 'ampoule' },
  ]},

  // ---------- ADDITIONAL GASTROINTESTINAL ----------
  { name: 'Esomeprazole', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, variants: [
    { strength: '40 mg', form: CAP, unitType: 'capsule' },
  ]},
  { name: 'Sucralfate', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, variants: [
    { strength: '1 g/10 ml', form: SUSP, unitType: 'bottle' },
  ]},
  { name: 'Dicyclomine', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, variants: [
    { strength: '10 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Bisacodyl', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, variants: [
    { strength: '5 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Metoclopramide', category: 'GASTROINTESTINAL', tiers: HOSPITAL_TIERS, variants: [
    { strength: '10 mg', form: TAB, unitType: 'tablet' },
    { strength: '5 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Rabeprazole', category: 'GASTROINTESTINAL', tiers: ALL_TIERS, variants: [
    { strength: '20 mg', form: TAB, unitType: 'tablet' },
  ]},

  // ---------- ADDITIONAL RESPIRATORY ----------
  { name: 'Levosalbutamol', category: 'RESPIRATORY', tiers: HOSPITAL_TIERS, variants: [
    { strength: 'Respirator Solution', form: 'Nebulization', unitType: 'ampoule' },
  ]},
  { name: 'Montelukast', category: 'RESPIRATORY', tiers: ALL_TIERS, variants: [
    { strength: '10 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Theophylline', category: 'RESPIRATORY', tiers: HOSPITAL_TIERS, variants: [
    { strength: '200 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Ambroxol', category: 'RESPIRATORY', tiers: ALL_TIERS, variants: [
    { strength: '30 mg/5 ml', form: SYR, unitType: 'bottle' },
  ]},
  { name: 'Fexofenadine', category: 'RESPIRATORY', tiers: ALL_TIERS, variants: [
    { strength: '120 mg', form: TAB, unitType: 'tablet' },
  ]},

  // ---------- ADDITIONAL PEDIATRIC ----------
  { name: 'Cefixime Pediatric Drops', category: 'PEDIATRIC', tiers: ALL_TIERS, variants: [
    { strength: '25 mg/ml', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Domperidone Pediatric Drops', category: 'PEDIATRIC', tiers: ALL_TIERS, variants: [
    { strength: '5 mg/ml', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Ibuprofen Pediatric Drops', category: 'PEDIATRIC', tiers: ALL_TIERS, variants: [
    { strength: '40 mg/ml', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Iron Syrup (Pediatric)', category: 'PEDIATRIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '20 mg/ml', form: SYR, unitType: 'bottle' },
  ]},
  { name: 'Cough Expectorant Pediatric', category: 'PEDIATRIC', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: SYR, unitType: 'bottle' },
  ]},

  // ---------- ADDITIONAL EMERGENCY / INJECTIONS ----------
  { name: 'Succinylcholine', category: 'INJECTION', tiers: TERTIARY_TIERS, variants: [
    { strength: '50 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Vecuronium', category: 'INJECTION', tiers: TERTIARY_TIERS, variants: [
    { strength: '4 mg', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Propofol', category: 'INJECTION', tiers: TERTIARY_TIERS, variants: [
    { strength: '10 mg/ml', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Ketamine', category: 'INJECTION', tiers: HOSPITAL_TIERS, variants: [
    { strength: '50 mg/ml', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Lignocaine', category: 'INJECTION', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '2% w/v', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Bupivacaine', category: 'INJECTION', tiers: HOSPITAL_TIERS, variants: [
    { strength: '0.5% w/v', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Tranexamic Acid', category: 'INJECTION', tiers: HOSPITAL_TIERS, variants: [
    { strength: '500 mg/5 ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Pantoprazole Infusion', category: 'INJECTION', tiers: HOSPITAL_TIERS, variants: [
    { strength: '40 mg', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Vitamin K (Phytomenadione)', category: 'INJECTION', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '10 mg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Anti-D Immunoglobulin', category: 'INJECTION', tiers: TERTIARY_TIERS, coldChain: true, variants: [
    { strength: '300 mcg', form: INJ, unitType: 'vial' },
  ]},

  // ---------- ADDITIONAL IV FLUIDS ----------
  { name: 'Normal Saline (100 ml)', category: 'IV_FLUID', tiers: HOSPITAL_TIERS, variants: [
    { strength: '0.9% 100 ml', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Ringer Lactate (1000 ml)', category: 'IV_FLUID', tiers: HOSPITAL_TIERS, variants: [
    { strength: '1000 ml', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Dextrose 5% (1000 ml)', category: 'IV_FLUID', tiers: HOSPITAL_TIERS, variants: [
    { strength: 'D5 1000 ml', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Hydroxyethyl Starch (Colloid)', category: 'IV_FLUID', tiers: TERTIARY_TIERS, variants: [
    { strength: '6% 500 ml', form: IVF, unitType: 'bottle' },
  ]},
  { name: 'Water for Injection', category: 'IV_FLUID', tiers: HOSPITAL_TIERS, variants: [
    { strength: '10 ml', form: INJ, unitType: 'ampoule' },
  ]},

  // ---------- ADDITIONAL MATERNAL / OBSTETRIC ----------
  { name: 'Carboprost', category: 'OBSTETRIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '250 mcg/ml', form: INJ, unitType: 'ampoule' },
  ]},
  { name: 'Dinoprostone Gel', category: 'OBSTETRIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '0.5 mg', form: 'Gel', unitType: 'syringe' },
  ]},
  { name: 'Pregnancy Test Kit', category: 'OBSTETRIC', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: 'Kit', unitType: 'kit' },
  ]},
  { name: 'Anti-D Prophylaxis Injection', category: 'OBSTETRIC', tiers: HOSPITAL_TIERS, coldChain: true, variants: [
    { strength: '300 mcg', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Progesterone', category: 'OBSTETRIC', tiers: HOSPITAL_TIERS, variants: [
    { strength: '200 mg', form: CAP, unitType: 'capsule' },
  ]},

  // ---------- ADDITIONAL VITAMIN / MINERAL ----------
  { name: 'Vitamin C', category: 'VITAMIN_MINERAL', tiers: ALL_TIERS, variants: [
    { strength: '500 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Magnesium Oxide', category: 'VITAMIN_MINERAL', tiers: ALL_TIERS, variants: [
    { strength: '250 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Folic Acid + Vitamin B12', category: 'VITAMIN_MINERAL', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Ferrous Sulfate', category: 'VITAMIN_MINERAL', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '200 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Oral Calcium Syrup', category: 'VITAMIN_MINERAL', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: SYR, unitType: 'bottle' },
  ]},

  // ---------- ADDITIONAL CHRONIC DISEASE ----------
  { name: 'Streptomycin', category: 'CHRONIC_DISEASE', tiers: HOSPITAL_TIERS, variants: [
    { strength: '1 g', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Ethionamide', category: 'CHRONIC_DISEASE', tiers: HOSPITAL_TIERS, variants: [
    { strength: '250 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Dapsone', category: 'CHRONIC_DISEASE', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '100 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Clofazimine', category: 'CHRONIC_DISEASE', tiers: HOSPITAL_TIERS, variants: [
    { strength: '100 mg', form: CAP, unitType: 'capsule' },
  ]},
  { name: 'Efavirenz', category: 'CHRONIC_DISEASE', tiers: TERTIARY_TIERS, variants: [
    { strength: '600 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Tenofovir/Lamivudine', category: 'CHRONIC_DISEASE', tiers: TERTIARY_TIERS, variants: [
    { strength: 'Standard', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Phenobarbitone', category: 'CHRONIC_DISEASE', tiers: HOSPITAL_TIERS, variants: [
    { strength: '60 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Risperidone', category: 'CHRONIC_DISEASE', tiers: HOSPITAL_TIERS, variants: [
    { strength: '2 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Escitalopram', category: 'CHRONIC_DISEASE', tiers: HOSPITAL_TIERS, variants: [
    { strength: '10 mg', form: TAB, unitType: 'tablet' },
  ]},

  // ---------- ADDITIONAL DERMATOLOGY ----------
  { name: 'Benzyl Benzoate', category: 'DERMATOLOGY', tiers: ALL_TIERS, variants: [
    { strength: '25% w/v', form: LOT, unitType: 'bottle' },
  ]},
  { name: 'Ketoconazole Shampoo', category: 'DERMATOLOGY', tiers: ALL_TIERS, variants: [
    { strength: '2% w/v', form: 'Shampoo', unitType: 'bottle' },
  ]},
  { name: 'Salicylic Acid Ointment', category: 'DERMATOLOGY', tiers: ALL_TIERS, variants: [
    { strength: '6% w/w', form: OINT, unitType: 'tube' },
  ]},
  { name: 'Framycetin Skin Cream', category: 'DERMATOLOGY', tiers: ALL_TIERS, variants: [
    { strength: '1% w/w', form: CREAM, unitType: 'tube' },
  ]},
  { name: 'Neomycin + Bacitracin Ointment', category: 'DERMATOLOGY', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: OINT, unitType: 'tube' },
  ]},

  // ---------- ADDITIONAL ENT / OPHTHALMOLOGY ----------
  { name: 'Fluticasone Nasal Spray', category: 'ENT', tiers: ALL_TIERS, variants: [
    { strength: '50 mcg/dose', form: 'Nasal Spray', unitType: 'bottle' },
  ]},
  { name: 'Saline Nasal Drops', category: 'ENT', tiers: ALL_TIERS, variants: [
    { strength: '0.65% w/v', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Gentamicin Ear Drops', category: 'ENT', tiers: ALL_TIERS, variants: [
    { strength: '0.3% w/v', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Carboxymethylcellulose Eye Drops', category: 'OPHTHALMOLOGY', tiers: ALL_TIERS, variants: [
    { strength: '0.5% w/v', form: DROP, unitType: 'bottle' },
  ]},
  { name: 'Atropine Eye Ointment', category: 'OPHTHALMOLOGY', tiers: HOSPITAL_TIERS, variants: [
    { strength: '1% w/w', form: OINT, unitType: 'tube' },
  ]},
  { name: 'Moxifloxacin Eye Drops', category: 'OPHTHALMOLOGY', tiers: HOSPITAL_TIERS, variants: [
    { strength: '0.5% w/v', form: DROP, unitType: 'bottle' },
  ]},

  // ---------- FINAL BULK ADDITIONS (COASTAL / MONSOON PROGRAM ITEMS) ----------
  { name: 'Doxycycline Dispersible', category: 'ANTIBIOTIC', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '100 mg', form: 'Dispersible Tablet', unitType: 'tablet' },
  ]},
  { name: 'Penicillin G', category: 'ANTIBIOTIC', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '10 lakh IU', form: INJ, unitType: 'vial' },
  ]},
  { name: 'Rapid Malaria Antigen Kit', category: 'EMERGENCY', tiers: ALL_TIERS, essential: true, variants: [
    { strength: 'Standard', form: 'Kit', unitType: 'kit' },
  ]},
  { name: 'Leptospira IgM Rapid Test Kit', category: 'EMERGENCY', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: 'Standard', form: 'Kit', unitType: 'kit' },
  ]},
  { name: 'Dengue NS1 Rapid Test Kit', category: 'EMERGENCY', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: 'Standard', form: 'Kit', unitType: 'kit' },
  ]},
  { name: 'Platelet Concentrate Request Form Kit', category: 'EMERGENCY', tiers: TERTIARY_TIERS, variants: [
    { strength: 'Standard', form: 'Kit', unitType: 'kit' },
  ]},
  { name: 'Oral Rehydration Solution (Coconut-Flavoured Program Pack)', category: 'PHC_ESSENTIALS', tiers: ALL_TIERS, variants: [
    { strength: 'Standard', form: SACHET, unitType: 'sachet' },
  ]},
  { name: 'Bleaching Powder (Well Disinfection Pack)', category: 'INFECTION_CONTROL', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '33% Available Chlorine', form: POWD, unitType: 'kg' },
  ]},
  { name: 'Halogen Water Purification Tablets', category: 'INFECTION_CONTROL', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '33 mg', form: TAB, unitType: 'tablet' },
  ]},
  { name: 'Doxycycline Prophylaxis (Flood Relief Pack)', category: 'ANTIBIOTIC', tiers: ALL_TIERS, variants: [
    { strength: '100 mg', form: CAP, unitType: 'capsule' },
  ]},
  { name: 'Amoxicillin (Flood Relief Pediatric Pack)', category: 'PEDIATRIC', tiers: ALL_TIERS, variants: [
    { strength: '125 mg/5 ml', form: SUSP, unitType: 'bottle' },
  ]},
  { name: 'Gloves (Examination, Nitrile)', category: 'INFECTION_CONTROL', tiers: ALL_TIERS, essential: true, variants: [
    { strength: 'Medium', form: 'Pair', unitType: 'pair' },
    { strength: 'Large', form: 'Pair', unitType: 'pair' },
  ]},
  { name: 'Surgical Face Mask', category: 'INFECTION_CONTROL', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '3-Ply', form: 'Mask', unitType: 'piece' },
  ]},
  { name: 'IV Cannula', category: 'INJECTION', tiers: HOSPITAL_TIERS, essential: true, variants: [
    { strength: '20G', form: 'Cannula', unitType: 'piece' },
    { strength: '22G', form: 'Cannula', unitType: 'piece' },
  ]},
  { name: 'Disposable Syringe', category: 'INJECTION', tiers: ALL_TIERS, essential: true, variants: [
    { strength: '5 ml', form: 'Syringe', unitType: 'piece' },
    { strength: '10 ml', form: 'Syringe', unitType: 'piece' },
  ]},
]
