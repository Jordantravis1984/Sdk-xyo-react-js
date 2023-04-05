import { Payload } from '@xyo-network/payload-model'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { BoundWitnessCardContent, BoundWitnessCardHeader, BoundWitnessDetailsBox } from './components'

export const BoundWitnessRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === 'network.xyo.boundwitness',
    components: {
      box: {
        detailsBox: BoundWitnessDetailsBox,
      },
      card: {
        content: BoundWitnessCardContent,
        header: BoundWitnessCardHeader,
      },
    },
    name: 'BoundWitness',
  }),
}
