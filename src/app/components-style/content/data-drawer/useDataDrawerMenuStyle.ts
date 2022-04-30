import { makeStyles } from '@mui/styles'

import { calc, border, px, important } from '../../../helpers/d3/stringGetters'
import { DATA_DRAWER_COLORS, ERROR_COLORS } from '../../../styles/colors'
import { DATA_DRAWER_FONT } from '../../../styles/font'

export const useDataDrawerMenuStyle = makeStyles({
  drawerMenu: {
    width: calc(-20, `100%`),
    padding: px(10),
    display: `flex`,
    flexDirection: `column`,
    textAlign: `left`,
    background: DATA_DRAWER_COLORS.drawerItemBackground,
    borderBottom: border(1, DATA_DRAWER_COLORS.drawerItemBorder),
    '& h1': {
      borderBottom: border(1, DATA_DRAWER_COLORS.drawerItemBorder),
      fontSize: DATA_DRAWER_FONT.headerFontSize,
      width: `100%`,
    },
    '& hr': {
      margin: px(4, 0, 3),
    },
    '& label': {
      fontSize: DATA_DRAWER_FONT.labelFontSize,
      color: DATA_DRAWER_COLORS.label,
    },
    '& .MuiFormControlLabel-root': {
      padding: px(2, 10),
    },
    '& .MuiCheckbox-root ': {
      padding: 0,
    },
    '& > div': {
      marginTop: px(10),
    },
  },
  insufficientAttributeNum: {
    padding: 10,
    fontSize: DATA_DRAWER_FONT.fontSize,
    color: ERROR_COLORS.font,
  },
  accordion: {
    '&.MuiPaper-root': {
      borderRadius: 0,
    },
    '& .MuiButtonBase-root': {
      minHeight: important(0),
      background: DATA_DRAWER_COLORS.drawerItemBackgroundDimmed,
    },
    '& .MuiAccordionSummary-content': {
      margin: important(px(2, 0, 5)),
    },
  },
})
