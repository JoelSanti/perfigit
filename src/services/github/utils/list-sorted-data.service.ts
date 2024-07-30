export class ListSortedDataService {
  execute = (data: Record<string, number>, top: number): [string, number][] => {
    const dataEntries = Object.entries(data)
    const sortedData = dataEntries.sort(
      (dataA, dataB) => dataB[1] - dataA[1]
    ) as [string, number][]

    return sortedData.slice(0, top)
  }
}
