<script>
    import { page } from '$app/stores';
    import { Customer_Token } from "../../store";

    let invoice;
    let loadingDone = false;

    fetch(`${import.meta.env.VITE_CPG_API_URL}/v2/customers/my/invoices/${$page.params.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${$Customer_Token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            loadingDone = true;
            invoice = data;
        });
</script>

{#if loadingDone}

    <div>
        <div class="mb-8">
            <h1 class="text-gray-900 font-bold text-xl mb-2">Invoice #{invoice.id}</h1>
                <div>
                    <p>Invoice date: {invoice.dates.invoice_date}</p>
                    <p>Due date: {invoice.dates.due_date}</p>
                    <p>Status: {invoice.status}</p>
                    <p>Amount: {invoice.amount} SEK</p>
                    <p>Tax: {invoice.tax_rate}%</p>
                </div>
                <div class="mt-5">
                    <h1 class="text-gray-900 font-bold text-xl mb-2">Items</h1>
                    {#each invoice.items as item}
                        <div>
                            <p>{item.notes}</p>
                            <p>{item.quantity} x {item.amount} SEK</p>
                        </div>
                    {/each}
                </div>
                <div class="mt-5">
                    <!-- Check if paid, else show button to pay invoice on different methods -->
                    <div class="flex flex-col">
                    {#if invoice.status == "paid"}
                        <p>Paid</p>
                    {:else}
                        <!-- Option to pick paypal, credit_card -->
                            <a
                                href="{import.meta.env.VITE_CPG_API_URL}/paypal/pay/{invoice.uid}"
                                target="_blank"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-1"
                            >
                                Pay with PayPal
                            </a>
                            <a
                                href="{import.meta.env.VITE_CPG_API_URL}/stripe/pay/{invoice.uid}"
                                target="_blank"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-1"
                            >
                                Pay with Credit Card
                            </a>
                    {/if}
                </div>
            </div>
        </div>
    </div>

{/if}