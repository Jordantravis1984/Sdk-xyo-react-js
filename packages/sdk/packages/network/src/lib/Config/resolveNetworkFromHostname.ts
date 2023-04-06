import { XyoNetworkNames } from './NetworkNames'

export type SiteName = 'explore' | 'node'

export const resolveNetworkFromHostName = (fallback: XyoNetworkNames = 'Kerplunk', siteName: SiteName) => {
  switch (document.location.hostname) {
    case `${siteName}.xyo.network`:
      return 'Main'
    case `beta.${siteName}.xyo.network`:
      return 'Kerplunk'
    default:
      return fallback
  }
}
