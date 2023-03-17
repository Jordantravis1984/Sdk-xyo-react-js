import { XyoError } from '@xyo-network/module'
import { Payload } from '@xyo-network/payload-model'
import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface ResolvePayloadState extends ContextExState {
  huri?: string
  huriError?: XyoError
  huriPayload?: string | Payload
  notFound?: boolean
  payload?: Payload
  refreshHuri?: () => void
  setPayload?: Dispatch<SetStateAction<Payload | undefined>>
}
