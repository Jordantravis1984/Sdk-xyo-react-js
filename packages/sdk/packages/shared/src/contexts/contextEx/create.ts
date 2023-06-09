import { createContext } from 'react'

import { ContextExState } from './State'

export const createContextEx = <T>() => createContext<T & ContextExState>({ provided: false } as T & ContextExState)
