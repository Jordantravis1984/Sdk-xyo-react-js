import { Badge } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'
import { BsFileEarmarkCode } from 'react-icons/bs'
import { VscOrganization, VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc'

export interface ArchivistStatsProps {
  addresses?: Record<string, number>
  boundWitnesses?: Payload[] | null
  payloads?: Payload[] | null
  schemas?: Record<string, number>
}

export const ArchivistStats: React.FC<ArchivistStatsProps> = ({ addresses = {}, boundWitnesses, payloads, schemas = {} }) => {
  return (
    <FlexRow gap={2} mr={0.5}>
      {payloads ? (
        <Badge badgeContent={payloads?.length} color="primary">
          <VscSymbolNamespace size={20} />
        </Badge>
      ) : null}
      {boundWitnesses ? (
        <Badge badgeContent={boundWitnesses?.length} color="primary">
          <VscSymbolMethod size={20} />
        </Badge>
      ) : null}
      {Object.entries(schemas).length ? (
        <Badge badgeContent={Object.entries(schemas).length} color="primary">
          <BsFileEarmarkCode size={20} />
        </Badge>
      ) : null}
      {Object.entries(addresses).length ? (
        <Badge badgeContent={Object.entries(addresses).length} color="primary">
          <VscOrganization size={20} />
        </Badge>
      ) : null}
    </FlexRow>
  )
}
