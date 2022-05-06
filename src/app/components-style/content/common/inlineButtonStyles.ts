import { SxProps } from '@mui/system'
import { BUTTON_COLORS } from '../../../styles/colors'
import { px } from '../../../helpers/d3/stringGetters'

export const inlineButtonStyles: Record<string, SxProps> = {
  button: {
    margin: 0,
    padding: 0,
    minWidth: 0,
    color: BUTTON_COLORS.buttonInlined,
  },
  buttonActive: {
    color: BUTTON_COLORS.buttonInlinedFontOn,
    bgcolor: BUTTON_COLORS.buttonInlinedBgOn,
    borderRadius: px(5),
  },
}
