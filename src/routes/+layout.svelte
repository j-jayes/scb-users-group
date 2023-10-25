<script lang="ts">
  import "../app.scss";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { signOut } from "firebase/auth";
  import { firebaseAuth } from "$lib/firebase";
  import { authUser } from "$lib/authStore";

  const handleLogout = () => {
    signOut(firebaseAuth)
      .then(() => {
        $authUser = undefined;
        goto("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
</script>

<header class="mb-4">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">Home</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        {#if $authUser}
          <li class="nav-item">
            <a
              class="nav-link"
              href="/protected"
              class:active={$page.url.pathname === "/protected"}>Protected</a
            >
          </li>
          <li class="nav-item">
            <button class="btn btn-link nav-link" on:click={handleLogout}
              >Logout</button
            >
          </li>
        {:else}
          <li class="nav-item">
            <a
              class="nav-link"
              href="/register"
              class:active={$page.url.pathname === "/register"}>Register</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="/login"
              class:active={$page.url.pathname === "/login"}>Login</a
            >
          </li>
        {/if}
      </ul>
    </div>
  </nav>
</header>

<slot />

<style>
  .navbar-brand {
    margin-left: 1rem;
  }
</style>
