import { Dispatch, VoidFunctionComponent, SetStateAction } from 'react'
import { Divider, Drawer, IconButton } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'

import { SelectableDataType } from '../../../types/data/data'
import { SideEffectVoid } from '../../../types/basic/functionTypes'

import { ViewType } from '../../../constants/views/ViewTypes'

import { useDataDrawerStyle } from '../../../components-style/content/data-drawer/useDataDrawerStyle'

import { Settings } from '../../../types/views/settings/Settings'
import { GlyphsMenu } from '../views/glyphs/GlyphsMenu'
import { ParallelCoordinatesMenu } from '../views/parallel-coordinates/ParallelCoordinatesMenu'
import { ScatterPlotMatrixMenu } from '../views/scatter-plot-matrix/ScatterPlotMatrixMenu'
import { ScatterPlotGlyphsMenu } from '../views/scatter-plot-glyphs/ScatterPlotGlyphsMenu'
import { DataTableMenu } from '../views/data-table/DataTableMenu'

export interface DataDrawerProps {
  isOpen: boolean
  close: SideEffectVoid
  dataset: ReadonlyArray<SelectableDataType>
  views: ViewType[]
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
  cleanSelectedIfViewWasBrushing: (viewType: ViewType) => void
}

export const DataDrawer: VoidFunctionComponent<DataDrawerProps> = ({
  isOpen,
  close,
  dataset,
  views,
  settings,
  setSettings,
  cleanSelectedIfViewWasBrushing,
}) => {
  const classes = useDataDrawerStyle()
  const menus = views.map((view, idx) => {
    switch (view) {
      case ViewType.Glyphs:
        return (
          <GlyphsMenu
            dataset={dataset}
            settings={settings}
            setSettings={setSettings}
            cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
            key={idx}
          />
        )
      case ViewType.ParallelCoordinates:
        return (
          <ParallelCoordinatesMenu
            dataset={dataset}
            settings={settings!}
            setSettings={setSettings}
            cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
            key={idx}
          />
        )
      case ViewType.ScatterPlotMatrix:
        return (
          <ScatterPlotMatrixMenu
            dataset={dataset}
            settings={settings!}
            setSettings={setSettings}
            cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
            key={idx}
          />
        )
      case ViewType.ScatterPlotGlyphs:
        return (
          <ScatterPlotGlyphsMenu
            dataset={dataset}
            settings={settings}
            setSettings={setSettings}
            cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
            key={idx}
          />
        )
      case ViewType.DataTable:
        return (
          <DataTableMenu
            dataset={dataset}
            settings={settings}
            setSettings={setSettings}
            cleanSelectedIfViewWasBrushing={cleanSelectedIfViewWasBrushing}
            key={idx}
          />
        )
      default:
        return null
    }
  })
  return (
    <Drawer variant="persistent" anchor="right" open={isOpen} className={classes.drawer}>
      <div className={classes.header}>
        <IconButton onClick={close}>
          <ChevronRight className={classes.chevron} />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.menu}>{menus.map((menu) => menu)}</div>
    </Drawer>
  )
}
