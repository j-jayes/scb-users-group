<script lang="ts">
    import { Timestamp, addDoc, collection } from "firebase/firestore";
    import { getFirebaseContext } from "$lib/stores/sdk.js";
    import SignedOut from "$lib/components/SignedOut.svelte";
    import SignedIn from "$lib/components/SignedIn.svelte";

    const firestore = getFirebaseContext().firestore!;

    let title = "";
    let body = "";
    let selectedTags = new Set();
    let feedbackMessage = ""; // Add a variable to hold the feedback message

    const tags = ["Data", "Methodology", "Software", "Variables", "Other"];

    function toggleTag(tag) {
        if (selectedTags.has(tag)) {
            selectedTags.delete(tag);
        } else {
            selectedTags.add(tag);
        }
        selectedTags = new Set(selectedTags); // trigger reactivity
    }
    async function addQuestion(uid: string) {
        try {
            const questions = collection(firestore, "questions");
            const createdAt = Date.now();
            const questionData = {
                title,
                body,
                tags: Array.from(selectedTags),
                votes: 0,
                createdAt,
                createdBy: uid,
            };

            await addDoc(questions, questionData);

            // Optionally reset the form fields after submission
            title = "";
            body = "";
            selectedTags = new Set();

            feedbackMessage = "Question added successfully"; // Update feedback message on success
        } catch (error) {
            console.error("Error adding question:", error);
            feedbackMessage = `Error: ${error.message}`; // Update feedback message on error
        }
    }
</script>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <h1 class="text-center mb-4">Add Question</h1>

            {#if feedbackMessage}
                <!-- Conditionally render feedback message -->
                <div
                    class="alert alert-{feedbackMessage.startsWith('Error')
                        ? 'danger'
                        : 'success'}"
                >
                    {feedbackMessage}
                </div>
            {/if}

            <SignedOut let:auth>
                <div class="alert alert-warning" role="alert">
                    <h2 class="alert-heading">Signed Out</h2>
                    <p>Log in or register to add a question.</p>
                </div>
            </SignedOut>

            <SignedIn let:user>
                <form on:submit|preventDefault={() => addQuestion(user.uid)}>
                    <div class="form-group">
                        <input
                            type="text"
                            bind:value={title}
                            placeholder="Title"
                            class="form-control"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <textarea
                            bind:value={body}
                            placeholder="Body"
                            class="form-control"
                            rows="5"
                            required
                        />
                    </div>
                    <h4>Select Tags</h4>
                    <div class="form-group">
                        {#each tags as tag}
                            <div class="form-check">
                                <input
                                    type="checkbox"
                                    class="form-check-input"
                                    id={tag}
                                    on:change={() => toggleTag(tag)}
                                />
                                <label class="form-check-label" for={tag}
                                    >{tag}</label
                                >
                            </div>
                        {/each}
                    </div>
                    <button type="submit" class="btn btn-primary btn-block"
                        >Submit Question</button
                    >
                </form>
            </SignedIn>
        </div>
    </div>
</div>
