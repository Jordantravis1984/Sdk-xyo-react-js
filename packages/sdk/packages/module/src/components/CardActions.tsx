import { CardActions, CardActionsProps } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { XyoModuleWrapper } from '@xyo-network/module'

import { ModuleRenderProps } from '../ModuleRenderProps'

export const ModuleCardActions: React.FC<CardActionsProps & ModuleRenderProps> = ({ children, module, ...props }) => {
  const wrapper = module ? new XyoModuleWrapper(module) : undefined
  return (
    <CardActions {...props}>
      <ButtonEx onClick={() => wrapper?.discover()}>Discover</ButtonEx>
      {children}
    </CardActions>
  )
}