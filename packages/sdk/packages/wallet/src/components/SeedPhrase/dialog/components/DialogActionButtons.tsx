import { Button, DialogActions, DialogActionsProps, DialogProps } from '@mui/material'
import { MouseEvent } from 'react'

import { useSeedPhrase } from '../../../../contexts'

interface DialogActionButtonsProps extends DialogActionsProps {
  onClose?: DialogProps['onClose']
}

export const DialogActionButtons: React.FC<DialogActionButtonsProps> = ({ onClose, ...props }) => {
  const { handleSave, setPhrase } = useSeedPhrase()

  const wrappedOnClose = (e: MouseEvent<HTMLElement>) => {
    // clear local copy of phrase when modal closes
    setPhrase?.('')
    onClose?.(e, 'escapeKeyDown')
  }

  return (
    <DialogActions {...props}>
      <Button variant="outlined" onClick={wrappedOnClose}>
        Cancel
      </Button>
      <Button variant="outlined" onClick={handleSave}>
        Save
      </Button>
    </DialogActions>
  )
}
