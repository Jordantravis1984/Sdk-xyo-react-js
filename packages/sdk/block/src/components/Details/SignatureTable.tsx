import { Table, TableBody, TableCell, TableHead, TableProps, TableRow, Typography } from '@mui/material'
import { XyoBoundWitness, XyoBoundWitnessWithPartialMeta } from '@xyo-network/boundwitness'
import { XyoHasher } from '@xyo-network/core'
import { ScrollTableOnSm } from '@xyo-network/react-shared'

import { BlockSignatureTableRow } from './SignatureTableRow'

export interface BlockSignatureTableProps extends TableProps {
  block?: XyoBoundWitness
}

interface SignatureData {
  address: string
  previous_hash: string | null
  signature?: string
}

const signatureDataFromBoundWitness = (boundWitness: XyoBoundWitnessWithPartialMeta) => {
  const result: SignatureData[] = []
  for (let i = 0; i < boundWitness.addresses.length; i++) {
    result.push({
      address: boundWitness.addresses[i],
      previous_hash: boundWitness.previous_hashes[i],
      signature: boundWitness._signatures?.[i],
    })
  }
  return result
}

export const BlockSignatureTable: React.FC<BlockSignatureTableProps> = ({ block, ...props }) => {
  const signatureData = block ? signatureDataFromBoundWitness(block) : []
  const hash = block ? new XyoHasher(block).hash : undefined

  return (
    <ScrollTableOnSm>
      <Table {...props}>
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography variant="caption">
                <strong>Address</strong>
              </Typography>
            </TableCell>
            <TableCell sx={{ display: { md: 'table-cell', xs: 'none' } }} align="center" width="10px">
              <Typography variant="caption">
                <strong>Previous</strong>
              </Typography>
            </TableCell>
            <TableCell sx={{ display: { sm: 'table-cell', xs: 'none' } }} align="center" width="10px">
              <Typography variant="caption">
                <strong>Signature</strong>
              </Typography>
            </TableCell>
            <TableCell align="center" width="10px">
              <Typography variant="caption">
                <strong>Valid</strong>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {signatureData?.map((data, index) => {
            return (
              <BlockSignatureTableRow
                key={`${data.signature}-${data.previous_hash}-${index}`}
                address={data.address}
                previousHash={data.previous_hash}
                hash={hash}
                signature={data.signature}
              />
            )
          })}
        </TableBody>
      </Table>
    </ScrollTableOnSm>
  )
}
