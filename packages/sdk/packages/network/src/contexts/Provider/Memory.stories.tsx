import { Card, CardContent, Typography } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'

import { defaultNetworkConfigs } from '../../lib'
import { useNetwork } from '../use'
import { NetworkMemoryProvider } from './Memory'

const StorybookEntry: Meta = {
  component: NetworkMemoryProvider,
  title: 'network/NetworkMemoryProvider',
}

const NetworkConfigOutput = () => {
  const { network } = useNetwork()
  return (
    <FlexCol my={2}>
      <Card>
        <CardContent>
          <pre>{JSON.stringify(network, null, 2)}</pre>
        </CardContent>
      </Card>
    </FlexCol>
  )
}

const Template: ComponentStory<typeof NetworkMemoryProvider> = (props) => {
  return (
    <NetworkMemoryProvider {...props}>
      <Typography>
        Props: <pre>{JSON.stringify(props, null, 2)}</pre>
      </Typography>
      <NetworkConfigOutput />
    </NetworkMemoryProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

const DefaultNetworkName = Template.bind({})
DefaultNetworkName.args = {
  defaultNetworkName: 'Main',
}

const DefaultNetworkConfig = Template.bind({})
DefaultNetworkConfig.args = {
  defaultNetworkConfig: defaultNetworkConfigs[2],
}

// eslint-disable-next-line import/no-default-export
export default StorybookEntry

export { Default, DefaultNetworkConfig, DefaultNetworkName }
