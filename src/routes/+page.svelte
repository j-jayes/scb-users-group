<script lang="ts">
    import ThreadList from "$lib/ThreadList.svelte";
</script>

<div class="container">
    <!-- Thread Listing -->
    <ThreadList />

    <!-- New Thread Button -->
    <div class="mt-3">
        <a href="/new-thread" class="btn btn-primary">Create New Thread</a>
    </div>
</div>
