<script lang="ts">
  import { getFirebaseContext } from "$lib/stores/sdk.js";
  import PopularQuestions from "$lib/components/PopularQuestions.svelte";

  const ctx = getFirebaseContext();
</script>

<section class="hero d-flex align-items-center">
  <div class="container text-center">
    <h2 class="display-4 text-white my-5">Welcome to the SCB Users Group</h2>
    <p class="lead text-white">
      This site is for users of SCB data to ask questions, share knowledge, and
      help each other out. Whether you're a new user or an experienced one, we
      welcome you to join our community and contribute to the discussion.
    </p>
    <a href="/add-question" class="btn btn-lg btn-light mt-5">Add Question</a>
  </div>
</section>

<div class="container-md mt-4">
  <h2 class="text-center mb-4">Popular Questions</h2>
  <PopularQuestions />
</div>

<style lang="scss">
  .hero {
    height: 50vh;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
      url("/hero.png") center/cover no-repeat;

    // For screens with width less than 768px
    @media (max-width: 767px) {
      height: 70vh; // Increase height for smaller screens

      h2.display-4 {
        font-size: 2.5rem; // Adjust heading size
      }

      p.lead {
        font-size: 1rem; // Adjust paragraph size
        word-wrap: break-word; // Break long words
      }

      a.btn {
        margin-top: 2rem; // Adjust button margin to avoid overlap
        font-size: 0.875rem; // Adjust button text size
      }
    }
  }
</style>
