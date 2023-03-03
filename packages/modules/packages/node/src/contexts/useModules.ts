import { useAsyncEffect } from '@xylabs/react-shared'
import { Module, ModuleFilter } from '@xyo-network/module'
import { useState } from 'react'

import { useProvidedNode } from '../hooks'

export const useModules = <T extends Module = Module>(filter?: ModuleFilter) => {
  const node = useProvidedNode(true)
  const [modules, setModules] = useState<T[]>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const modules = await node?.resolve<T>(filter)
      if (mounted()) {
        setModules(modules)
      }
    },
    [filter, node],
  )

  return modules
}