import { ViewType } from '../../constants/views/ViewTypes'
import { CONTAINER_SAVE_ID, SAVE_ID } from '../../constants/save/save'

export const saveSvgToFile = (svgEl: Element, fileName: string): void => {
  svgEl.setAttribute(`xmlns`, `http://www.w3.org/2000/svg`)
  const svgData = svgEl.outerHTML
  const preface = `<?xml version="1.0" standalone="no"?>\r\n`
  const svgBlob = new Blob([preface, svgData], { type: `image/svg+xml;charset=utf-8` })
  const svgUrl = URL.createObjectURL(svgBlob)
  const downloadLink = document.createElement(`a`)
  downloadLink.href = svgUrl
  downloadLink.download = fileName
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

export const saveSvg = (viewType: ViewType): void => {
  const svgContainer = document.querySelector(`#${CONTAINER_SAVE_ID[viewType]}`)
  const svg = document.querySelector(`#${SAVE_ID[viewType]}`)
  if (!svgContainer || !svg) {
    // eslint-disable-next-line no-console
    console.error(`Identifier class missing, saving is not possible`)
    return
  }

  const containerClass = Array.from(svgContainer.classList).filter((cls) => !cls.includes(`MuiBox`))[0]

  const newStyleNodes = Array.from(document.querySelectorAll(`style`))
    .filter((e) => e.innerHTML.includes(`.${containerClass}`))
    .map((style) => style.innerHTML.replace(`.${containerClass} `, ``))
    .map((style) => {
      const node = document.createElement(`style`)
      node.innerHTML = style
      svg.insertBefore(node, svg.firstChild)
      return node
    })
  saveSvgToFile(svg, viewType)

  newStyleNodes.forEach((node) => node.remove())
}