import moment from 'moment'
import currency from 'currency.js'

export const formatSalesTable = ({ sales }, dateFormat, currencyType) => {
  const newSales = []
  sales.forEach((sale) => {
    const ms = new Date(sale.date_of_sale).getTime() - new Date(sale.date_of_listing).getTime()
    const days = ms / (1000 * 3600 * 24)
    newSales.push({
      ...sale,
      'date sold': moment(sale.date_of_sale).format(dateFormat ? dateFormat.standard : 'MM-DD-YYYY'),
      buyer: `${sale.name}`,
      username: `${sale.buyer}`,
      'item price': sale.item_price,
      'buyer-paid shipping': sale.buyer_shipping_cost === '-' ? `${currencyType}0.00` : sale.buyer_shipping_cost,
      'seller-paid shipping': sale.usps_cost === '-' ? `${currencyType}0.00` : sale.usps_cost,
      'depop fees': sale.depop_fee === '-' ? `${currencyType}0.00` : sale.depop_fee,
      'stripe fees': sale.depop_payments_fee === '-' ? `${currencyType}0.00` : sale.depop_payments_fee,
      'date listed': moment(sale.date_of_listing).format(dateFormat ? dateFormat.standard : 'MM-DD-YYYY'),
      'days listed': days, // converts from ms to days
      'item description': formatDescription(sale.description),
      address: `${sale.address_line_1} ${sale.city}, ${sale.state ? sale.state : ''} ${sale.post_code}`

    })
  })
  return sort(newSales)
}

export const getRecentSales = ({ sales, currency_type, date_format }, currencyType) => {
  const sortedSales = sort(sales, 'date_of_sale')
  const newSales = []
  const mostRecentDate = sortedSales[0].date_of_sale
  const scndMostRecentDate = moment(mostRecentDate).subtract(1, 'days').format('MM-DD-YYYY')
  sortedSales.forEach((sale) => {
    if (sale.date_of_sale === mostRecentDate || sale.date_of_sale === scndMostRecentDate || newSales.length < 15) {
      const ms = new Date(sale.date_of_sale).getTime() - new Date(sale.date_of_listing).getTime()
      const days = ms / (1000 * 3600 * 24)
      newSales.push({
        ...sale,
        'date sold': moment(sale.date_of_sale).format(date_format.standard),
        buyer: `${sale.name}`,
        username: `${sale.buyer}`,
        'item price': sale.item_price,
        'buyer-paid shipping': sale.buyer_shipping_cost,
        'seller-paid shipping': sale.usps_cost,
        'depop fees': `${currency_type || currencyType}${currency(sale.depop_fee).value + currency(sale.depop_payments_fee).value}`,
        'date listed': moment(sale.date_of_listing).format(date_format.standard),
        'days listed': days, // converts from ms to days
        'item description': formatDescription(sale.description),
        address: `${sale.address_line_1} ${sale.city}, ${sale.state ? sale.state : ''} ${sale.post_code}`

      })
    }
  })
  return newSales
}

// utils
const sort = (sales, term) => {
  return [...sales].sort((a, b) => {
    const date1 = new Date(a[term || 'date sold'])
    const date2 = new Date(b[term || 'date sold'])
    return date2 - date1
  })
}
const formatDescription = (text) => {
  const tagStart = text.lastIndexOf('{')

  const withoutTags = tagStart !== -1 ? text.substring(0, tagStart) : text
  return withoutTags
}
