import { Grid } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import CoinbaseWalletIcon from './coinbase-wallet.svg'
import MoneyMedia from './money.jpg'
import { SimpleCard } from './SimpleCard'
const StorybookEntry = {
  argTypes: {},
  component: SimpleCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Common/SimpleCard',
} as ComponentMeta<typeof SimpleCard>

const Template: ComponentStory<typeof SimpleCard> = (args) => (
  <BrowserRouter>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <SimpleCard {...args}></SimpleCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SimpleCard {...args}></SimpleCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SimpleCard {...args}></SimpleCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SimpleCard {...args}></SimpleCard>
      </Grid>
    </Grid>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {
  desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat delectus nemo optio quis! Totam magni laboriosam repudiandae nam nobis at quisquam aut omnis, quis officiis similique enim id dolorem unde!',
  headline: 'Headline Lorem Ipsum',
}
const DefaultWithImage = Template.bind({})
DefaultWithImage.args = {
  desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat delectus nemo optio quis! Totam magni laboriosam repudiandae nam nobis at quisquam aut omnis, quis officiis similique enim id dolorem unde!',
  headline: 'Headline Lorem Ipsum',
  iconImage: CoinbaseWalletIcon,
}
const VariantButton = Template.bind({})
VariantButton.args = {
  desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat delectus nemo optio quis! Totam magni laboriosam repudiandae nam nobis at quisquam aut omnis, quis officiis similique enim id dolorem unde!',
  headline: 'Headline Lorem Ipsum',
  interactionVariant: 'button',
}
const DefaultSmallCard = Template.bind({})
DefaultSmallCard.args = {
  desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat delectus nemo optio quis!',
  headline: 'Headline Lorem Ipsum',
  small: true,
}
const DefaultMediaCard = Template.bind({})
DefaultMediaCard.args = {
  desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat delectus nemo optio quis! Totam magni laboriosam repudiandae nam nobis at quisquam aut omnis, quis officiis similique enim id dolorem unde!',
  headline: 'Headline Lorem Ipsum',
  media: MoneyMedia,
}
const CardWithAllParameters = Template.bind({})
CardWithAllParameters.args = {
  desc: 'Many people believe that a card cannot be a button. But here at XYO, we say "No way, José" and turn our cards into buttons.',
  headline: 'Did you know that this card is complex?',
  iconImage: CoinbaseWalletIcon,
  interactionVariant: 'button',
  media: MoneyMedia,
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export { CardWithAllParameters, Default, DefaultMediaCard, DefaultSmallCard, DefaultWithImage, VariantButton }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
