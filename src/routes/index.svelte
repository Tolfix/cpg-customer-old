<script lang="ts">
    import { Customer_Token } from "../store";

    let customer;
    let loadingDone = false;

    fetch(`${import.meta.env.VITE_CPG_API_URL}/customers/my/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${$Customer_Token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            loadingDone = true;
            customer = data;
        });

</script>

{#if loadingDone}
    <div>
        <!-- Customer page, showing their data and information with tailwindcss -->
        <h1>Welcome back {customer.personal.first_name} {customer.personal.last_name}</h1>
        
        <div>
            <!-- Customer name and last name -->
            <h2>{customer.personal.first_name} {customer.personal.last_name}</h2>
            <!-- Customer email -->
            <p>{customer.personal.email}</p>
            <!-- Customer phone number -->
            <p>{customer.personal.phone}</p>
            <!-- Customer address -->
            <p>{customer.billing.street01}</p>
            <p>{customer.billing.street02}</p>
            <p>{customer.billing.city}</p>
            <p>{customer.billing.state}</p>
            <p>{customer.billing.zip}</p>
            <p>{customer.billing.country}</p>
        </div>
    </div>
{/if}