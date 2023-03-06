import { useAsyncEffect } from '@xylabs/react-shared'
import { Archivist } from '@xyo-network/archivist'
import { XyoPayload } from '@xyo-network/payload-model'
import { useCallback, useState } from 'react'

import { useArchivist } from './useArchivist'
import { RefreshCallback } from './useArchivistStates'

export const useArchivistGet = <T extends XyoPayload = XyoPayload>(
  hashes?: string[],
  archivist?: Archivist | string,
): [T[]?, Error?, RefreshCallback?] => {
  const requestedArchivistNameOrAddress = typeof archivist === 'string' ? archivist : undefined
  const passedArchivist = typeof archivist === 'object' ? archivist : undefined
  const [payloads, setPayloads] = useState<T[]>()
  const [foundArchivist, foundArchivistError] = useArchivist(requestedArchivistNameOrAddress)
  const [error, setError] = useState<Error>()
  const [refresh, setRefresh] = useState(0)

  const archivistToUse = passedArchivist ?? foundArchivist

  const onRefresh = useCallback(() => {
    setRefresh(refresh + 1)
  }, [])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivistToUse && hashes) {
          const result = ((await archivistToUse.get(hashes ?? [])) as T[]) ?? []
          if (mounted()) {
            setError(undefined)
            setPayloads(result as T[])
          }
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivistToUse, hashes, refresh, setError, setPayloads],
  )
  return [payloads, error ?? foundArchivistError, onRefresh]
}
