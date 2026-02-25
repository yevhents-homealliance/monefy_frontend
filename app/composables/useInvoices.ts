export const useInvoices = () => {

    const API: string = "http://localhost:80/api/invoices";


    const getInvoice = async (id: string) => {
        const response = await fetch(`${API}/${id}`)
        const data = await response.json()

        console.log("data from api GET all: " + data);
        return data
    }

    const getInvoices = async () => {
        const response = await fetch(`${API}`)
        const data = await response.json()
        return data
    }

    const createInvoice = async (invoice: any) => {
        const response = await fetch(API, {
            method: 'POST',
            body: JSON.stringify(invoice),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        const data = await response.json()

        console.log('STATUS:', response.status)
        console.log('SERVER RESPONSE:', data)

        return { ok: response.ok, data }
    }

    const updateInvoice = async (id: string, invoice: any) => {
        const response = await fetch(`${API}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(invoice),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }

    return {
        getInvoice,
        getInvoices,
        createInvoice,
        updateInvoice
    }
}