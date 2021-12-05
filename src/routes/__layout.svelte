<script lang="ts">
    import "../app.css";
    import { isAuth } from "../store";
    import Login from "$lib/Login.svelte";
    import SideBar from "../lib/Navigation/Sidebar.svelte"
</script>

{#if !$isAuth}
<Login />
{:else}
    <SideBar>
        <slot></slot>
    </SideBar>
{/if}