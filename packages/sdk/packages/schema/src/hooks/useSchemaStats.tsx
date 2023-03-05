import { useAsyncEffect } from '@xylabs/react-shared'
import { SchemaStatsPayload } from '@xyo-network/node-core-model'
import { TYPES } from '@xyo-network/node-core-types'
import { useDiviner } from '@xyo-network/react-diviner'
import { Dispatch, SetStateAction, useState } from 'react'

export const useSchemaStats = (
  nameOrAddress = TYPES.SchemaStatsDiviner.description,
): [SchemaStatsPayload[] | undefined, Error | undefined, Dispatch<SetStateAction<number>>] => {
  const [refresh, setRefresh] = useState(1)
  const [diviner, divinerError] = useDiviner(nameOrAddress)
  const [error, setError] = useState<Error>()
  const refreshHistory = () => setRefresh((previous) => previous + 1)

  const [schemaList, setSchemaList] = useState<SchemaStatsPayload[]>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (diviner) {
        if (divinerError) {
          if (mounted()) {
            setError(divinerError)
            setSchemaList(undefined)
          }
        } else {
          try {
            const schemas = (await diviner.divine()) as SchemaStatsPayload[]
            if (mounted()) {
              setSchemaList(schemas)
              setError(undefined)
            }
          } catch (ex) {
            setError(ex as Error)
            setSchemaList(undefined)
          }
        }
      }
    },
    [diviner, refresh, divinerError],
  )

  return [schemaList, error, refreshHistory]
}
