import { Search } from '@mui/icons-material'
import { TextField, useTheme } from '@mui/material'
import { FlexCol, FlexGrowCol, FlexRow } from '@xylabs/sdk-react'
import { useMemo, useState } from 'react'

import { createLookup } from './createLookup'
import { ContainerReflectionViewerProps, ReflectionGroupViewer, ReflectionViewer } from './ReflectionViewer'
import { ReflectionTreeViewer } from './TreeViewer'

export const TwoPanelReflectionViewer: React.FC<ContainerReflectionViewerProps> = ({
  reflection,
  itemRenderer = ReflectionViewer,
  hiddenFlags,
  ...props
}) => {
  const lookup = useMemo(() => createLookup(reflection), [reflection])
  const theme = useTheme()
  const [searchTerm, setSearchTerm] = useState<string>()
  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <FlexRow alignItems="stretch" justifyContent="start" sx={{ overflowY: 'scroll' }} {...props}>
      <FlexCol minWidth={320} alignItems="stretch" justifyContent="flex-start" overflow="hidden">
        <TextField
          fullWidth
          InputProps={{
            startAdornment: <Search />,
          }}
          onChange={onSearchTermChange}
        />
        <FlexGrowCol marginTop={1} alignItems="stretch">
          <ReflectionTreeViewer
            justifyContent="flex-start"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            overflow="scroll"
            searchTerm={searchTerm}
            hiddenFlags={hiddenFlags}
            reflection={reflection}
            lookup={lookup}
            border={`1px solid ${theme.palette.grey['300']}`}
            borderRadius={1}
            paddingY={1}
          />
        </FlexGrowCol>
      </FlexCol>
      <FlexGrowCol marginLeft={1} alignItems="stretch" justifyContent="flex-start" overflow="hidden">
        <FlexGrowCol alignItems="stretch">
          <FlexCol
            alignItems="stretch"
            justifyContent="flex-start"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            overflow="scroll"
            borderRadius={1}
            padding={1}
            border={`1px solid ${theme.palette.grey['300']}`}
          >
            {useMemo(() => {
              return reflection.groups?.map((group) => {
                return (
                  <ReflectionGroupViewer
                    autoscroll
                    variant="h6"
                    lookup={lookup}
                    renderer={itemRenderer}
                    key={group.kind}
                    group={group}
                    reflection={reflection}
                    alignItems="stretch"
                    hiddenFlags={hiddenFlags}
                  />
                )
              })
            }, [itemRenderer, lookup, reflection, hiddenFlags])}
          </FlexCol>
        </FlexGrowCol>
      </FlexGrowCol>
    </FlexRow>
  )
}
