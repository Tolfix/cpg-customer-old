<script>
    import { createEventDispatcher } from "svelte";
    import { isAuth, Customer_Token } from "../store";

    const eventDispatcher = createEventDispatcher();

    let error_boolean = false;

    async function login(event)
    {
        const email = event.target.email.value;
        const password = event.target.password.value; 

        fetch(`${import.meta.env.VITE_CPG_API_URL}/customers/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: email,
                password
            })
        }).then(e => e.json()).then(data => {
            if (!data.token) {
                eventDispatcher("Error")
                return;
            }
            eventDispatcher("Success")
            error_boolean = false;
            $isAuth = true;
            $Customer_Token = data.token;
            window.location.href = "/";
        });
    }


    function validateMessageEmail(event) {
        let textbox = event.target;
        error_boolean = false;
        if (textbox.value === '') {
            textbox.setCustomValidity('Required email address');
        } else if (textbox.validity.typeMismatch){
            error_boolean = true;
            textbox.setCustomValidity('please enter a valid email address');
        } else {
            textbox.setCustomValidity('');
        }
        return true;
    }
</script>

<div class="min-h-screen flex items-center justify-center">
    <form
        on:submit|preventDefault="{login}"
        on:invalid={validateMessageEmail}
        on:input={validateMessageEmail}
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Email
            </label>
            <input 
                class="shadow appearance-none border rounded
                w-full py-2 px-3 text-gray-700 leading-tight
                focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
            </label>
            <input class="shadow appearance-none border
                rounded w-full py-2 px-3 
                text-gray-700 mb-3 leading-tight focus:outline-none 
                focus:shadow-outline" id="password" type="password" placeholder="Password">
        </div>
        <div class="flex items-center justify-between">
            <button 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
                Sign In
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/forgot-password">
                Forgot Password?
            </a>
        </div>
    </form>
</div>