import { XyoPayload } from '@xyo-network/payload'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { CryptoPricesRenderer } from './components'

export const CryptoPricesRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: XyoPayload) => payload?.schema === 'network.xyo.crypto.market',
    components: {
      box: {
        details: CryptoPricesRenderer,
      },
    },
    name: 'Crypto Prices',
  }),
}
