import { Card, CardProps } from '@mui/material'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { Payload } from '@xyo-network/payload-model'

import { BoundWitnessCardContent } from './CardContent'
import { BoundWitnessCardHeader } from './CardHeader'

export interface BoundWitnessCardProps extends CardProps {
  active?: boolean
  payload?: Payload
}
export const BoundWitnessRendererCard: React.FC<BoundWitnessCardProps> = ({ payload, active, ...props }) => {
  const boundwitness = payload as Payload<BoundWitness>

  return (
    <Card {...props}>
      <BoundWitnessCardHeader payload={boundwitness} active={active} hideJSONButton hidePreviousHash hideValidation hideTimestamp />
      <BoundWitnessCardContent payload={boundwitness} active={active} />
    </Card>
  )
}
