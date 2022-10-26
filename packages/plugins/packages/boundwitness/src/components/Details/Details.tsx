import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayload } from '@xyo-network/payload'
import { PayloadDataDetails, PayloadJsonDetails } from '@xyo-network/react-payload-details'
import { forwardRef } from 'react'

import { BoundWitnessPayloads } from './Payloads'
import { BoundWitnessSignatureDetails } from './SignatureDetails'
import { BoundWitnessValidationDetails } from './ValidationDetails'

export interface BoundWitnessDetailsProps extends FlexBoxProps {
  payload?: XyoPayload
  payloads?: XyoPayload[]
}

const BoundWitnessDetails = forwardRef<unknown, BoundWitnessDetailsProps>(({ paper, payload, payloads, children, ...props }, ref) => {
  const boundwitness = payload as XyoBoundWitness | undefined
  return (
    <FlexCol justifyContent="flex-start" alignItems="stretch" gap={1} ref={ref} {...props}>
      <PayloadDataDetails paper={paper} payload={boundwitness} size="large" badge />
      <BoundWitnessSignatureDetails paper={paper} block={boundwitness} />
      <BoundWitnessPayloads paper={paper} payloads={payloads} />
      <BoundWitnessValidationDetails paper={paper} value={boundwitness} />
      <PayloadJsonDetails paper={paper} payload={boundwitness} />
      {children}
    </FlexCol>
  )
})

BoundWitnessDetails.displayName = 'BoundWitnessDetails [XYO]'

export { BoundWitnessDetails }
