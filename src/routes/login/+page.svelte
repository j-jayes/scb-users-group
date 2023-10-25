<script lang="ts">
    import { goto } from "$app/navigation";
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { firebaseAuth } from "$lib/firebase";
    import { authUser } from "$lib/authStore";

    const errorMessages = [
        {
            type: "auth/user-not-found",
            message:
                "This email is not registered. Please register first or try again with a different email.",
        },
        {
            type: "auth/wrong-password",
            message: "The password you entered is incorrect. Please try again.",
        },
    ];

    let email: string;
    let password: string;
    let success: boolean | undefined = undefined;

    let customError = {
        type: "",
        message: "",
    };

    const login = () => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                $authUser = {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email || "",
                };

                goto("/protected");
            })
            .catch((error) => {
                const errorCode = error.code;

                const errorMatch = errorMessages.find(
                    (error) => error.type === errorCode
                );

                if (errorMatch) {
                    customError = errorMatch;
                } else {
                    customError = {
                        type: "unknown",
                        message:
                            "There was an error logging in. Please try again.",
                    };
                }

                success = false;
            });
    };
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<div class="container">
    <h1 class="text-4xl font-bold">Login</h1>

    <div class="row justify-content-center">
        <div class="col-md-8">
            <form
                class="d-flex flex-column gap-4 p-4 border rounded bg-white"
                on:submit|preventDefault={login}
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

                <button type="submit" class="btn btn-primary">Login</button>

                {#if !success && success !== undefined}
                    <div class="alert alert-danger" role="alert">
                        {customError.message}
                    </div>
                {/if}
            </form>
        </div>
    </div>
</div>
