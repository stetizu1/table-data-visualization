import { SelectableDataType } from '../../types/data/data'

type Comparator = (a: SelectableDataType, b: SelectableDataType) => number

const descCompare = <T>(a: T, b: T, orderBy: keyof T) =>
  b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0

export enum SortType {
  asc = `asc`,
  desc = `desc`,
}

export const getComparator = (sort: SortType, orderBy: keyof SelectableDataType): Comparator =>
  sort === SortType.desc ? (a, b) => descCompare(a, b, orderBy) : (a, b) => -descCompare(a, b, orderBy)
