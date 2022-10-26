import { useEffect } from '@storybook/addons'
import { WithChildren } from '@xylabs/react-shared'
import { useState } from 'react'

import { useDivineSchemaList } from '../../Diviners'
import { SchemaContext } from '../Context'
import { SchemaProviderProps } from './Props'

export const SchemaMemoryProvider: React.FC<WithChildren<SchemaProviderProps>> = ({ defaultSchema, knownSchemaList = [], ...props }) => {
  const [schema, setSchema] = useState(defaultSchema)
  const [schemaList, setSchemaList] = useState<string[] | undefined>(knownSchemaList)
  const [fetchedSchemaList] = useDivineSchemaList()

  useEffect(() => {
    if (fetchedSchemaList) {
      setSchemaList(fetchedSchemaList.map(({ name }) => name))
    }
  }, [fetchedSchemaList])

  return <SchemaContext.Provider value={{ provided: true, schema, schemaList: knownSchemaList ?? schemaList, setSchema, setSchemaList }} {...props} />
}
