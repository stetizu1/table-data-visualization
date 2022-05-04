import { SxProps } from '@mui/system'
import { PLOT_COLORS, TABLE_COLORS } from '../../../../styles/colors'
import { important } from '../../../../helpers/d3/stringGetters'

export const getDataTableRowStyle = (rowHeight: number, selected: boolean): SxProps => ({
  height: rowHeight,
  bgcolor: selected ? PLOT_COLORS.brushColorTable : ``,
  '& .MuiTableCell-root, .MuiCheckbox-root': {
    paddingTop: 0,
    paddingBottom: 0,
  },
})

export const dataTableStyle: Record<string, SxProps> = {
  tableHead: {
    height: 30,
    bgcolor: TABLE_COLORS.headerBackground,
    fontWeight: `bold`,
    '& .MuiTableCell-root, .MuiCheckbox-root': {
      color: TABLE_COLORS.headerFont,
    },
    '& .MuiTableSortLabel-root.Mui-active, .MuiTableSortLabel-root:hover, .MuiTableSortLabel-icon': {
      color: important(TABLE_COLORS.headerFontActive),
    },
  },
  tableBody: {
    bgcolor: TABLE_COLORS.rowsBackground,
  },
  notDisplayed: {
    padding: 10,
  },
}
