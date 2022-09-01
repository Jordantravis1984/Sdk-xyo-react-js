import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { AvatarProps, TableCell, TableCellProps, TableRow, TableRowProps, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { XyoPayload, XyoPayloadValidator, XyoPayloadWrapper } from '@xyo-network/payload'
import { useNetwork } from '@xyo-network/react-network'
import { usePayloadRenderPluginResolver, XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { HashTableCell } from '@xyo-network/react-shared'
import { ComponentType } from 'react'

import {
  PayloadDynamicTableColumnConfig,
  payloadDynamicTableColumnConfigDefaults,
  PayloadDynamicTableColumnSlug,
} from './PayloadDynamicTableColumnConfig'

export interface PayloadDynamicTableRowProps extends TableRowProps {
  payload?: XyoPayload
  archive?: string
  exploreDomain?: string
  columns?: PayloadDynamicTableColumnConfig
  network?: string
}

export const PayloadDynamicTableRow: React.FC<PayloadDynamicTableRowProps> = ({
  exploreDomain,
  network: networkProp,
  payload,
  archive,
  columns = payloadDynamicTableColumnConfigDefaults(),
  ...props
}) => {
  const breakPoint = useBreakpoint()
  const wrapper = payload ? new XyoPayloadWrapper(payload) : undefined
  const { network } = useNetwork()
  const { resolver } = usePayloadRenderPluginResolver()
  const hash: React.FC<TableCellProps> = (props) => (
    <HashTableCell
      key="hash"
      align="left"
      archive={archive}
      value={wrapper?.hash}
      dataType="payload"
      exploreDomain={exploreDomain}
      network={networkProp ?? network?.slug}
      {...props}
    />
  )

  const schema: React.FC<TableCellProps> = (props) => (
    <TableCell key="payloads" align="left" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {payload?.schema}
      </Typography>
    </TableCell>
  )

  const details: React.FC<TableCellProps> = (props) => (
    <TableCell key="payloads" align="left" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {payload?.sources}
      </Typography>
    </TableCell>
  )

  const render: React.FC<TableCellProps> = (props) => {
    const Render: ComponentType<XyoPayloadRenderProps & TableCellProps> | undefined = payload
      ? resolver?.resolve(payload)?.components.table.cell
      : undefined
    return Render ? <Render payload={payload} {...props} /> : null
  }

  const icon: React.FC<TableCellProps> = (props) => {
    const Avatar: ComponentType<XyoPayloadRenderProps & AvatarProps> | undefined = payload
      ? resolver?.resolve(payload)?.components.avatar.image
      : undefined

    return (
      <TableCell key="payloads" align="left" {...props}>
        {Avatar ? <Avatar payload={payload} /> : null}
      </TableCell>
    )
  }

  const isValid = wrapper ? new XyoPayloadValidator(wrapper.body).validate().length === 0 : undefined

  const valid: React.FC<TableCellProps> = (props) => (
    <TableCell key="valid" align="center" {...props}>
      {isValid === undefined ? (
        <WarningAmberRoundedIcon fontSize="small" color="warning" />
      ) : isValid ? (
        <CheckCircleOutlineRoundedIcon fontSize="small" color="success" />
      ) : (
        <ErrorOutlineRoundedIcon color="error" fontSize="small" />
      )}
    </TableCell>
  )

  const tableCells: Record<PayloadDynamicTableColumnSlug, React.FC<TableCellProps>> = {
    details,
    hash,
    icon,
    render,
    schema,
    valid,
  }

  return breakPoint ? (
    <TableRow style={{ maxWidth: '100vw' }} {...props}>
      {columns[breakPoint]?.map((column) => {
        return column.slug ? tableCells[column.slug]({}) : null
      })}
    </TableRow>
  ) : null
}