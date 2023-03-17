import { XyoEthereumGasEthgasstationSchema } from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
import { Payload } from '@xyo-network/payload-model'
import { EthereumGasPriceAvatar } from '@xyo-network/react-gas-price'
import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { EthgasstationGasPriceCardContent, EthgasstationGasPriceCardHeader, EthgasstationGasPriceDetailsBox } from './components'

export const EthereumGasPriceEthgasstationPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: (payload?: Payload) => payload?.schema === XyoEthereumGasEthgasstationSchema,
    components: {
      avatar: {
        image: EthereumGasPriceAvatar,
      },
      box: {
        detailsBox: EthgasstationGasPriceDetailsBox,
      },
      card: {
        content: EthgasstationGasPriceCardContent,
        header: EthgasstationGasPriceCardHeader,
      },
    },
    name: 'Ethereum Gas Price Ethgasstation',
  }),
}
