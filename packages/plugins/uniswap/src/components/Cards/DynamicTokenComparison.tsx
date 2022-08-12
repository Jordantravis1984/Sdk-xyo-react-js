import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded'
import { Divider, IconButton } from '@mui/material'
import { FlexGrowCol, FlexGrowRow } from '@xylabs/react-flexbox'
import { TokenBar, TokenSummary, useGetTokenData } from '@xyo-network/react-shared'
import { XyoUniswapCryptoPair } from '@xyo-network/uniswap-crypto-market-payload-plugin'
import { useState } from 'react'

export interface TokenComparisonSummaryProps {
  tokenPayload: XyoUniswapCryptoPair
}

const toDecimalPrecision = (value: number, digits: number) => {
  let fixed = 0
  const result = parseFloat(value.toPrecision(digits))
  while (parseFloat(result.toFixed(fixed)) !== result && fixed < 20) {
    fixed++
  }
  return result.toFixed(fixed)
}

export const DynamicTokenComparison: React.FC<TokenComparisonSummaryProps> = ({ tokenPayload }) => {
  const [baseToken0, setBaseToken0] = useState(true)
  const [tokenInfo0, tokenInfo1] = useGetTokenData([tokenPayload.tokens[baseToken0 ? 0 : 1].symbol, tokenPayload.tokens[baseToken0 ? 1 : 0].symbol])
  const token0 = tokenPayload.tokens[baseToken0 ? 0 : 1]
  const token1 = tokenPayload.tokens[baseToken0 ? 1 : 0]

  return (
    <FlexGrowCol width="100%" justifyContent="flex-start" alignItems="flex-start" padding={0.5}>
      <TokenSummary {...token0} icon={tokenInfo0.icon}>
        <TokenBar text1={baseToken0 ? 1 : toDecimalPrecision(token1.value, 6)} text2={token0.symbol} />
      </TokenSummary>
      <FlexGrowRow paddingY={2} width="100%">
        <Divider flexItem>
          <IconButton color="secondary" onClick={() => setBaseToken0(!baseToken0)}>
            <SwapHorizRoundedIcon />
          </IconButton>
        </Divider>
      </FlexGrowRow>
      <TokenSummary {...token1} icon={tokenInfo1.icon}>
        <TokenBar text1={baseToken0 ? toDecimalPrecision(token0.value, 6) : 1} text2={token1.symbol} />
      </TokenSummary>
    </FlexGrowCol>
  )
}
