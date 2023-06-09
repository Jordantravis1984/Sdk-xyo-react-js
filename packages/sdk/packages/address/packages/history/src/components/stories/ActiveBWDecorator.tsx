import { Decorator } from '@storybook/react'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { Hasher } from '@xyo-network/protocol'
import { sampleAddressHistory } from '@xyo-network/react-storybook'
import { useState } from 'react'

import { ActiveBoundWitnessContext } from '../../contexts'

export const ActiveBWDecorator: Decorator = (Story, args) => {
  const [activeBoundWitness, setActiveBoundWitness] = useState<BoundWitness | undefined>()
  const [activeBoundWitnessHash, setActiveBoundWitnessHash] = useState<string | undefined>()
  return (
    <ActiveBoundWitnessContext.Provider
      value={{ activeBoundWitness, activeBoundWitnessHash, provided: true, setActiveBoundWitness, setActiveBoundWitnessHash }}
    >
      <Story {...args} />
    </ActiveBoundWitnessContext.Provider>
  )
}

export const ActiveBWDecoratorWithDefaultValues: Decorator = (Story, args) => {
  const [activeBoundWitness, setActiveBoundWitness] = useState<BoundWitness | undefined>(sampleAddressHistory[0])
  const [activeBoundWitnessHash, setActiveBoundWitnessHash] = useState<string | undefined>(Hasher.hash(sampleAddressHistory[0]))
  return (
    <ActiveBoundWitnessContext.Provider
      value={{ activeBoundWitness, activeBoundWitnessHash, provided: true, setActiveBoundWitness, setActiveBoundWitnessHash }}
    >
      <Story {...args} />
    </ActiveBoundWitnessContext.Provider>
  )
}
