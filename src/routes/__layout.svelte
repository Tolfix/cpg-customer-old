<script lang="ts">
    import "../app.css";
    import { isAuth, Customer_Token } from "../store";
    import Login from "$lib/Login.svelte";
    import SideBar from "../lib/Navigation/Sidebar.svelte"
</script>

{#if !$isAuth || !$Customer_Token}
    <Login />
{:else}
    <SideBar>
        <slot></slot>
    </SideBar>
{/if}