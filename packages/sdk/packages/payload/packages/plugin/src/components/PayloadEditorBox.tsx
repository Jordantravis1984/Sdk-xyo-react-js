import { FlexBoxProps } from '@xylabs/react-flexbox'
import { PayloadDetails } from '@xyo-network/react-payload-details'

import { PayloadEditorRenderProps } from '../PayloadRenderPlugin'

export const PayloadEditorBox: React.FC<PayloadEditorRenderProps & FlexBoxProps> = (props) => {
  return <PayloadDetails {...props} />
}
