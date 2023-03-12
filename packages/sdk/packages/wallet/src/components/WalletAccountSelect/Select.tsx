import { MenuItem, SelectProps } from '@mui/material'
import { EthAddress } from '@xylabs/eth-address'
import { EthAccountBox } from '@xylabs/react-crypto'
import { FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { SelectEx } from '@xylabs/react-select'

import { useWallet } from '../../contexts'

export interface WalletAccountSelectProps extends SelectProps<number> {
  iconOnly?: boolean
  iconSize?: number
  icons?: boolean
  maxAccounts?: number
}

const arrayRange = (length: number, start = 0) => {
  return Array.from(Array(length).keys()).map((x) => x + start)
}

export const WalletAccountSelect: React.FC<WalletAccountSelectProps> = ({ iconOnly, iconSize = 24, icons, maxAccounts = 1, size, ...props }) => {
  const { activeAccountIndex = 0, setActiveAccountIndex, wallet } = useWallet()

  return (
    <SelectEx
      renderValue={(selected) => {
        const account = wallet?.deriveAccount(selected.toString())
        return (
          <FlexRow justifyContent="flex-start" gap={1}>
            {icons ? (
              <FlexRow>
                <Identicon size={iconSize} value={account?.addressValue.hex} />
              </FlexRow>
            ) : null}
            <EthAccountBox alignItems="stretch" iconOnly={iconOnly} address={EthAddress.fromString(account?.addressValue.hex)} />
          </FlexRow>
        )
      }}
      value={activeAccountIndex}
      onChange={(event) => setActiveAccountIndex?.(parseInt(`${event.target.value}`))}
      size={size}
      variant="outlined"
      {...props}
    >
      {wallet
        ? arrayRange(maxAccounts).map((index) => {
            const account = wallet?.deriveAccount(index.toString())
            return (
              <MenuItem key={index} value={index}>
                <EthAccountBox iconSize={iconSize} icon={icons} address={EthAddress.fromString(account?.addressValue.hex)} />
              </MenuItem>
            )
          })
        : null}
    </SelectEx>
  )
}
