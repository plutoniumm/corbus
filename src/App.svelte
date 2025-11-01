<script>
  import { onMount } from "svelte";

  import Card from "./card.svelte";
  import Form from "./form.svelte";

  let items = [];
  let time = new Date();
  let timer;
  let show = false;

  onMount(() => {
    const stored = localStorage.getItem("items");
    if (stored) {
      items = JSON.parse(stored);
    }

    timer = setInterval(() => (time = new Date()), 1000);

    return () => clearInterval(timer);
  });

  function save() {
    localStorage.setItem("items", JSON.stringify(items));
  }

  function handleAdd(event) {
    const item = event.detail;
    items = [...items, item];
    save();

    show = false;
  }

  function remove(event) {
    const i = event.detail;
    items.splice(i, 1);
    items = items;
    save();
  }

  function toggle() {
    show = !show;
  }

  function handleKeydown(event) {
    if (event.key === "n" || event.key === "N") {
      if (event.target.tagName !== "INPUT") {
        event.preventDefault();
        toggle();
      }
    }
    if (event.key === "Escape" && show) {
      show = false;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<main class="main-wrapper p20 mx-a f-col">
  <div class="time tc p20 fw7">{time.toLocaleTimeString()}</div>

  {#if show}
    <Form on:add={handleAdd} />
  {/if}

  <div class="grid">
    {#each items as item, i}
      <Card {item} index={i} on:remove={remove} />
    {/each}
  </div>

  <button class="add p-fix fw7 ptr" on:click={toggle} title="New (N)">
    +
  </button>
</main>

<style>
  main {
    max-width: 1200px;
    gap: 30px;
  }

  .time {
    font-size: 12em;
    background-color: #007bff;
    color: #ffffff;
    box-shadow: 8px 8px 0px #000;
    border: 3px solid #000;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .add {
    border-radius: 50%;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background-color: #007bff;
    color: #ffffff;
    border: 3px solid #000;
    box-shadow: 4px 4px 0px #000;
    font-size: 2.5em;
    transition: all 0.1s ease-in-out;
  }

  .add:hover {
    background-color: #0056b3;
  }

  .add:active {
    transform: translate(4px, 4px);
    box-shadow: none;
  }
</style>
