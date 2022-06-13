import { TableCell, TableCellProps, Typography, TypographyProps, useTheme } from '@mui/material'
import { LinkEx } from '@xylabs/react-common'
import { useEffect, useRef, useState } from 'react'
import { To } from 'react-router-dom'

import { findParent } from './findParent'
import { getRemainingRowWidth } from './getRemainingRowWidth'
import { getSmallestParentWidth } from './getSmallestParentWidth'

interface TableCellValueProps extends TypographyProps {
  value: string | undefined
  hashCellWidth: number | undefined
}

const TableCellValue: React.FC<TableCellValueProps> = ({ style, hashCellWidth, value, ...props }) => {
  return (
    <Typography
      variant="body2"
      fontFamily="monospace"
      style={{
        display: 'block',
        maxWidth: hashCellWidth,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...props}
    >
      {value}
    </Typography>
  )
}

export interface EllipsisTableCellProps extends TableCellProps {
  value?: string
  to?: To | undefined
  href?: string | undefined
}

export const EllipsisTableCell: React.FC<EllipsisTableCellProps> = ({ value, to, href, ...props }) => {
  const [calcCellWidth, setCalcCellWidth] = useState<number>(0)
  const hashDivRef = useRef<HTMLDivElement>(null)

  const theme = useTheme()

  // We calulate the spacing since we know that table rows use padding.
  const spacing = parseInt(theme.spacing(4).substring(-2))

  useEffect(() => {
    const currentElement = hashDivRef.current?.parentElement
    const cell = findParent('td', currentElement)
    const row = findParent('tr', currentElement)

    const checkWidth = (cell: HTMLElement) => {
      const smallestParentWidth = getSmallestParentWidth(cell)
      if (smallestParentWidth && row) {
        const remainderWidth = smallestParentWidth - getRemainingRowWidth(row) - spacing
        setCalcCellWidth(remainderWidth)
      }
    }

    const onResize = () => {
      if (cell) {
        checkWidth(cell)
      }
    }

    if (cell) {
      checkWidth(cell)
      window.addEventListener('resize', onResize)
    }
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [hashDivRef, spacing])

  return (
    <TableCell {...props}>
      <div
        ref={hashDivRef}
        style={{
          display: 'block',
          maxWidth: calcCellWidth,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {href || to ? (
          <LinkEx to={to} href={href} target={href ? '_blank' : undefined}>
            <TableCellValue value={value} hashCellWidth={calcCellWidth} />
          </LinkEx>
        ) : (
          <TableCellValue value={value} hashCellWidth={calcCellWidth} />
        )}
      </div>
    </TableCell>
  )
}
