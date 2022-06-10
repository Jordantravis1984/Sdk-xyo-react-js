import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { XyoPayloadValidator } from '@xyo-network/core'
import { Property, PropertyGroup } from '@xyo-network/react-property'
import { SchemaProperty } from '@xyo-network/react-schema'

import { PayloadValidationDetailsProps } from './ValidationDetailsProps'

export const PayloadValidationDetails: React.FC<PayloadValidationDetailsProps> = ({ viewSchemaUrl, skipMeta = false, skipBody = false, value, ...props }) => {
  const validator = value ? new XyoPayloadValidator(value) : undefined

  const bodyErrors = skipBody ? [] : validator?.body.all() ?? []
  const metaErrors = skipMeta ? [] : validator?.meta.all() ?? []
  const errors: Error[] = [...bodyErrors, ...metaErrors]

  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }

  return (
    <PropertyGroup titleProps={{ elevation }} title="Validation" tip="The results from validating the payload" {...props}>
      <Property
        titleProps={{ elevation }}
        flexGrow={1}
        title="Valid"
        value={errors.length === 0 ? 'True' : 'False'}
        tip={
          errors.length > 0 ? (
            <FlexCol>
              {errors.map((error, index) => {
                return <Typography key={index}>{error.toString()}</Typography>
              })}
            </FlexCol>
          ) : (
            <Typography>No Errors</Typography>
          )
        }
      />
      {value?.schema && <SchemaProperty flexGrow={1} titleProps={{ elevation }} value={value.schema} viewSchemaUrl={viewSchemaUrl} />}
    </PropertyGroup>
  )
}
