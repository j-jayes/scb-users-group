<script context="module" lang="ts">
    import { firestore } from "$lib/firebase";

    export { load };

    async function load({ params }) {
        const { id } = params;
        const doc = await firestore.collection("threads").doc(id).get();
        const thread = doc.data();
        const querySnapshot = await doc.ref.collection("comments").get();
        const comments = querySnapshot.docs.map((doc) => doc.data());

        return { props: { thread, comments } };
    }
</script>

<script lang="ts">
    import { authUser } from "$lib/authStore";

    export let thread;
    export let comments;
    let newComment = "";

    let user: AuthUser | undefined;
    authUser.subscribe((value) => (user = value))();

    async function addComment(content) {
        await firestore
            .collection("threads")
            .doc(thread.id)
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
    <!-- Thread List -->
    <div class="list-group">
        {#each threads as { id, title, category, viewCount }}
            <a
                href={`/threads/${id}`}
                class="list-group-item list-group-item-action"
            >
                {title} <span class="badge bg-primary">{category}</span>
                <small>{viewCount} views</small>
            </a>
        {/each}
    </div>
</div>
