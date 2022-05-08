export enum ViewType {
  Glyphs = `glyphs`,
  ParallelCoordinates = `parallelCoordinates`,
  ScatterPlotMatrix = `scatterPlotMatrix`,
  ScatterPlotGlyphs = `ScatterPlotGlyphs`,
  DataTable = `dataTable`,
  ParallelSetsBundled = `parallelSetsBundled`,
}

export const isViewType = (viewType: string): viewType is ViewType =>
  (Object.values(ViewType) as string[]).includes(viewType)
