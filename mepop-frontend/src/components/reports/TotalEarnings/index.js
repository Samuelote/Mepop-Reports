import TotalEarnings from '../../../styles/reporting/TotalEarnings'
import { memo } from 'react'

const TotalEarningsView = memo(({ data, half }) => (
  <TotalEarnings
    m='0px'
    boxShadow='none'
    borderRadius='0px'
    float
    currencyType={data.currency_type}
    title='Total Earnings'
    value={data.total_earnings}
    netValue={
      (data.total_earnings - data.total_shipping_cost - data.depop_fees - data.depop_payments_fees - data.paypal_fees).toFixed(2)
    }
    data={[
      {
        name: 'Net Earnings',
        value: parseFloat(data.total_earnings - data.total_shipping_cost - data.depop_fees - data.depop_payments_fees - data.paypal_fees)
      },
      { name: 'Depop Fees', value: parseFloat(data.depop_fees) },
      { name: 'Depop Payments Fees', value: parseFloat(data.depop_payments_fees) },
      { name: 'Paypal Fees', value: parseFloat(data.paypal_fees) },
      { name: 'Total Shipping', value: parseFloat(data.total_shipping_cost) }
    ]}
  />
))

export default TotalEarningsView
