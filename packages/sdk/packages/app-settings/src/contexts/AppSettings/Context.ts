import { createContext } from 'react'

import { WebAppNavigationType } from '../../WebAppNavigationType'
import { appSettingDefault } from './appSettingDefault'

export interface AppSettingsContextProps {
  changeNavigationCollapsed?: (value: boolean) => void
  changeNavigationType?: (value: WebAppNavigationType) => void
  changeSeedPhrase?: (value: string) => void
  darkMode?: boolean
  developerMode?: boolean
  enableDarkMode?: (value: boolean) => void
  enableDeveloperMode?: (value: boolean) => void
  navigationCollapsed?: boolean
  navigationType?: WebAppNavigationType
  seedPhrase?: string
}

export const AppSettingsContext = createContext<AppSettingsContextProps>(appSettingDefault())
