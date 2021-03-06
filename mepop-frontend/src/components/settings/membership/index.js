import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import Card from '../../../styles/elements/Card'
import { withFirebase } from '../../../firebase'
import Button from '../../../styles/elements/Button'
import Text from '../../../styles/elements/Text'
import Flex from '../../../styles/layout/Flex'
import Tooltip from '../../../styles/elements/Tooltip'
import Box from '../../../styles/layout/Box'
import { UPDATE_USER } from '../../../store/generalReducer'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

import FeatureToolTip from './FeatureTooltip'
import { useState, useEffect } from 'react'
import Modal from '../../../styles/elements/Modal'
import Link from 'next/link'

const ChooseMembership = withFirebase(({ firebase }) => {
  const router = useRouter()
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.generalReducer)
  const [activeModal, setModal] = useState(null)
  const [isLoading, setLoading] = useState(null)
  const [btnsDisabled, disableBtn] = useState(false)
  const { hasSignedIn } = user.profile

  useEffect(() => {
    if (user.membership) {
      if (user.membership.type === 'premium') {
        router.push('/dashboard')
      } else { disableBtn(false) }
    } else { disableBtn(false) }
  }, [])

  const onChoose = async (type) => {
    const newProfile = { ...user.profile, hasSignedIn: true }
    const newMembership = { ...user.membership, type: type }
    if (type === 'premium') {
      setLoading('premium')
      await firebase.startSubscription(window.location.origin + '/settings')
    }
    firebase.setProfile(newProfile).then(() => {
      dispatch({
        type: UPDATE_USER,
        payload: { ...user, profile: newProfile, membership: newMembership }
      })
      if (!hasSignedIn && type === 'basic') {
        addToast(<div>Everything is good to go! Now let's upload some files.</div>, {
          appearance: 'success',
          autoDismiss: true
        })
        router.push('/files')
      } else if (type === 'basic') {
        router.push('/dashboard')
      }
    }).catch((err) => {
      addToast(<div>{err.message}. Please email support@mepopreports.com</div>, {
        appearance: 'error'
      })
    })
  }
  return (
    <Card minHeight='650px'>
      <Modal isOpen={!!activeModal} onRequestClose={() => setModal(null)}>
        {activeModal}
      </Modal>
      <Flex width='90%'>

        <Text
          as='h2'
          color='primary'
        >
          Continue with a Plan
        </Text>
      </Flex>
      <TableContainer>

        <Table flexDirection='column' alignItems='flex-end' mb='20px'>
          <Flex width={[1]}>
            <Cell bg='greyDisabled' />
            {tiers.map(({ title, icon, price }, i) => {
              return (
                <Cell
                  key={i}
                  alignItems='center'
                  flexDirection='column'
                  justifyContent='center'
                  bg='greyDisabled'
                >
                  <Flex alignItems='center' fontSize='18px' mb='15px' mt='2px'>
                    <Text mr='5px'>{title}</Text>
                    <i className={`fa fa-${icon}`} />
                  </Flex>
                  <Flex mb='2px' sx={{ whiteSpace: 'nowrap' }}>
                    <Text fontSize='15px' fontWeight={500}>{price}</Text>
                  </Flex>
                </Cell>
              )
            })}
          </Flex>

          {
            options.map(({ title, ref, tooltip, html, icon, cursor }, i) => {
              return (
                <Flex width={[1]} key={i}>
                  <Cell
                    px='10px'
                    cursor={cursor}
                    onClick={() => html ? setModal(html) : null}
                    bg={i % 2 ? 'whiteDark' : 'greyLightest'}
                  >
                    <Tooltip
                      title={tooltip}
                      position='left'
                      height='100%'
                      arrow={false}
                      style={{ width: '100%' }}
                    >
                      <Flex justifyContent='space-between' width={[1]} alignItems='center'>
                        {title}
                        <Box ml='5px' fontSize={icon ? '16px' : '20px'} alignItems='center'>
                          <i className={`fa ${icon || 'fa-question-circle'}`} />
                        </Box>
                      </Flex>
                    </Tooltip>
                  </Cell>
                  {
                    tiers.map((tier, j) => {
                      return (

                        <Cell key={j} justifyContent='center' bg={i % 2 ? 'whiteDark' : 'greyLightest'}>
                          <I
                            good={tier[ref]}
                            className={`fa fa-${!tier[ref] ? 'times-circle' : 'check-circle'}`}
                          />

                        </Cell>
                      )
                    })
                  }
                </Flex>
              )
            })
          }

          <Flex width={[1]}>
            <Cell bg='greyDisabled' />
            {tiers.map(({ title, type }) => {
              return (
                <Cell key={title} justifyContent='center' bg='greyDisabled'>
                  <Button
                    disabled={btnsDisabled}
                    bg='success'
                    minWidth='150px'
                    onClick={() => onChoose(type)}
                    isLoading={isLoading === type}
                  >
                    Go {title}!
                  </Button>
                </Cell>
              )
            })}
          </Flex>

        </Table>

        <Text mb='10px' width={[1]} justifyContent='flex-start'>
          * By choosing a plan, you automatically agree to our <Link href='/terms-of-service'><A>terms of service</A></Link>.
        </Text>

      </TableContainer>
    </Card>
  )
})

