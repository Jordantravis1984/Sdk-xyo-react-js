import { TableCell, TableCellProps } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { XyoPayload, XyoPayloadWrapper } from '@xyo-network/payload'

import { XyoPayloadRenderProps } from '../XyoPayloadRenderPlugin'

export const XyoPayloadTableCell: React.FC<XyoPayloadRenderProps<XyoPayload> & TableCellProps> = ({ payload, ...props }) => {
  const wrapper = payload ? new XyoPayloadWrapper(payload) : undefined
  return (
    <TableCell {...props}>
      <Identicon size={24} value={wrapper?.hash} />
    </TableCell>
  )
}