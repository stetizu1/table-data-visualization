import { otherCasesToWhitespaces } from '../data/formatText'
import { SelectableDataType, SelectedKey } from '../../types/data/data'
import { MatrixItem } from '../../types/data/MatrixData'
import { LinkDataPoint, NodeDataPoint } from '../../types/d3-sankey'

export const px = (...values: number[]): string => values.map((val) => `${val}px`).join(` `)

export const calc = (px: number, plus: string): string => `calc(${px}px + ${plus})`

export const important = (val: string | number): string => `${val} !important`

export const border = (value: number, color: string): string => `${value}px solid ${color}`

export const getEverything = (): `*` => `*`

export const getTranslate = (translate: [number, number]): string => `translate(${translate[0]}, ${translate[1]})`

export const getClass = (className: string): string => `.${className}`

export const getAttributeFormatted = (attribute: keyof SelectableDataType): string =>
  otherCasesToWhitespaces(String(attribute))

export const getAttributeFromMatrixFormatted = (item: MatrixItem): string => getAttributeFormatted(item.rowKey)

export const getAttributeValuesWithLabel = (data: SelectableDataType): string[] =>
  Object.keys(data)
    .filter((key) => key !== SelectedKey)
    .map((attribute) => [getAttributeFormatted(attribute), data[attribute] ?? `null`].join(`: `))

export type FilterKeys = Pick<LinkDataPoint, `y0` | `y1` | `width`>

export const getLinkDataPointValuesWithLabel = (data: LinkDataPoint): string[] => {
  const filteredData: Record<string, string> = {
    from: data.names[0],
    to: data.names[0],
    count: String(data.value),
    selected: String(data.selected),
  }
  return Object.keys(filteredData).map((key) => `${getAttributeFormatted(key)}: ${filteredData[key]}`)
}

export const getNodeDataPointValuesWithLabel = (data: NodeDataPoint): string[] => {
  const filteredData: Record<string, string> = {
    attribute: otherCasesToWhitespaces(data.attribute),
    name: data.name,
    count: String(data.count),
    selected: String(data.countSelected),
  }
  return Object.keys(filteredData).map((key) => `${getAttributeFormatted(key)}: ${filteredData[key]}`)
}
