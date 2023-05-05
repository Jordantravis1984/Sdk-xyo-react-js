import { Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ArchivistModule, MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist'
import { useState } from 'react'

import { ArchivistCard } from './Card'

const StorybookEntry = {
  component: ArchivistCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'modules/archivist/ArchivistCard',
} as Meta<typeof ArchivistCard>

const Template: StoryFn<typeof ArchivistCard> = () => {
  const [module, setModule] = useState<ArchivistModule>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (!module) {
        const newParentModule = await MemoryArchivist.create()
        const newModule = await MemoryArchivist.create({
          config: {
            name: 'MemoryArchivist',
            parents: { commit: [newParentModule.address], read: [newParentModule.address], write: [newParentModule.address] },
            schema: MemoryArchivistConfigSchema,
          },
        })
        if (mounted()) {
          setModule(newModule)
        }
      }
    },
    [module],
  )

  return <ArchivistCard module={module} />
}

const SingleModule = Template.bind({})

export { SingleModule }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
