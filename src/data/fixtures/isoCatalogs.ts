/**
 * IntegraERP Global ISO Reference Standards Catalog
 * Provides ISO 4217 Currency Codes, ISO 3166 Country Codes, and NAICS Industry Classifications.
 */

export interface ISOCurrency {
  code: string;
  numericCode: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface ISOCountry {
  alpha2: string;
  alpha3: string;
  numericCode: string;
  name: string;
  capital: string;
  region: string;
}

export const ISO_CURRENCIES: ISOCurrency[] = [
  { code: 'USD', numericCode: '840', name: 'United States Dollar', symbol: '$', decimals: 2 },
  { code: 'EUR', numericCode: '978', name: 'Euro', symbol: '€', decimals: 2 },
  { code: 'GBP', numericCode: '826', name: 'Pound Sterling', symbol: '£', decimals: 2 },
  { code: 'JPY', numericCode: '392', name: 'Japanese Yen', symbol: '¥', decimals: 0 },
  { code: 'CHF', numericCode: '756', name: 'Swiss Franc', symbol: 'CHF', decimals: 2 },
  { code: 'CAD', numericCode: '124', name: 'Canadian Dollar', symbol: 'CA$', decimals: 2 },
  { code: 'AUD', numericCode: '036', name: 'Australian Dollar', symbol: 'A$', decimals: 2 },
  { code: 'INR', numericCode: '356', name: 'Indian Rupee', symbol: '₹', decimals: 2 },
  { code: 'SGD', numericCode: '702', name: 'Singapore Dollar', symbol: 'S$', decimals: 2 },
  { code: 'HKD', numericCode: '344', name: 'Hong Kong Dollar', symbol: 'HK$', decimals: 2 },
  { code: 'CNY', numericCode: '156', name: 'Chinese Yuan Renminbi', symbol: '¥', decimals: 2 },
  { code: 'SEK', numericCode: '752', name: 'Swedish Krona', symbol: 'kr', decimals: 2 },
  { code: 'NZD', numericCode: '554', name: 'New Zealand Dollar', symbol: 'NZ$', decimals: 2 },
  { code: 'MXN', numericCode: '484', name: 'Mexican Peso', symbol: 'MX$', decimals: 2 },
  { code: 'BRL', numericCode: '098', name: 'Brazilian Real', symbol: 'R$', decimals: 2 },
  { code: 'ZAR', numericCode: '710', name: 'South African Rand', symbol: 'R', decimals: 2 },
  { code: 'AED', numericCode: '784', name: 'United Arab Emirates Dirham', symbol: 'AED', decimals: 2 },
  { code: 'KRW', numericCode: '410', name: 'South Korean Won', symbol: '₩', decimals: 0 },
];

export const ISO_COUNTRIES: ISOCountry[] = [
  { alpha2: 'US', alpha3: 'USA', numericCode: '840', name: 'United States of America', capital: 'Washington, D.C.', region: 'Americas' },
  { alpha2: 'GB', alpha3: 'GBR', numericCode: '826', name: 'United Kingdom', capital: 'London', region: 'Europe' },
  { alpha2: 'DE', alpha3: 'DEU', numericCode: '276', name: 'Germany', capital: 'Berlin', region: 'Europe' },
  { alpha2: 'FR', alpha3: 'FRA', numericCode: '250', name: 'France', capital: 'Paris', region: 'Europe' },
  { alpha2: 'JP', alpha3: 'JPN', numericCode: '392', name: 'Japan', capital: 'Tokyo', region: 'Asia' },
  { alpha2: 'CA', alpha3: 'CAN', numericCode: '124', name: 'Canada', capital: 'Ottawa', region: 'Americas' },
  { alpha2: 'AU', alpha3: 'AUS', numericCode: '036', name: 'Australia', capital: 'Canberra', region: 'Oceania' },
  { alpha2: 'IN', alpha3: 'IND', numericCode: '356', name: 'India', capital: 'New Delhi', region: 'Asia' },
  { alpha2: 'SG', alpha3: 'SGP', numericCode: '702', name: 'Singapore', capital: 'Singapore', region: 'Asia' },
  { alpha2: 'BR', alpha3: 'BRA', numericCode: '076', name: 'Brazil', capital: 'Brasília', region: 'Americas' },
  { alpha2: 'ZA', alpha3: 'ZAF', numericCode: '710', name: 'South Africa', capital: 'Pretoria', region: 'Africa' },
  { alpha2: 'AE', alpha3: 'ARE', numericCode: '784', name: 'United Arab Emirates', capital: 'Abu Dhabi', region: 'Asia' },
  { alpha2: 'NL', alpha3: 'NLD', numericCode: '528', name: 'Netherlands', capital: 'Amsterdam', region: 'Europe' },
  { alpha2: 'CH', alpha3: 'CHE', numericCode: '756', name: 'Switzerland', capital: 'Bern', region: 'Europe' },
  { alpha2: 'SE', alpha3: 'SWE', numericCode: '752', name: 'Sweden', capital: 'Stockholm', region: 'Europe' },
];
