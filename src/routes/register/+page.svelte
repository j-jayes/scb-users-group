<script lang="ts">
    import { goto } from "$app/navigation";

    import { createUserWithEmailAndPassword } from "firebase/auth";
    import { firebaseAuth } from "$lib/firebase";

    let email: string;
    let password: string;

    let success: boolean | undefined = undefined;

    const register = () => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then(() => {
                goto("/login");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

                success = false;
            });
    };
</script>

<svelte:head>
    <title>Register</title>
</svelte:head>

<div class="container">
    <h1 class="text-4xl font-bold">Register</h1>

    <div class="row justify-content-center">
        <div class="col-md-8">
            <form
                class="d-flex flex-column gap-4 p-4 border rounded bg-white"
                on:submit|preventDefault={register}
            >
                <input
                    type="email"
                    placeholder="Email"
                    class="form-control"
                    required
                    bind:value={email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    class="form-control"
                    required
                    bind:value={password}
                />

                <button type="submit" class="btn btn-primary">Register</button>

                {#if !success && success !== undefined}
                    <div class="alert alert-danger" role="alert">
                        There was an error registering. Please try again. Note that passwords must be at least six characters long.
                    </div>
                {/if}
            </form>
        </div>
    </div>
</div>