import { PartialRecord } from '@xylabs/sdk-js'
import { XyoCoingeckoCryptoMarketPayload } from '@xyo-network/coingecko-crypto-market-payload-plugin'

const mapAssetsToString = (assetValues: PartialRecord<string, number> | undefined) => {
  return assetValues
    ? Object.entries(assetValues).reduce<PartialRecord<string, string>>((accumulator, [symbol, value]) => {
        accumulator[symbol] = value?.toString()
        return accumulator
      }, {})
    : undefined
}

/** InMemory Transform Diviner to get payload to shape used by AggregatePrice Plugin */
export const useCoinGeckoToAssetPriceDiviner = (payload?: XyoCoingeckoCryptoMarketPayload) => {
  if (payload) {
    const modifiedAssets = Object.entries(payload.assets).reduce((accumulator, [assetName, assetValues]) => {
      accumulator[assetName] = {
        value: {
          ...mapAssetsToString(assetValues),
        },
      }
      return accumulator
    }, {} as Record<string, { value: PartialRecord<string, string> }>)

    return {
      ...payload,
      assets: modifiedAssets,
    }
  }
}
