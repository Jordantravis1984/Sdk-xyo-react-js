import { Typography } from '@mui/material'
import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-shared'
import { HDWallet } from '@xyo-network/account'
import { HttpBridge, HttpBridgeConfigSchema } from '@xyo-network/bridge'
import { MemoryNode, NodeConfigSchema } from '@xyo-network/node'
import { XyoPayload } from '@xyo-network/payload'
import { NodeProvider, useNode } from '@xyo-network/react-node'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { useAccount, WalletProvider } from '@xyo-network/react-wallet'
import { XyoSchemaCache } from '@xyo-network/utils'
import { useState } from 'react'

import { useSchemaDefinitions } from '../useSchemaDefinitions'
import { useSchemaStats } from '../useSchemaStats'

const apiConfig = { apiDomain: 'https://beta.api.archivist.xyo.network' }
const nodeUri = 'http://localhost:8080/node'
const randomWallet = HDWallet.fromMnemonic(DefaultSeedPhrase)

const MemoryNodeDecorator: DecoratorFn = (Story, args) => {
  const [node, setNode] = useState<MemoryNode>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      const node = await MemoryNode.create({ config: { schema: NodeConfigSchema } })
      const bridge = await HttpBridge.create({ config: { nodeUri, schema: HttpBridgeConfigSchema, security: { allowAnonymous: true } } })
      await node.register(bridge).attach(bridge.address, true)
      setNode(node)
    },
    [],
  )

  return (
    <WalletProvider defaultWallet={randomWallet}>
      <NodeProvider node={node}>
        <Story {...args} />
      </NodeProvider>
    </WalletProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  decorators: [MemoryNodeDecorator],
  title: 'schema/Hooks',
} as Meta

const Template: ComponentStory<React.FC> = () => {
  XyoSchemaCache.instance.proxy = `${apiConfig.apiDomain}/domain`
  const [account] = useAccount()
  const [node] = useNode(undefined, account)
  const [discovered, setDiscovered] = useState<XyoPayload[]>([])
  const [schemaStats] = useSchemaStats(undefined, undefined, account)
  const schemaList = schemaStats?.filter(({ name }) => !!name) as { name: string }[]
  const schemaDefinitions = useSchemaDefinitions(schemaList)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const discovered = await node?.discover()
      if (mounted()) {
        setDiscovered(discovered ?? [])
      }
    },
    [node],
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
      <Typography variant={'h2'}>Schema Stats</Typography>
      <code>
        {`${JSON.stringify(discovered, null, 2)}`}
        {JSON.stringify(schemaStats, null, 2)}
      </code>
      <Typography variant={'h2'}>Schema List</Typography>
      <code>{JSON.stringify(schemaList, null, 2)}</code>
      <Typography variant={'h2'}>Schema Definitions</Typography>
      <code>{JSON.stringify(schemaDefinitions, null, 2)}</code>
    </div>
  )
}

const Default = Template.bind({})

export { Default }
