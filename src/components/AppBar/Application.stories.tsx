import { TextField } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { ArchiveProvider, ArchivesProvider, ArchivistApiProvider } from '../../contexts'
import { NetworkMemoryProvider } from '../../modules'
import { ApplicationAppBar } from './Application'

const StorybookEntry = {
  argTypes: {},
  component: ApplicationAppBar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'AppBar/Application',
} as ComponentMeta<typeof ApplicationAppBar>

const Template: ComponentStory<typeof ApplicationAppBar> = (args) => (
  <BrowserRouter>
    <NetworkMemoryProvider>
      <ArchiveProvider>
        <ArchivistApiProvider apiDomain="https://beta.api.archivist.xyo.network">
          <ArchivesProvider>
            <ApplicationAppBar {...args}></ApplicationAppBar>
          </ArchivesProvider>
        </ArchivistApiProvider>
      </ArchiveProvider>
    </NetworkMemoryProvider>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const WithChildren = Template.bind({})
WithChildren.args = { children: <TextField fullWidth size="small" /> }

export { Default, WithChildren }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
