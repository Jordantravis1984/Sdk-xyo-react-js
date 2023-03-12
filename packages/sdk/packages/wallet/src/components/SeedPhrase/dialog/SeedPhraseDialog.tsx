import { Dialog, DialogContent, DialogProps, DialogTitle } from '@mui/material'

import { SeedPhraseProvider, useSeedPhrase } from '../../../contexts'
import { SeedPhraseIconButton } from '../_shared'
import { DialogActionButtons, NewPhraseTextField, OverwriteWarning, SavedPhraseTextField } from './components'

export interface SeedPhraseDialogProps extends DialogProps {
  changeSeedPhrase?: (value: string) => void
  seedPhrase?: string
}

export const SeedPhraseDialog: React.FC<SeedPhraseDialogProps> = ({ changeSeedPhrase, seedPhrase, ...props }) => {
  return (
    <SeedPhraseProvider
      seedPhrase={seedPhrase}
      handleChangeSeedPhrase={changeSeedPhrase}
      open={props.open}
      saveCallback={() => props.onClose?.({}, 'escapeKeyDown')}
    >
      <SeedPhraseDialogInner {...props} />
    </SeedPhraseProvider>
  )
}

export const SeedPhraseDialogInner: React.FC<SeedPhraseDialogProps> = (props) => {
  const { overwriteWarning, seedPhrase } = useSeedPhrase()

  return (
    <Dialog aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth maxWidth={'sm'} {...props}>
      <DialogTitle id="alert-dialog-title">
        Update Your Seed Phrase <SeedPhraseIconButton />
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
        <NewPhraseTextField />
        {seedPhrase ? <SavedPhraseTextField /> : null}
        {overwriteWarning ? <OverwriteWarning /> : null}
      </DialogContent>
      <DialogActionButtons onClose={props.onClose} />
    </Dialog>
  )
}
