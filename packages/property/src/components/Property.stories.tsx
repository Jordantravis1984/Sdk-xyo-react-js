import { TextField } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexCol, FlexRow } from '@xylabs/sdk-react'

import { appThemeDecorator, sampleBlockWithPayloads } from '../.storybook'
import { Property } from './Property'

const StorybookEntry = {
  argTypes: {},
  component: Property,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Properties/Property',
} as ComponentMeta<typeof Property>

const Template: ComponentStory<typeof Property> = (args) => <Property {...args}></Property>

const TemplateWithCompare: ComponentStory<typeof Property> = (args) => (
  <FlexCol alignItems="stretch">
    <FlexRow>
      <TextField size="small" value="Sample text Field" />
      <Property size="small" {...args}></Property>
    </FlexRow>
    <FlexRow>
      <Property size="small" {...args}></Property>
      <Property size="small" {...args}></Property>
    </FlexRow>
    <FlexRow>
      <TextField size="medium" value="Sample text Field" />
      <Property size="medium" {...args}></Property>
    </FlexRow>
    <FlexRow>
      <Property size="medium" {...args}></Property>
      <Property size="medium" {...args}></Property>
    </FlexRow>
    <FlexRow>
      <TextField value="Sample text Field" />
      <Property size="large" {...args}></Property>
    </FlexRow>
    <FlexRow>
      <Property size="large" {...args}></Property>
      <Property size="large" {...args}></Property>
    </FlexRow>
  </FlexCol>
)

const Default = Template.bind({})
Default.args = {}
Default.decorators = [appThemeDecorator]

const WithTitle = Template.bind({})
WithTitle.args = { title: 'No Data' }
WithTitle.decorators = [appThemeDecorator]

const WithUndefinedData = Template.bind({})
WithUndefinedData.args = { title: 'Block Hash' }
WithUndefinedData.decorators = [appThemeDecorator]

const WithData = Template.bind({})
WithData.args = { title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithData.decorators = [appThemeDecorator]

const WithDataSmall = Template.bind({})
WithDataSmall.args = { size: 'small', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataSmall.decorators = [appThemeDecorator]

const WithDataSmallCompare = TemplateWithCompare.bind({})
WithDataSmallCompare.args = { size: 'small', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataSmallCompare.decorators = [appThemeDecorator]

const WithDataAndBadgeSmall = Template.bind({})
WithDataAndBadgeSmall.args = { badge: true, size: 'small', tip: 'This is the block hash', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataAndBadgeSmall.decorators = [appThemeDecorator]

const WithDataAndBadgeMedium = Template.bind({})
WithDataAndBadgeMedium.args = { badge: true, size: 'medium', tip: 'This is the block hash', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataAndBadgeMedium.decorators = [appThemeDecorator]

const WithDataAndBadgeLarge = Template.bind({})
WithDataAndBadgeLarge.args = { badge: true, size: 'large', tip: 'This is the block hash', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataAndBadgeLarge.decorators = [appThemeDecorator]

const WithTip = Template.bind({})
WithTip.args = {
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
WithTip.decorators = [appThemeDecorator]

const WithTipAndBadge = Template.bind({})
WithTipAndBadge.args = {
  badge: true,
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
WithTipAndBadge.decorators = [appThemeDecorator]

const WithActions = Template.bind({})
WithActions.args = {
  actions: [{ name: 'ActionOne' }, { name: 'ActionTwo' }],
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
WithActions.decorators = [appThemeDecorator]

const LargeWithValue = Template.bind({})
LargeWithValue.args = {
  badge: true,
  size: 'large',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
LargeWithValue.decorators = [appThemeDecorator]

const LargeWithValueAndActions = Template.bind({})
LargeWithValueAndActions.args = {
  actions: [{ name: 'ActionOne' }, { name: 'ActionTwo' }],
  badge: true,
  size: 'large',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
LargeWithValueAndActions.decorators = [appThemeDecorator]

export {
  Default,
  LargeWithValue,
  LargeWithValueAndActions,
  WithActions,
  WithData,
  WithDataAndBadgeLarge,
  WithDataAndBadgeMedium,
  WithDataAndBadgeSmall,
  WithDataSmall,
  WithDataSmallCompare,
  WithTip,
  WithTipAndBadge,
  WithUndefinedData,
}

// eslint-disable-next-line import/no-default-export
export default StorybookEntry