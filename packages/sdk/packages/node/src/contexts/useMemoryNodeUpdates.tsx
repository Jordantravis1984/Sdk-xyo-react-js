import { ModuleResolver } from '@xyo-network/module-model'
import { MemoryNode, ModuleAttachedEventArgs } from '@xyo-network/node'
import { useEffect, useState } from 'react'

import { useNode } from './useNode'

interface UseMemoryNodeUpdates {
  module?: ModuleAttachedEventArgs
  /** @deprecated - use module events instead */
  resolver?: ModuleResolver
}

export const useMemoryNodeUpdates = (refreshAddresses?: string[]): UseMemoryNodeUpdates => {
  const node = useNode<MemoryNode>()
  const [module, setModule] = useState<ModuleAttachedEventArgs>()

  useEffect(() => {
    if (node) {
      node.on('moduleAttached', (args) => {
        if (refreshAddresses) {
          if (refreshAddresses.some((address) => address === args?.module.address)) setModule(args)
        } else {
          setModule(args)
        }
      })
    }
  }, [refreshAddresses, node])

  return {
    module,
  }
}
