export const currencyVals = [
  { label: 'USD', value: { val: '0.30', symbol: '$' } },
  { label: 'GPB', value: { val: '0.30', symbol: '£' } },
  { label: 'EUR', value: { val: '0.35', symbol: '€' } },
  { label: 'CAD', value: { val: '0.30', symbol: '$' } },
  { label: 'AUD', value: { val: '0.30', symbol: '$' } },
  { label: 'NZD', value: { val: '0.45', symbol: '$' } },
  { label: 'INR', value: { val: '0.30', symbol: '₹' } },
  { label: 'BRL', value: { val: '0.6', symbol: 'R$' } },
  { label: 'CZK', value: { val: '10', symbol: 'Kč' } },
  { label: 'DKK', value: { val: '2.6', symbol: 'kr' } },
  { label: 'HKD', value: { val: '2.35', symbol: '$' } },
  { label: 'HUF', value: { val: '90', symbol: 'Ft' } },
  { label: 'ILS', value: { val: '1.2', symbol: '₪' } },
  { label: 'JPY', value: { val: '40', symbol: '￥' } },
  { label: 'MYR', value: { val: '2', symbol: 'RM' } },
  { label: 'MXN', value: { val: '4', symbol: '$' } },
  { label: 'TWD', value: { val: '10', symbol: 'NT$' } },
  { label: 'NOK', value: { val: '2.8', symbol: 'kr' } },
  { label: 'PHP', value: { val: '15', symbol: 'P' } },
  { label: 'PLN', value: { val: '1.35', symbol: 'zł' } },
  { label: 'RUB', value: { val: '10', symbol: '₽.' } },
  { label: 'SGD', value: { val: '0.5', symbol: '$' } },
  { label: 'SEK', value: { val: '3.25', symbol: 'kr' } },
  { label: 'CHF', value: { val: '0.55', symbol: 'CHF' } },
  { label: 'THB', value: { val: '11', symbol: '฿' } }
]
const countryVals = [
  { label: 'United States', value: '2.9' },
  { label: 'United Kingdom', value: '2.9' },
  { label: 'Canada', value: '2.9' },
  { label: 'Australia', value: '2.6' },
  { label: 'Germany', value: '2.49' },
  { label: 'India', value: '2.5' },
  { label: 'Finland', value: '.4' },
  { label: 'Spain', value: '2.9' },
  { label: 'Denmark', value: '2.4' },
  { label: 'France', value: '0.5' },
  { label: 'Greece', value: '0.5' },
  { label: 'Greenland', value: '0.4' },
  { label: 'Iceland', value: '0.4' },
  { label: 'Norway', value: '0.4' },
  { label: 'Sweden', value: '0.4' },
  { label: 'Austria', value: '0.5' },
  { label: 'Belgium', value: '0.5' },
  { label: 'Cyprus', value: '0.5' },
  { label: 'Estonia', value: '0.5' },
  { label: 'Guadeloupe', value: '0.5' },
  { label: 'Gibraltar', value: '0.5' },
  { label: 'Ireland', value: '0.5' },
  { label: 'Italy', value: '0.5' },
  { label: 'Luxembourg', value: '0.5' },
  { label: 'Malta', value: '0.5' },
  { label: 'Montenegro', value: '0.5' },
  { label: 'Netherlands', value: '0.5' },
  { label: 'Portugal', value: '0.5' },
  { label: 'San Marino', value: '0.5' },
  { label: 'Slovakia', value: '0.5' },
  { label: 'Slovenia', value: '0.5' },
  { label: 'Vatican City State', value: '0.5' },
  { label: 'Faroe Islands', value: '0.4' },
  { label: 'Albania', value: '1.3' },
  { label: 'Andorra', value: '1.3' },
  { label: 'Belarus', value: '1.3' },
  { label: 'Bosnia', value: '1.3' },
  { label: 'Herzegovina', value: '1.3' },
  { label: 'Croatia', value: '1.3' },
  { label: 'Czech Republic', value: '1.3' },
  { label: 'Georgia', value: '1.3' },
  { label: 'Hungary', value: '1.3' },
  { label: 'Kosovo', value: '1.3' },
  { label: 'Latvia', value: '1.3' },
  { label: 'Liechtenstein', value: '1.3' },
  { label: 'Lithuania', value: '1.3' },
  { label: 'Macedonia', value: '1.3' },
  { label: 'Poland', value: '1.3' },
  { label: 'Moldova', value: '1.3' },
  { label: 'Romania', value: '1.3' },
  { label: 'Russia', value: '1.3' },
  { label: 'Serbia', value: '1.3' },
  { label: 'Switzerland', value: '1.3' },
  { label: 'Ukraine', value: '1.3' },
  { label: 'Other', value: '1.3' },
  { label: 'Albania', value: '1.3' }

]
export const currencies = currencyVals.map((el, i) => ({ ...el, id: i }))
export const countries = countryVals.map((el, i) => ({ ...el, id: i }))