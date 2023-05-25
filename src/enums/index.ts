export enum TimeType {
  RealTime = 'RealTime',
  Hour = 'Hour',
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
  Unlimited = 'Unlimited',
}

export enum EnergyDeviceKind {
  Electricity = 'Electricity',
  Water = 'Water',
  Oil = 'Oil',
  Gas = 'Gas',
}

export enum ElectricityUsage {
  OverallDemand = 'Overall Demand',
  AirCompressor = 'Air Compressor',
  AirConditioning = 'Air Conditioning',
  Lighting = 'Lighting',
  Power = 'Power',
  Manufacturing = 'Manufacturing',
  Fire = 'Fire',
  Plug = 'Plug',
  Solar = 'Solar',
}

export enum WaterUsage {
  OverallDemand = 'Overall Demand',
  BoilerWater = 'Boiler Water',
  CoolingWater = 'Cooling Water',
  CleanWater = 'Clean Water',
  DomesticWater = 'Domestic Water',
  ManufacturingWater = 'Manufacturing Water',
  ProductWater = 'Product Water',
  WastewaterRecycling = 'Wastewater Recycling',
}

export enum OilUsage {
  OverallDemand = 'Overall Demand',
  CylinderOil = 'Cylinder Oil',
  HydraulicOil = 'Hydraulic Oil',
  TurbineOil = 'Turbine Oil',
  RefrigerationOil = 'Refrigeration Oil',
  MetalProcessingOil = 'MetalProcessing Oil',
  HeatTreatmentOil = 'HeatTreatment Oil',
}

export enum GasUsage {
  OverallDemand = 'Overall Demand',
  Acetylene = 'Acetylene',
  Argon = 'Argon',
  CarbonDioxide = 'Carbon Dioxide',
  Oxygen = 'Oxygen',
  Nitrogen = 'Nitrogen',
  Helium = 'Helium',
  Hydrogen = 'Hydrogen',
}

export enum OeeKpiAlertKind {
  OEE = 'OEE',
  Availability = 'Availability',
  Performance = 'Performance',
  Quality = 'Quality',
}
