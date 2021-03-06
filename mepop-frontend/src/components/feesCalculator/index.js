import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { formatNum } from '../reports/util/general'
import Card from '../../styles/elements/Card'
import Input from '../../styles/elements/Input'
import Select from '../../styles/elements/Select'
import Checkbox from '../../styles/elements/Checkbox'
import Text from '../../styles/elements/Text'
import Flex from '../../styles/layout/Flex'

import { currencies } from './utils'

const initVals = {
  pricePaid: '',
  listingPrice: '',
  shipping: '0',
  depopFee: '10',
  paypalFee: '2.9',
  paypalCurrencyFee: '0.30',
  usaBased: true
}
function FeeCalculator (props) {
  // (listing price+shipping-pricepaid) - all fees
  const [form, updateForm] = useState(initVals)
  const [symbol, updateSymbol] = useState('$')
  const updateVal = (field) => {
    updateForm({ ...form, [field.target.name]: field.target.value })
  }
  const handleSelect = (field) => {
    if (field.target.name === 'currency') {
      updateForm({ ...form, paypalCurrencyFee: JSON.parse(field.target.value).value.val })
      updateSymbol(JSON.parse(field.target.value).value.symbol)
    }
  }

  useEffect(() => {
    if (form.usaBased) {
      updateForm({ ...form, paypalFee: 2.9 })
    } else {
      updateForm({ ...form, paypalFee: 4.4 })
    }
  }, [form.usaBased])

  const totalRevenue = add(
    form.listingPrice || 0,
    form.shipping || 0
  )
  const paypalFee = getPercent(
    totalRevenue || 0,
    form.paypalFee || 0
  )

  const depopFee = getPercent(
    totalRevenue || 0,
    form.depopFee || 0
  )
  const shipping = add(0, form.shipping || 0)
  const costOfItem = add(0, form.pricePaid || 0)
  const profit = (
    parseFloat(totalRevenue) -
    parseFloat(paypalFee) -
    parseFloat(depopFee) -
    parseFloat(shipping) -
    parseFloat(costOfItem)
  ).toFixed(2)

  return (
    <Flex flexDirection='column' alignItems='center' width={[1]}>

      <Card
        p='40px'
        width='800px'
        maxWidth='95%'
        sx={{
          '@media only screen and (max-width: 600px)': {
            padding: '10px !important'
          }
        }}
      >
        <Text fontWeight={600} fontSize='30px' mb='25px' color='primary' alignSelf='flex-start'>Calculate Your Fees</Text>
        <Flex
          justifyContent='space-between'
          width={[1]}
          sx={{
            '@media only screen and (max-width: 730px)': {
              flexDirection: 'column'
            }
          }}
        >

          <Flex
            flexDirection='column'
            width={[1]}
            mb='10px'
          >
            <Input
              label='Cost of Item (optional)'
              placeholder='Cost of Item (optional)'
              name='pricePaid'
              onChange={updateVal}
              type='number'
              min='0'
              max='1000'
              mb='4px'
              borderColor='greyDisabled'
              pl='10px'
              borderRadius
            />
            <Input
              label='Listing Price'
              placeholder='Listing Price'
              name='listingPrice'
              onChange={updateVal}
              type='number'
              min='0'
              max='1000'
              mb='4px'
              borderColor='greyDisabled'
              pl='10px'
              borderRadius
            />

            <Input
              label='Shipping'
              placeholder='Shipping'
              name='shipping'
              onChange={updateVal}
              type='number'
              min='0'
              max='1000'
              mb='4px'
              borderColor='greyDisabled'
              pl='10px'
              borderRadius
            />
            <Select
              rebass
              label='Currency'
              name='currency'
              options={currencies}
              onChange={handleSelect}
              mb='4px'
            />
            <Checkbox
              label='Shipping AND Buying from United States'
              onChange={() => {
                updateForm({ ...form, usaBased: !form.usaBased })
              }}
              containerProps={{ mt: '10px' }}
              color={form.usaBased ? 'primary' : null}
              checked={form.usaBased}
            />
          </Flex>
          <Flex
            width={[1]}
            mb='10px'
          >
            <Breakdown>
              <Flex mt='30px' justifyContent='space-between'>
                <Text fontWeight={500} fontSize={17}>Calculated Revenue:</Text>
                <Text fontWeight={500} sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <Span>
                    {form.listingPrice ? `${formatNum(symbol, form.listingPrice)}` : null}
                    {form.listingPrice && form.shipping ? ' + ' : null}
                    {form.shipping !== '0' ? ` ${formatNum(symbol, form.shipping)} ` : null}
                    {form.listingPrice || form.shipping !== '0' ? ' = ' : null}
                  </Span> */}
                  <SpanValue>{formatNum(symbol, totalRevenue)}</SpanValue>
                </Text>

              </Flex>
              <Flex mt='20px' justifyContent='space-between'>
                <Text fontWeight={500} fontSize={17}>Shipping:</Text>
                <Text fontWeight={500} sx={{ display: 'flex', alignItems: 'center' }}>
                  <SpanValue>{formatNum(symbol, shipping)}</SpanValue>
                </Text>
              </Flex>
              <Flex mt='20px' justifyContent='space-between'>
                <Text fontWeight={500} fontSize={17}>Depop Fee ({parseFloat(form.depopFee)}%):</Text>
                <Text fontWeight={500} sx={{ display: 'flex', alignItems: 'center' }}>
                  <SpanValue>{formatNum(symbol, depopFee)}</SpanValue>
                </Text>
              </Flex>

              <Flex mt='20px' justifyContent='space-between'>
                <Text fontWeight={500} fontSize={17}>Paypal Fee ({parseFloat(form.paypalFee)}%):</Text>
                <Text fontWeight={500} sx={{ display: 'flex', alignItems: 'center' }}>
                  <SpanValue>{formatNum(symbol, paypalFee)}</SpanValue>
                </Text>
              </Flex>
              <Flex mt='20px' justifyContent='space-between'>
                <Text fontWeight={500} fontSize={17}>Paypal Currency Fee:</Text>
                <Text fontWeight={500} sx={{ display: 'flex', alignItems: 'center' }}>
                  <SpanValue>{formatNum(symbol, form.paypalCurrencyFee)}</SpanValue>
                </Text>
              </Flex>

              {
                costOfItem !== '0.00' ? (
                  <Flex mt='20px' justifyContent='space-between'>
                    <Text fontWeight={500} fontSize={17}>Cost of Item:</Text>
                    <Text fontWeight={500} sx={{ display: 'flex', alignItems: 'center' }}>
                      <SpanValue>{formatNum(symbol, costOfItem)}</SpanValue>
                    </Text>
                  </Flex>) : null
              }
              <Divider />
              <Flex mt='30px' justifyContent='space-between'>
                <Text fontSize={20} fontWeight={600}>Total Profit:</Text>
                <Text sx={{ display: 'flex', alignItems: 'center' }}>
                  <SpanValue>{formatNum(symbol, profit)} </SpanValue>
                </Text>
              </Flex>

            </Breakdown>
          </Flex>
        </Flex>

      </Card>
    </Flex>
  )
}

export default FeeCalculator

const add = (str1, str2) => {
  return (parseFloat(str1) + parseFloat(str2)).toFixed(2)
}
const getPercent = (str1, percent) => {
  return (parseFloat(str1) * (parseFloat(percent) / 100)).toFixed(2)
}
const Breakdown = styled.div`
  width: 100%;
  height:100%;
  background: ${({ theme }) => theme.colors.whiteDark};
  margin-left:20px;
  border-radius: ${({ theme }) => theme.borderRadius.more};
  padding: 15px;
  overflow: auto;
  @media only screen and (max-width: 730px) {
      margin-left: 0px;
  }
`
const Span = styled.span`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 14px;
`
const SpanValue = styled.span`
  margin-left: 10px;
  font-weight: 600;
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`
const Divider = styled.div`
  width: 100%;
  height: 2px;
  margin: 30px 0px;
  background: ${({ theme }) => theme.colors.primary};
`
