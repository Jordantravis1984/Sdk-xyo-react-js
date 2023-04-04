import { ModuleResolver } from '@xyo-network/module-model'
import { ContextExState } from '@xyo-network/react-shared'

export interface ResolverEntries {
  [name: string]: ModuleResolver
}

export interface ModuleRepositoryContextState extends ContextExState {
  removeResolvers?: (names?: string[]) => boolean
  resolvers?: ResolverEntries
  updateResolvers?: (resolvers: ResolverEntries) => boolean
}
