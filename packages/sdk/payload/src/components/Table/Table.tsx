import { Alert, Table, TableBody, TableCell, TableHead, TableProps, TableRow, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { XyoPayload, XyoPayloadWithPartialMeta } from '@xyo-network/payload'
import { XyoApiThrownErrorBoundary } from '@xyo-network/react-auth-service'

import { payloadColumnNames, PayloadTableColumnConfig, payloadTableColumnConfigDefaults } from './PayloadTableColumnConfig'
import { PayloadTableRow } from './TableRow'

export interface PayloadTableProps extends TableProps {
  exploreDomain?: string
  onRowClick?: (value: XyoPayload) => void
  payloads?: XyoPayloadWithPartialMeta[] | null
  columns?: PayloadTableColumnConfig
}

export const PayloadTable: React.FC<PayloadTableProps> = ({
  exploreDomain,
  onRowClick,
  payloads,
  children,
  columns = payloadTableColumnConfigDefaults(),
  ...props
}) => {
  const breakPoint = useBreakpoint()
  return breakPoint ? (
    <Table {...props}>
      <TableHead>
        <TableRow>
          {columns[breakPoint]?.map((column, index) => {
            return (
              <TableCell key={index} width={index === 0 ? '100%' : undefined} align={index === 0 ? 'left' : 'center'}>
                <Typography variant="caption" noWrap>
                  <strong>{payloadColumnNames[column]}</strong>
                </Typography>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {payloads?.map((payload, index) => (
          <XyoApiThrownErrorBoundary
            key={`${payload._hash}-${payload._timestamp}-${index}`}
            errorComponent={(e) => (
              <Alert severity="error">
                Error Loading Payload: <Typography fontWeight="bold">{e.message}</Typography>
              </Alert>
            )}
          >
            <PayloadTableRow
              onClick={
                onRowClick
                  ? () => {
                      onRowClick(payload)
                    }
                  : undefined
              }
              exploreDomain={exploreDomain}
              payload={payload}
            />
          </XyoApiThrownErrorBoundary>
        ))}
        {children}
      </TableBody>
    </Table>
  ) : null
}
