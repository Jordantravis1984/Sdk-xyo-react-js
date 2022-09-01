import { ComponentMeta, ComponentStory } from '@storybook/react'
import { sampleBlockWithPayloads } from '@xyo-network/react-storybook'

import { PropertyValue } from './Value'

const StorybookEntry = {
  argTypes: {},
  component: PropertyValue,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'property/Value',
} as ComponentMeta<typeof PropertyValue>

const Template: ComponentStory<typeof PropertyValue> = (args) => <PropertyValue {...args}></PropertyValue>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})

WithData.args = { value: sampleBlockWithPayloads._hash }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry