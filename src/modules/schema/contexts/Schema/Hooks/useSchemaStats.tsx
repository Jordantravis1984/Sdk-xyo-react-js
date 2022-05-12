import { useAsyncEffect } from '@xylabs/sdk-react'
import { XyoArchivistArchivePayloadSchemaStats } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

import { useArchive } from '../../../../archive'
import { useArchivistApi } from '../../../../archivist-api'

export const useSchemaStats = (): XyoArchivistArchivePayloadSchemaStats | undefined => {
  const { api } = useArchivistApi(false)
  const { archive = 'temp' } = useArchive(false)
  const [stats, setStats] = useState<XyoArchivistArchivePayloadSchemaStats>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (api && archive) {
        const stats = await api?.archive(archive).payload.schema.stats.get()
        if (mounted()) {
          setStats(stats)
        }
      }
    },
    [api, archive]
  )

  return stats
}