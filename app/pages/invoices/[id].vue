<script setup lang="ts">
import * as z from 'zod'
import { separator } from '#build/ui'

const { updateInvoice , getInvoice } = useInvoices();

const id = useRoute().params.id as string

const detailsSchema = z.object({
  number: z.string().min(2, 'Too short'),
  supplier_name: z.string().min(2, 'Too short'),
  supplier_tax_id: z.string().min(2, 'Too short'),
  currency: z.string().min(2, 'Too short'),
  gross_amount: z.string().min(2, 'Too short'),
  status: z.string().min(2, 'Too short'),
  issue_date: z.string().min(2, 'Too short'),
  created_at: z.string().min(2, 'Too short'),
  updated_at: z.string().min(2, 'Too short'),
  net_amount: z.string().min(2, 'Too short'),
  vat_amount: z.string().min(2, 'Too short'),
  due_date: z.string().min(2, 'Too short'),
})

type DetailsSchema = z.output<typeof detailsSchema>

const invoice = await getInvoice(id)

const details = reactive<Partial<DetailsSchema>>({
  number: invoice.data.number,
  supplier_name: invoice.data.supplier_name,
  supplier_tax_id: invoice.data.supplier_tax_id,
  net_amount: invoice.data.net_amount,
  vat_amount: invoice.data.vat_amount,
  gross_amount: invoice.data.gross_amount,
  currency: invoice.data.currency,
  status: invoice.data.status,
  issue_date: invoice.data.issue_date,
  due_date: invoice.data.due_date,
  created_at: invoice.data.created_at,
  updated_at: invoice.data.updated_at,
})

const update = async () => {
    const res = await updateInvoice(id , details)
    if (res.ok) {
        alert('Invoice updated successfully')
    } else {
        alert('Failed to update invoice')
    }
}
</script>

<template>
  <UForm
    id="edit"
    :schema="detailsSchema"
    :state="details"
  >
    <UPageCard variant="subtle">
      <h2>Details of Invoice #{{ invoice.data.number }}</h2>
      <separator class="my-6" />
      <hr/>
      <UFormField
        name="number"
        label="Invoice number"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="details.number"
            autocomplete="off"
            :disabled="true"
          />
      </UFormField>
      <separator class="my-6" />
      <UFormField
        name="supplier_name"
        label="Supplier name"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="details.supplier_name"
            autocomplete="off"
            :disabled="true"
          />
      </UFormField>
      <separator class="my-6" />
      <UFormField
        name="supplier_tax_id"
        label="Supplier tax ID"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="details.supplier_tax_id"
            autocomplete="off"
            :disabled="true"
          />
      </UFormField>
      <separator class="my-6" />
      <UFormField
        name="gross_amount"
        label="Gross amount"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="details.gross_amount"
            autocomplete="off"
            :disabled="true"
          />
      </UFormField>
      <UFormField
        name="currency"
        label="Currency"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="details.currency"
            autocomplete="off"
            :disabled="true"
          />
      </UFormField>
      <UFormField
        name="created_at"
        label="Created at"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="details.created_at"
            autocomplete="off"
            :disabled="true"
          />
      </UFormField>
      <separator class="my-6" />
      <UFormField
        name="updated_at"
        label="Updated at"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="details.updated_at"
            autocomplete="off"
            :disabled="true"
          />
      </UFormField>
      <separator class="my-6" />
    </UPageCard>
  </UForm>
  <UForm
    id="edit"
    :schema="detailsSchema"
    :state="details"
  >
    <UPageCard variant="subtle">

      <h2>Edit Invoice</h2>
      <separator class="my-6" />

      <hr/>

      <UFormField
        name="net_amount"
        label="Net amount"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="details.net_amount"
            autocomplete="off"
            :disabled="invoice.data.status === 'pending' ? true : false "
          />
      </UFormField>
      <separator class="my-6" />

      <UFormField
        name="vat_amount"
        label="VAT amount"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="details.vat_amount"
            autocomplete="off"
            :disabled="invoice.data.status === 'pending' ? true : false "
          />
      </UFormField>
      <separator class="my-6" />

      <UFormField
        name="due_date"
        label="Due date"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="details.due_date"
            autocomplete="off"
            :disabled="invoice.data.status === 'pending' ? true : false "
          />
      </UFormField>
      <separator class="my-6" />

      <UButton
        form="edit"
        label="Update invoice"
        color="neutral"
        type="submit"
        class="w-fit text-center lg:ms-auto mt-[50px]"
        @click="update()"
        :disabled="invoice.data.status === 'pending' ? true : false "
      />
    </UPageCard>
  </UForm>
</template>
