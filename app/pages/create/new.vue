<script setup lang="ts">
import * as z from 'zod'
import { separator } from '#build/ui'

const { createInvoice } = useInvoices();

const fullDate = () => {
    const date = new Date;
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

const createdata = reactive({
  supplier_name: '',
  supplier_tax_id: '',
  currency: '',
  net_amount: 0,
  vat_amount: 0,
  due_date: '',
  issue_date: fullDate()
})

const createSchema = z.object({
  supplier_name: z.string(),
  supplier_tax_id: z.string(),
  currency: z.string(),
  net_amount: z.string(),
  vat_amount: z.string(),
  due_date: z.string().optional(),
  issue_date: z.string().optional()
})

const create = async () => {
    createdata.net_amount = Number(createdata.net_amount)
    createdata.vat_amount = Number(createdata.vat_amount)

    const res = await createInvoice(createdata);


    if (res.ok) {
        alert('Invoice created successfully');
    } else {
        
        alert('Failed to create invoice' + '\n\n' + createdata);
        console.log('Failed to create invoice:  ' + JSON.stringify(createdata));
    }
};



</script>

<template>
  <UForm
    id="create"
    :schema="createSchema"
    :state="createdata"
  >
    <UPageCard variant="subtle">
      <h2>Create New Invoice</h2>
      <separator class="my-6" />
      <hr/>



      <separator class="my-6" />
      <UFormField
        name="supplier_name"
        label="Supplier name"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="createdata.supplier_name"
            autocomplete="off"
            
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
            v-model="createdata.supplier_tax_id"
            autocomplete="off"
            
          />
      </UFormField>
      <separator class="my-6" />
      <UFormField
        name="currency"
        label="Currency"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="createdata.currency"
            autocomplete="off"
            
          />
      </UFormField>
      <separator class="my-6" />
      <separator class="my-6" />

      <UFormField
        name="net_amount"
        label="Net amount"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="createdata.net_amount"
            autocomplete="off"
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
            v-model="createdata.vat_amount"
            autocomplete="off"
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
            v-model="createdata.due_date"
            autocomplete="off"
          />
      </UFormField>
      <separator class="my-6" />

      <UFormField
        name="issue_date"
        label="Issue date"
        required
        class="flex max-[380px]:flex-col justify-between items-center gap-4"
      >
          <UInput
            v-model="createdata.issue_date"
            autocomplete="off"
          />
      </UFormField>
      <separator class="my-6" />

      <UButton
        form="edit"
        label="Create invoice"
        color="neutral"
        type="submit"
        class="w-fit text-center lg:ms-auto mt-[50px]"
        @click="create()"
      />
    </UPageCard>
  </UForm>
  
</template>
