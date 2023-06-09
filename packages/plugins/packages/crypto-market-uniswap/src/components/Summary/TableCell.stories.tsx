import { Meta, StoryFn } from '@storybook/react'

import { payloadData } from '../storyPayloadData'
import { TableCellSummary } from './TableCellSummary'

const StorybookEntry = {
  argTypes: {},
  component: TableCellSummary,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/uniswap/TableCellSummary',
} as Meta<typeof TableCellSummary>

const Template: StoryFn<typeof TableCellSummary> = (args) => <TableCellSummary {...args}></TableCellSummary>

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

export { WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
