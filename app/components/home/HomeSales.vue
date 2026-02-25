<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Period, Range, Sale } from '~/types'

const props = defineProps<{
  period: Period
  range: Range
}>()

const { getInvoices } = useInvoices()



const UBadge = resolveComponent('UBadge')
const NuxtLink = resolveComponent('NuxtLink')



const { data } = await useAsyncData('sales', async () => {
  const invoices = await getInvoices()

  const sales: Sale[] = invoices.data.map((invoice: any) => ({
    id: invoice.id,
    number: invoice.number,
    supplierName: invoice.supplier_name,
    grossAmount: invoice.gross_amount,
    status: invoice.status,
    dueDate: invoice.due_date
  }))

  return sales
}, {
  watch: [() => props.period, () => props.range],
  default: () => []
})

const columns: TableColumn<Sale>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => h(NuxtLink, { to: `/invoices/${row.getValue('id')}` }, () => `${row.getValue('id')}`)
  },
  {
    accessorKey: 'number',
    header: 'Number',
    cell: ({ row }) => {
      const number = row.getValue('number')
      return h('div', String(number))
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        approved: 'success' as const,
        rejected: 'error' as const,
        pending: 'neutral' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
  {
    accessorKey: 'supplierName',
    header: 'Supplier name'
  },
  {
    accessorKey: 'grossAmount',
    header: () => h('div', { class: 'text-right' }, 'Gross amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('grossAmount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'UAH'
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  },
  {
    accessorKey: 'Details_Edit',
    header: 'Edit',
    cell: (
      { row }) => h(NuxtLink, { to: `/invoices/${row.getValue('id')}` }, () => 'Edit'
    )
  }
]
</script>

<template>
  <h1 class="text-lg font-semibold tracking-tight">
    Invoices
  </h1>
  <UTable
    :data="data"
    :columns="columns"
    class="shrink-0"
    :ui="{
      base: 'table-fixed border-separate border-spacing-0',
      thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
      tbody: '[&>tr]:last:[&>td]:border-b-0',
      th: 'first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
      td: 'border-b border-default'
    }"
  />
</template>
