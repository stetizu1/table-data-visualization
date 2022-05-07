import { Dispatch, VoidFunctionComponent, SetStateAction, useCallback } from 'react'
import { Box, TextField, Typography } from '@mui/material'

import { MarginArray } from '../../../../types/styling/Margin'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { MARGIN_MENU_TEXT } from '../../../../text/views-and-menus/common'

import { numberInputStyles } from '../../../../components-style/content/data-drawer/items/numberInputStyles'

import { Settings } from '../../../../types/views/settings/Settings'
import { menuTextStyle } from '../../../../components-style/content/data-drawer/items/menuTextStyle'

export interface MarginInputProps {
  margins: MarginArray
  setSettings: Dispatch<SetStateAction<Settings>>
  viewType: ViewType
}

export const MarginInput: VoidFunctionComponent<MarginInputProps> = ({ margins, setSettings, viewType }) => {
  const handleMarginChange = useCallback(
    (newMargin: number, idx: number) => {
      const newMargins = [...margins]
      newMargins[idx] = newMargin

      setSettings((prev) => {
        const prevSettings = prev[viewType]!
        return {
          ...prev,
          [viewType]: {
            ...prevSettings,
            margins: newMargins,
          },
        }
      })
    },
    [margins, setSettings, viewType],
  )
  return (
    <Box sx={numberInputStyles.vertical}>
      <Typography sx={menuTextStyle.text}>{MARGIN_MENU_TEXT.header}</Typography>
      <Box sx={numberInputStyles.horizontal}>
        <TextField
          label={MARGIN_MENU_TEXT.top}
          type="number"
          defaultValue={margins[0]}
          sx={numberInputStyles.textField}
          inputProps={{ inputMode: `numeric`, min: 0 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 0)}
        />
        <TextField
          label={MARGIN_MENU_TEXT.right}
          type="number"
          defaultValue={margins[1]}
          sx={numberInputStyles.textField}
          inputProps={{ inputMode: `numeric`, min: 0 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 1)}
        />
      </Box>
      <Box sx={numberInputStyles.horizontal}>
        <TextField
          label={MARGIN_MENU_TEXT.bottom}
          type="number"
          defaultValue={margins[2]}
          sx={numberInputStyles.textField}
          inputProps={{ inputMode: `numeric`, min: 0 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 2)}
        />
        <TextField
          label={MARGIN_MENU_TEXT.left}
          type="number"
          defaultValue={margins[3]}
          sx={numberInputStyles.textField}
          inputProps={{ inputMode: `numeric`, min: 0 }}
          onChange={(e) => handleMarginChange(Number(e.target.value), 3)}
        />
      </Box>
    </Box>
  )
}