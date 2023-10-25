<script lang="ts">
    import { firestore } from "$lib/firebase";
    import { authUser } from "$lib/authStore";

    let title = "";
    let content = "";
    let category = "";

    let user: AuthUser | undefined;
    authUser.subscribe((value) => (user = value))();

    async function submit() {
        await firestore.collection("threads").add({
            author: user.email,
            title,
            content,
            category,
            date: new Date(),
            viewCount: 0,
        });
    }
</script>

<!-- Bootstrap Container -->
<div class="container">
    <!-- New Thread Form -->
    <form on:submit|preventDefault={submit}>
        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
                type="text"
                class="form-control"
                id="title"
                bind:value={title}
                required
            />
        </div>
        <div class="mb-3">
            <label for="content" class="form-label">Content</label>
            <textarea
                class="form-control"
                id="content"
                rows="5"
                bind:value={content}
                required
            />
        </div>
        <div class="mb-3">
            <label for="category" class="form-label">Category</label>
            <input
                type="text"
                class="form-control"
                id="category"
                bind:value={category}
                required
            />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
