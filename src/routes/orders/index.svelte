<script lang="ts">
    import { Customer_Token } from "../../store";

    let orders;
    let loadingDone = false;

    fetch(`${import.meta.env.VITE_CPG_API_URL}/customers/my/orders`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${$Customer_Token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            loadingDone = true;
            orders = data;
        });

</script>

{#if loadingDone}

    <div class="flex flex-wrap">
        {#each orders as order}
        <div class="max-w-sm lg:max-w-full lg:flex m-5">
            <div class="border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div class="mb-8">
                    <div class="text-gray-900 font-bold text-xl mb-2">Order #{order.id}</div>
                        <div>
                            <p>Status: {order.order_status}</p>
                            <p>Payment Method: {order.payment_method}</p>
                        </div>
                        <div class="mt-5">
                            <!-- Check if paid, else show button to pay invoice on different methods -->
                            <div class="flex flex-col">
                                <a href="/orders/{order.id}">
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-1">
                                        View Order
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center">
                    <div class="text-sm">
                        <p class="text-gray-900 leading-none">Order #{order.id}</p>
                    </div>
                </div>
            </div>
        </div>
        {/each}
    </div>

{/if}