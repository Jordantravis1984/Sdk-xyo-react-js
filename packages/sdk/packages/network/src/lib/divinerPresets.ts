import { XyoNetworkNodePayload, XyoNetworkNodeSchema } from '@xyo-network/network'

export const findDivinerPreset = (slug: string) => {
  return (
    divinerPresets.find((item) => {
      return item.slug === slug
    }) ?? divinerPresets[0]
  )
}

export const divinerPresets: XyoNetworkNodePayload[] = [
  {
    name: 'XYO Location (beta)',
    schema: XyoNetworkNodeSchema,
    slug: 'beta-location-diviner-xyo-network',
    type: 'diviner',
    uri: 'https://beta.api.location.diviner.xyo.network',
    web: 'https://beta.explore.xyo.network',
  },
  {
    name: 'XYO Location',
    schema: XyoNetworkNodeSchema,
    slug: 'location-diviner-xyo-network',
    type: 'diviner',
    uri: 'https://api.location.diviner.xyo.network',
    web: 'https://explore.xyo.network',
  },
  {
    name: 'XYO Location (local)',
    schema: XyoNetworkNodeSchema,
    slug: 'local-location-diviner-xyo-network',
    type: 'diviner',
    uri: 'http://localhost:8082',
    web: 'http://localhost:3000',
  },
]
