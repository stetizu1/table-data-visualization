import { Dispatch, SetStateAction } from 'react'
import { MenuItem, TextField } from '@mui/material'

import { SelectableDataType } from '../../../../types/data/data'

import { otherCasesToWhitespaces } from '../../../../helpers/data/formatText'

import { ViewType } from '../../../../constants/views/ViewTypes'

import { Settings } from '../../../../types/views/settings/Settings'

export interface SelectorProps<Opt> {
  viewType: ViewType
  value: keyof SelectableDataType
  attributesKeys: Array<keyof SelectableDataType>
  setSettings: Dispatch<SetStateAction<Settings>>
  handleChangeSettings?: () => void
  label: string
  settingsKey: keyof Opt
}

export const Selector = <Opt,>({
  viewType,
  value,
  attributesKeys,
  setSettings,
  label,
  settingsKey,
  handleChangeSettings,
}: SelectorProps<Opt>): JSX.Element => {
  const handleSelectChange = (newValue: keyof SelectableDataType) => {
    if (handleChangeSettings) handleChangeSettings()
    setSettings((prev) => {
      const prevSettings = prev[viewType]!
      return {
        ...prev,
        [viewType]: {
          ...prevSettings,
          [settingsKey]: newValue,
        },
      }
    })
  }
  return (
    <TextField
      value={value}
      onChange={(e) => handleSelectChange(e.target.value as keyof SelectableDataType)}
      select
      label={label}
    >
      {attributesKeys.map((key, idx) => (
        <MenuItem value={key} key={`${settingsKey}-${viewType}-${idx}`}>
          {otherCasesToWhitespaces(key)}
        </MenuItem>
      ))}
    </TextField>
  )
}