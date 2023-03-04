/* eslint-disable react-hooks/rules-of-hooks */
import { AccountInstance } from '@xyo-network/account-model'
import { ModuleWrapper } from '@xyo-network/module'
import { useEffect, useState } from 'react'

import { useModule } from './useModule'

export interface WrapperStatic<TModuleWrapper extends ModuleWrapper = ModuleWrapper> {
  wrap: (module?: TModuleWrapper['module'], account?: AccountInstance) => TModuleWrapper
}

export const WrappedModuleHookFactory = <TModuleWrapper extends ModuleWrapper = ModuleWrapper>(wrapperObject: WrapperStatic<TModuleWrapper>) => {
  return (nameOrAddress?: string, account?: AccountInstance): [TModuleWrapper | undefined, Error | undefined] => {
    const [module, moduleError] = useModule<TModuleWrapper['module']>(nameOrAddress)

    const [wrapper, setWrapper] = useState<TModuleWrapper>()
    const [error, setError] = useState<Error>()
    useEffect(() => {
      if (module) {
        try {
          const wrapper = wrapperObject.wrap(module, account) as TModuleWrapper
          setWrapper(wrapper)
        } catch (ex) {
          setWrapper(undefined)
          setError(ex as Error)
        }
      } else {
        setWrapper(undefined)
        setError(moduleError)
      }
    }, [module, account, moduleError])

    return [wrapper, error]
  }
}

export const useWrappedModule = WrappedModuleHookFactory(ModuleWrapper)
