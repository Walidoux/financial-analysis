import {
  type ColumnDef,
  createSolidTable,
  flexRender,
  getCoreRowModel,
} from '@tanstack/solid-table'
import { type Accessor, For, Show, splitProps } from 'solid-js'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: Accessor<TData[] | undefined>
}

export const DataTable = <TData, TValue>(props: Props<TData, TValue>) => {
  const [local] = splitProps(props, ['columns', 'data'])

  const table = createSolidTable({
    get data() {
      return local.data() || []
    },
    columns: local.columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div class='rounded-md border'>
      <Table>
        <TableHeader>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <TableRow>
                <For each={headerGroup.headers}>
                  {(header) => {
                    return (
                      <TableHead>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  }}
                </For>
              </TableRow>
            )}
          </For>
        </TableHeader>
        <TableBody>
          <Show
            fallback={
              <TableRow>
                <TableCell
                  class='h-24 text-center'
                  colSpan={local.columns.length}>
                  No results.
                </TableCell>
              </TableRow>
            }
            when={table.getRowModel().rows?.length}>
            <For each={table.getRowModel().rows}>
              {(row) => (
                <TableRow data-state={row.getIsSelected() && 'selected'}>
                  <For each={row.getVisibleCells()}>
                    {(cell) => (
                      <TableCell>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )}
                  </For>
                </TableRow>
              )}
            </For>
          </Show>
        </TableBody>
      </Table>
    </div>
  )
}
