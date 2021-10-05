import { Link, LinkProps } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

type Props = LinkProps<RouterLink>

const LinkToEx: React.FC<Props> = (props) => {
  const { to, ...rootProps } = props
  return <Link component={RouterLink} to={to} {...rootProps} />
}

export default LinkToEx
