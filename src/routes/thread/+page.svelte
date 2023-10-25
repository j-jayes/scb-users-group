<script lang="ts">
    import { onMount } from "svelte";
    import { firestore } from "$lib/firebase";
    import { authUser } from "$lib/authStore";

    export let id;
    let thread = {};
    let comments = [];
    let newComment = "";

    onMount(async () => {
        const doc = await firestore.collection("threads").doc(id).get();
        thread = doc.data();
        const querySnapshot = await doc.ref.collection("comments").get();
        comments = querySnapshot.docs.map((doc) => doc.data());
    });

    let user: AuthUser | undefined;
    authUser.subscribe((value) => (user = value))();

    async function addComment(content) {
        await firestore
            .collection("threads")
            .doc(id)
            .collection("comments")
            .add({
                author: user.email,
                content,
                date: new Date(),
            });
    }
</script>

<!-- Bootstrap Container -->
<div class="container">
    <!-- Thread Content -->
    <div class="card">
        <div class="card-header">
            {thread.title} <small>by {thread.author} on {thread.date}</small>
        </div>
        <div class="card-body">
            {thread.content}
        </div>
    </div>

    <!-- Comments -->
    <ul class="list-group">
        {#each comments as { author, content, date }}
            <li class="list-group-item">
                {content} <small>by {author} on {date}</small>
            </li>
        {/each}
    </ul>

    <!-- Add Comment -->
    {#if user}
        <!-- Assume user is an object representing the authenticated user -->
        <div class="input-group mt-3">
            <input
                type="text"
                class="form-control"
                placeholder="Add a comment"
                bind:value={newComment}
            />
            <button
                class="btn btn-primary"
                on:click={() => addComment(newComment)}>Submit</button
            >
        </div>
    {/if}
</div>
