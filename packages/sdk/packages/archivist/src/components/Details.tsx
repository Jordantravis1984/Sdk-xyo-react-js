import { ButtonGroup, Typography } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivist, XyoArchivistClearQuerySchema, XyoArchivistCommitQuerySchema } from '@xyo-network/archivist'
import { XyoPayload } from '@xyo-network/payload'
import { useState } from 'react'

import { useArchivist } from '../contexts'

export interface ArchivistDetails extends FlexBoxProps {
  archivist?: XyoArchivist
}

export const ArchivistDetails: React.FC<ArchivistDetails> = ({ archivist: archivistProp, ...props }) => {
  const { archivist = archivistProp } = useArchivist()
  const [payloads, setPayloads] = useState<(XyoPayload | null)[]>()
  const [refresh, setRefresh] = useState(0)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const [, payloads] = (await archivist?.query({ schema: 'network.xyo.query.archivist.all' })) ?? []
      if (mounted()) {
        setPayloads(payloads)
      }
    },
    [archivist, refresh],
  )

  return (
    <FlexCol {...props}>
      <Typography>{`Payloads: ${payloads ? payloads.length : '-'}`}</Typography>
      <ButtonGroup>
        <ButtonEx
          disabled={!archivist?.queryable(XyoArchivistCommitQuerySchema)}
          onClick={() => archivist?.query?.({ schema: XyoArchivistCommitQuerySchema })}
        >
          Commit
        </ButtonEx>
        <ButtonEx
          disabled={archivist?.queryable(XyoArchivistClearQuerySchema)}
          onClick={() => archivist?.query({ schema: XyoArchivistClearQuerySchema })}
        >
          Clear
        </ButtonEx>
        <ButtonEx
          onClick={() => {
            setRefresh(refresh + 1)
          }}
        >
          Refresh
        </ButtonEx>
      </ButtonGroup>
    </FlexCol>
  )
}
