import { XyoApiConfig, XyoArchivistApi } from '@xyo-network/api'

import { SchemaListApiDiviner } from './SchemaListApiDiviner'
import { XyoSchemaListApiDivinerConfigSchema } from './SchemaListApiDivinerConfig'

const configData: XyoApiConfig = {
  apiDomain: process.env.API_DOMAIN || 'https://beta.api.archivist.xyo.network',
}

test('SchemaListApiDiviner', async () => {
  const api = new XyoArchivistApi(configData)
  const diviner = await SchemaListApiDiviner.create({
    api,
    config: { archive: 'temp', schema: XyoSchemaListApiDivinerConfigSchema },
    logger: console,
  })

  expect(diviner).toBeDefined()

  const result = await diviner.divine()

  expect(result.length).toBeGreaterThan(0)
})
