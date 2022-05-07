import { useCallback, useMemo, useState, VoidFunctionComponent } from 'react'
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
} from '@mui/material'
import { FilterListOutlined } from '@mui/icons-material'

import { VisualizationView } from '../../../../types/views/VisualizationView'
import { Brushable } from '../../../../types/brushing/Brushable'
import { DataTableSettings } from '../../../../types/views/settings/DataTableSettings'
import { SelectableDataType } from '../../../../types/data/data'

import { dataToReadable, otherCasesToWhitespaces } from '../../../../helpers/data/formatText'
import { getComparator, SortType } from '../../../../helpers/data/comparator'

import { ViewType } from '../../../../constants/views/ViewTypes'
import { MIN_DATA_TABLE_ATTRIBUTE_COUNT } from '../../../../constants/views/dataTable'
import { FORM } from '../../../../constants/form'

import { DATA_TABLE_TEXT } from '../../../../text/views-and-menus/dataTable'
import {
  dataTableStyle,
  getDataTableRowStyle,
} from '../../../../components-style/content/views/data-table/dataTableStyle'

export interface DataTableProps extends VisualizationView, Brushable, DataTableSettings {
  showFilter: boolean
}

export const DataTable: VoidFunctionComponent<DataTableProps> = ({
  dataset,
  displayAttributes,
  refreshViews,
  setComponentBrushing,
  rowHeight,
  selectedBackgroundColor,
  selectedFontColor,
  showFilter,
}) => {
  const [order, setOrder] = useState<SortType>(SortType.asc)
  const [orderBy, setOrderBy] = useState<keyof SelectableDataType>(displayAttributes[0])
  const [filterValues, setFilterValues] = useState<{ [p: keyof SelectableDataType]: string }>(
    Object.fromEntries(displayAttributes.map((key) => [key, ``])),
  )

  const filteredDataset = useMemo<SelectableDataType[]>(
    () =>
      [...dataset].filter((data) =>
        displayAttributes.every((attribute) => String(data[attribute]).includes(filterValues[attribute])),
      ),
    [dataset, displayAttributes, filterValues],
  )

  const sortedDataset = useMemo(
    () => filteredDataset.sort(getComparator(order, orderBy)),
    [filteredDataset, order, orderBy],
  )

  const handleSelectClick = useCallback(
    (changedData: SelectableDataType) => {
      changedData.selected = !changedData.selected
      if (dataset.every((data) => !data.selected)) {
        setComponentBrushing(null)
        return
      }
      setComponentBrushing(ViewType.DataTable)
      refreshViews()
    },
    [dataset, refreshViews, setComponentBrushing],
  )

  const handleSelectAllClick = useCallback(
    (checked: boolean) => {
      sortedDataset.forEach((data) => (data.selected = checked))
      if (dataset.every((data) => !data.selected)) {
        setComponentBrushing(null)
        return
      }
      setComponentBrushing(ViewType.DataTable)
      refreshViews()
    },
    [dataset, refreshViews, setComponentBrushing, sortedDataset],
  )

  const handleRequestSort = useCallback(
    (property: keyof SelectableDataType) => {
      const isAsc = orderBy === property && order === SortType.asc
      setOrder(isAsc ? SortType.desc : SortType.asc)
      setOrderBy(property)
    },
    [order, orderBy],
  )

  const handleFilterValueChange = useCallback((newValue: string, key: keyof SelectableDataType) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: newValue,
    }))
  }, [])

  const createSortHandler = useCallback(
    (property: keyof SelectableDataType) => () => {
      handleRequestSort(property)
    },
    [handleRequestSort],
  )

  const sortTooltipTitle = useCallback(
    (headCellId: keyof SelectableDataType) =>
      orderBy === headCellId
        ? DATA_TABLE_TEXT[order === SortType.asc ? SortType.desc : SortType.asc]
        : DATA_TABLE_TEXT[SortType.asc],
    [order, orderBy],
  )

  if (displayAttributes.length >= MIN_DATA_TABLE_ATTRIBUTE_COUNT) {
    return (
      <TableContainer>
        <Table>
          <TableHead sx={dataTableStyle.tableHead}>
            <TableRow sx={dataTableStyle.tableHeadRow}>
              <TableCell padding={FORM.checkbox}>
                <Tooltip title={DATA_TABLE_TEXT.checkboxTooltip}>
                  <Checkbox
                    sx={dataTableStyle.checkAll}
                    indeterminate={sortedDataset.some((data) => data.selected)}
                    checked={sortedDataset.every((data) => data.selected)}
                    onChange={(event) => handleSelectAllClick(event.target.checked)}
                  />
                </Tooltip>
              </TableCell>
              {displayAttributes.map((attribute) => {
                const orderedByActive = orderBy === attribute
                return (
                  <TableCell key={attribute} sortDirection={orderedByActive ? order : false}>
                    <Tooltip title={sortTooltipTitle(attribute)}>
                      <TableSortLabel
                        active={orderedByActive}
                        direction={orderedByActive ? order : SortType.asc}
                        onClick={createSortHandler(attribute)}
                      >
                        {otherCasesToWhitespaces(attribute)}
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                )
              })}
            </TableRow>
            {showFilter && (
              <TableRow sx={dataTableStyle.filterRow}>
                <TableCell sx={dataTableStyle.filterIcon} padding={FORM.checkbox}>
                  <FilterListOutlined />
                </TableCell>
                {displayAttributes.map((attribute, idx) => (
                  <TableCell sx={dataTableStyle.filterCell} key={`filter-${attribute}`}>
                    <TextField
                      defaultValue={filterValues[idx]}
                      sx={dataTableStyle.filter}
                      onChange={(e) => handleFilterValueChange(e.target.value, attribute)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableHead>
          <TableBody sx={dataTableStyle.tableBody}>
            {sortedDataset.map((data, idx) => {
              const selected = data.selected
              return (
                <TableRow
                  hover
                  onClick={() => handleSelectClick(data)}
                  key={idx}
                  sx={getDataTableRowStyle(rowHeight, selected, selectedBackgroundColor, selectedFontColor)}
                >
                  <TableCell padding={FORM.checkbox}>
                    <Checkbox checked={selected} />
                  </TableCell>
                  {displayAttributes.map((attribute) => (
                    <TableCell key={`${idx}-${attribute}`}>{dataToReadable(data[attribute])}</TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  return <Box sx={dataTableStyle.notDisplayed}>{DATA_TABLE_TEXT.unavailable}</Box>
}
