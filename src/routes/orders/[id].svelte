<script>
    import { page } from '$app/stores';
    import { Customer_Token } from "../../store";

    let order;
    let loadingDone = false;

    fetch(`${import.meta.env.VITE_CPG_API_URL}/customers/my/orders/${$page.params.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${$Customer_Token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            loadingDone = true;
            order = data;
        });
</script>

{#if loadingDone}

    <div>
        <div class="mb-8">
            <h1 class="text-gray-900 font-bold text-xl mb-2">Order #{order.id}</h1>
                <div>
                    <p>Status: {order.order_status}</p>
                    <p>Payment Method: {order.payment_method}</p>
                </div>
                <div class="mt-5">
                    <h1 class="text-gray-900 font-bold text-xl mb-2">Items</h1>
                    {#each order.products as product}
                        <div>
                            <p>{product.notes}</p>
                            <p>{product.quantity} x {product.amount} SEK</p>
                        </div>
                    {/each}
                </div>
        </div>
    </div>

{/if}