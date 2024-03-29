<script lang="ts">
    import { onMount } from "svelte";
    import {
        doc,
        getDoc,
        collection,
        getDocs,
        query,
        where,
    } from "firebase/firestore";
    import { getFirebaseContext } from "$lib/stores/sdk.js";
    import { page } from "$app/stores";
    import AddAnswer from "$lib/components/AddAnswer.svelte";
    import SignedIn from "$lib/components/SignedIn.svelte";
    import SignedOut from "$lib/components/SignedOut.svelte";
    import {
        formatDate,
        getUserName,
        fetchQuestionData,
        fetchAnswers,
        fetchUserNames,
        handleUpvote,
    } from "$lib/utils.ts";

    const firestore = getFirebaseContext().firestore;
    let questionId: string;
    let questionData;
    let answers = [];
    let userNames = {};

    $: questionId = $page.params.questionId;

    onMount(async () => {
        questionData = await fetchQuestionData(firestore, questionId);
        answers = await fetchAnswers(firestore, questionId);

        const userIds = new Set();

        // Add the UID of the question asker
        userIds.add(questionData.createdBy);

        // Add the UIDs of the people who answered the question
        if (answers.length > 0) {
            answers.forEach((answer) => userIds.add(answer.createdBy));
        }

        userNames = await fetchUserNames(firestore, Array.from(userIds));
    });

    async function upvote(userId, itemID, isQuestion) {
        await handleUpvote(firestore, userId, itemID, isQuestion);
    }
</script>

<SignedIn let:user>
    <div class="container">
        <div class="row justify-content-center">
            <!-- Main Content -->
            <div class="col-md-12">
                {#if questionData}
                    <div class="card mb-4">
                        <div class="card-body">
                            <h1 class="card-title">{questionData.title}</h1>
                            <p class="card-text">{questionData.body}</p>
                            <div>
                                {#each questionData.tags as tag}
                                    <span class="badge badge-primary mr-2"
                                        >{tag}</span
                                    >
                                {/each}
                            </div>
                            <div class="mt-3">
                                <span class="mr-2">
                                    <i class="fas fa-thumbs-up" />
                                    {questionData.votes}
                                </span>
                                <span class="text-muted"
                                    >{formatDate(questionData.createdAt)}</span
                                >
                            </div>
                        </div>
                        <div class="card-footer text-muted">
                            Asked by {userNames[questionData.createdBy]}
                            <button
                                on:click={() =>
                                    upvote(user.uid, questionId, true)}
                                class="btn btn-primary float-right"
                            >
                                Upvote Question
                            </button>
                        </div>
                    </div>

                    <!-- Answers -->
                    <h2>Answers</h2>
                    {#each answers as answer}
                        <div class="card mb-3 bg-light">
                            <div class="card-body">
                                <p class="card-text">{answer.body}</p>
                                <div class="mt-3">
                                    <span class="mr-2">
                                        <i class="fas fa-thumbs-up" />
                                        {answer.votes}
                                    </span>
                                    <span class="text-muted"
                                        >{formatDate(answer.createdAt)}</span
                                    >
                                </div>
                            </div>
                            <div class="card-footer text-muted">
                                Answered by {userNames[answer.createdBy]}
                                <button
                                    on:click={() =>
                                        handleUpvote(
                                            firestore,
                                            user.uid,
                                            answer.id,
                                            false
                                        )}
                                    class="btn btn-secondary float-right"
                                >
                                    Upvote Answer
                                </button>
                            </div>
                        </div>
                    {/each}
                {:else}
                    <p>Loading...</p>
                {/if}

                <AddAnswer {questionId} userId={user.uid} />
            </div>
        </div>
    </div>
</SignedIn>

<SignedOut let:auth>
    <br />
    <div class="container">
        <div class="row justify-content-center">
            <!-- Main Content -->
            <div class="col-md-12">
                {#if questionData}
                    <div class="card mb-4">
                        <div class="card-body">
                            <h1 class="card-title">{questionData.title}</h1>
                            <p class="card-text">{questionData.body}</p>
                            <div>
                                {#each questionData.tags as tag}
                                    <span class="badge badge-primary mr-2"
                                        >{tag}</span
                                    >
                                {/each}
                            </div>
                            <div class="mt-3">
                                <span class="mr-2">
                                    <i class="fas fa-thumbs-up" />
                                    {questionData.votes}
                                </span>
                                <span class="text-muted"
                                    >{formatDate(questionData.createdAt)}</span
                                >
                            </div>
                        </div>
                        <div class="card-footer text-muted">
                            Asked by {userNames[questionData.createdBy]}
                        </div>
                    </div>

                    <!-- Answers -->
                    <h2>Answers</h2>
                    {#each answers as answer}
                        <div class="card mb-3 bg-light">
                            <div class="card-body">
                                <p class="card-text">{answer.body}</p>
                                <div class="mt-3">
                                    <span class="mr-2">
                                        <i class="fas fa-thumbs-up" />
                                        {answer.votes}
                                    </span>
                                    <span class="text-muted"
                                        >{formatDate(answer.createdAt)}</span
                                    >
                                </div>
                            </div>
                            <div class="card-footer text-muted">
                                Answered by {userNames[answer.createdBy]}
                            </div>
                        </div>
                    {/each}
                {:else}
                    <p>Loading...</p>
                {/if}
            </div>
        </div>
    </div>
    <div class="container alert alert-warning" role="alert">
        <h2 class="alert-heading">Signed Out</h2>
        <p>Log in or register to add an answer.</p>
    </div>
</SignedOut>
