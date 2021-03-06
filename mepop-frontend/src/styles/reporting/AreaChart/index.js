import React from 'react'
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer
} from 'recharts'

import theme from '../../../theme'
import { ChartWrap } from '../styleUtil'
import { transparentize } from 'polished'

const Areachart = ({ areas, xdataKey, data, onHover, disableAnimation, noToolTip, ...props }) => {
  return (
    // <Card {...props} minWidth='100%'>
    <ChartWrap noPadding style={{ position: 'absolute', bottom: '0px', width: '102%' }}>

      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={data}>
          <defs>
            {
              areas.map(({ key, color }, i) => {
                return (
                  <linearGradient key={i} id={key} x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor={theme.colors[color]} stopOpacity={1} />
                    <stop offset='100%' stopColor={theme.colors[color]} stopOpacity={0} />
                  </linearGradient>

                )
              })
            }

          </defs>

          <XAxis dataKey='week' hide />
          {
            noToolTip ? null : (

              <Tooltip wrapperStyle={onHover ? { visibility: 'hidden' } : null} formatter={onHover} labelFormatter={onHover} />
            )
          }
          {areas.map(({ key, color }, i) => {
            return (
              <Area
                key={i}
                isAnimationActive={typeof disableAnimation !== 'boolean'}
                dataKey={key}
                stroke={transparentize(0.7, theme.colors[color] || theme.colors.primary)}
                fillOpacity={1}
                fill={`url(#${key})`}
              />

            )
          })}
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrap>
    // </Card>
  )
}

export default Areachart
