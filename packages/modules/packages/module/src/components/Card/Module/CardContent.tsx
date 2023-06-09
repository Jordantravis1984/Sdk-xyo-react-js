import { CardContent, CardContentProps } from '@mui/material'

import { ModuleRenderProps } from '../../../ModuleRenderProps'

export const ModuleCardContent: React.FC<ModuleRenderProps & CardContentProps> = ({ children, ...props }) => {
  return <CardContent {...props}>{children}</CardContent>
}
