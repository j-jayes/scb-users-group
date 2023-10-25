<script lang="ts">
    import { onMount } from "svelte";
    import { firestore } from "$lib/firebase";
    import { collection, getDocs } from 'firebase/firestore';

    let threads = [];

    onMount(async () => {
        const querySnapshot = await getDocs(collection(firestore, 'threads'));
        threads = querySnapshot.docs.map(doc => doc.data());
    });
</script>

<!-- Bootstrap Container -->
<div class="container">
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
