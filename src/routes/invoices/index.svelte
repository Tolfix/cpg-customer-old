<script lang="ts">
    import { Customer_Token } from "../../store";

    let invoices;
    let loadingDone = false;

    fetch(`${import.meta.env.VITE_CPG_API_URL}/customers/my/invoices`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${$Customer_Token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            loadingDone = true;
            invoices = data;
        });

</script>

{#if loadingDone}

    <div class="flex flex-wrap">
        {#each invoices as invoice}
        <div class="max-w-sm lg:max-w-full lg:flex m-5">
            <div class="border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div class="mb-8">
                    <div class="text-gray-900 font-bold text-xl mb-2">Invoice #{invoice.id}</div>
                        <div>
                            <p>Invoice date: {invoice.dates.invoice_date}</p>
                            <p>Due date: {invoice.dates.due_date}</p>
                            <p>Status: {invoice.status}</p>
                            <p>Amount: {invoice.amount} SEK</p>
                            <p>Tax: {invoice.tax_rate}%</p>
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
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-1">Pay with PayPal</a>
                                    <a
                                        href="{import.meta.env.VITE_CPG_API_URL}/stripe/pay/{invoice.uid}"
                                        target="_blank"
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-1">Pay with Credit Card</a>
                            {/if}
                                <a href="/invoices/{invoice.id}">
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-1">View Invoice</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center">
                    <div class="text-sm">
                        <p class="text-gray-900 leading-none">Invoice #{invoice.id}</p>
                    </div>
                </div>
            </div>
        </div>
        {/each}
    </div>

{/if}