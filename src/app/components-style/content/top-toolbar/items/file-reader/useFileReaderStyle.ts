import { makeStyles } from '@mui/styles'

import { border, px } from '../../../../../helpers/d3/stringGetters'
import { HIGHLIGHT_COLOR } from '../../../../../styles/colors'

export const useFileReaderStyle = makeStyles({
  input: {
    width: px(220),
  },
  box: {
    transition: `0.3s all ease`,
    border: border(0, HIGHLIGHT_COLOR.border),
    background: HIGHLIGHT_COLOR.backgroundGone,
  },
  highlight: {
    border: border(2, HIGHLIGHT_COLOR.border),
    background: HIGHLIGHT_COLOR.background,
    padding: px(10, 0),
    borderRadius: 10,
  },
})