export default ChooseMembership

const TableContainer = styled.div`
  width: 90%;
`
const I = styled.i`
    color: ${({ good, theme }) => good ? theme.colors.good : theme.colors.bad};
    font-size: 25px;
`
const A = styled.a`
  text-decoration: underline;
  cursor: pointer;
  /* color: ${({ theme })} */
`
const Cell = styled(Flex)`
    min-height: 50px;
    min-width: 200px;
    padding: 0px 10px;
    flex: 1;
    overflow: auto;
    border-right: 1px solid ${({ theme }) => theme.colors.whiteDark};
    border-bottom: 1px solid ${({ theme }) => theme.colors.whiteDark};
    align-items: center;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    cursor: ${({ cursor }) => cursor};
    transition: .2s;
    &:hover {
      background: ${({ theme, cursor }) => cursor === 'pointer' ? theme.colors.greyLighter : null};
    }
`
const Table = styled(Flex)`
    /* border: 1px solid ${({ theme }) => theme.colors.greyLightest}; */
    border-radius: ${({ theme }) => theme.borderRadius.normal};
    width:100%;
    overflow: auto;
`

const options = [
  { ref: 'salesDashboard', title: 'Sales Dashboard', tooltip: 'An in-depth overview of all sales and profits.' },
  { ref: 'saveCSV', title: "Saving of CSV Files's", tooltip: 'The ability to upload, save, and come back to your sales.' },
  { ref: 'feeCalculator', title: 'Depop Fee Calculator', tooltip: 'Easily calculate how to price your items.' },
  { ref: 'reports', title: 'In Depth Reports', html: <FeatureToolTip />, icon: 'fa-hand-pointer-o', cursor: 'pointer', tooltip: 'The best reporting available for Depop sellers!' },
  { ref: 'dateComparison', title: 'Date Comparison', tooltip: 'Compare custom date ranges using our robust reporting features.' },
  { ref: 'exclusiveAccess', title: 'Exclusive Access', tooltip: 'Lots of features are in the works and will be released sporadically.' }
]
const tiers = [
  {
    title: 'Basic',
    type: 'basic',
    icon: 'home',
    price: 'Free',
    saveCSV: true,
    feeCalculator: true,
    salesDashboard: true,
    reports: false,
    dateComparison: false,
    exclusiveAccess: false
  },
  {
    title: 'Premium',
    type: 'premium',
    icon: 'diamond',
    price: '$4.99/month - (7 Day Trial)',
    saveCSV: true,
    feeCalculator: true,
    salesDashboard: true,
    reports: true,
    dateComparison: true,
    exclusiveAccess: true
  }
]
