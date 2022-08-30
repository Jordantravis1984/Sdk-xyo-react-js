import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CoinGeckoPricesRenderer } from './CoinGeckoPricesRenderer'
import { payloadData, payloadDataMissingAssets } from './payloadData.stories'

const StorybookEntry = {
  argTypes: {},
  component: CoinGeckoPricesRenderer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/coin-gecko-prices/CoinGeckoPricesRenderer',
} as ComponentMeta<typeof CoinGeckoPricesRenderer>

const Template: ComponentStory<typeof CoinGeckoPricesRenderer> = (args) => <CoinGeckoPricesRenderer {...args}></CoinGeckoPricesRenderer>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

const WithMissingData = Template.bind({})
WithMissingData.args = { payload: payloadDataMissingAssets }

export { Default, WithData, WithMissingData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
