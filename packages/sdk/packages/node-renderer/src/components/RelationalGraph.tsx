import { Button, styled } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import cytoscape, { Core, CytoscapeOptions } from 'cytoscape'
import { forwardRef, ReactNode, useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../contexts'

export interface NodeRelationalGraph extends FlexBoxProps {
  actions?: ReactNode
  options?: CytoscapeOptions
}

export const NodeRelationalGraph = forwardRef<HTMLDivElement, NodeRelationalGraph>(({ actions, options, ...props }, ref) => {
  const [cy, setCy] = useState<Core>()
  const { setCy: setCyContext } = useCytoscapeInstance()
  const sharedRef = useShareForwardedRef(ref)

  const handleReset = () => {
    cy?.reset()
    cy?.fit(undefined, 20)
  }

  useEffect(() => {
    if (sharedRef) {
      const newCy = cytoscape({
        container: sharedRef.current,
        ...options,
      })
      setCy(newCy)
    }
  }, [options, sharedRef])

  useEffect(() => {
    setCyContext?.(cy)
  }, [cy, setCyContext])

  return (
    <FlexCol {...props}>
      <ActionsContainer>
        {actions}
        <Button size={'small'} variant={'contained'} onClick={handleReset}>
          Reset
        </Button>
      </ActionsContainer>
      <FlexCol alignItems="stretch" height="100%" position="absolute" ref={sharedRef} width="100%"></FlexCol>
    </FlexCol>
  )
})

NodeRelationalGraph.displayName = 'NodeRelationalGraph'

const ActionsContainer = styled(FlexRow, { name: 'ActionsContainer' })(() => ({
  flexWrap: 'wrap',
  position: 'absolute',
  right: '10px',
  top: '10px',
  zIndex: 2,
}))
