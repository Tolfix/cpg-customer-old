<script>
    import { isAuth, Customer_Token } from "../../store";
    const logout = () =>
    {
        $isAuth = false;
        $Customer_Token = null;
        window.location.href = "/";
    }

</script>

<div class="flex flex-no-wrap">
    <div style="min-height: 1000px" class="w-64 absolute sm:relative bg-gray-800 shadow md:h-full flex-col justify-between hidden sm:flex">
        <div class="px-8">
            <div class="h-16 w-full flex items-center">
                <!-- Logo -->
            </div>
            <ul class="mt-12">
                <li class="flex w-full justify-between text-gray-300 cursor-pointer items-center mb-6">
                    <a href="/" class="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                        <span class="text-sm ml-2">Dashboard</span>
                    </a>
                </li>
                <li class="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                    <a href="/orders" class="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                        <span class="text-sm ml-2">Orders</span>
                    </a>
                </li>
                <li class="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                    <a href="/invoices" class="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                        <span class="text-sm ml-2">Invoices</span>
                    </a>
                </li>
                <li class="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                    <a href="/settings" class="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                        <span class="text-sm ml-2">Settings</span>
                    </a>
                </li>
                <li class="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center">
                    <div class="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                        <span on:click={logout} class="text-sm ml-2">Logout</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <div class="container mx-auto py-10 md:w-4/5 w-11/12 px-6">
        <div class="w-full h-full rounded border-dashed border-2 border-gray-300 p-5">
            <slot></slot>
        </div>
    </div>
</div>
