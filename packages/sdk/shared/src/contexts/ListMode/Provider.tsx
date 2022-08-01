import { WithChildren } from '@xylabs/react-shared'
import { useState } from 'react'

import { ListMode } from '../../models'
import { ListModeContext } from './Context'

export interface ListModeProviderProps {
  defaultListMode?: ListMode
}

export const ViewModeProvider: React.FC<WithChildren<ListModeProviderProps>> = ({ children, defaultListMode }) => {
  const [listMode, setListMode] = useState(defaultListMode)

  return (
    <ListModeContext.Provider
      value={{
        provided: true,
        setListMode,
        listMode,
      }}
    >
      {children}
    </ListModeContext.Provider>
  )
}
