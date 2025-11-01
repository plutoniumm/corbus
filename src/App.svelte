<script>
  import { onMount } from "svelte";

  import Card from "./card.svelte";
  import Form from "./form.svelte";

  import { fmt } from "./utils";

  let items = [];
  let time = new Date();

  let show = false;
  let max = false;

  let timer;

  onMount(() => {
    try {
      items = JSON.parse(localStorage.getItem("items"));
    } catch (e) {}

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

  const toggle = () => (show = !show);

  function keydown(event) {
    const key = event.key;
    let lkey = key.toLowerCase();

    if (lkey === "n") {
      if (event.target.tagName !== "INPUT") {
        event.preventDefault();
        toggle();
      }
    }

    if (key === "Escape" && show) {
      show = false;
    }

    if (lkey === "f") {
      if (event.target.tagName !== "INPUT") {
        event.preventDefault();
        max = !max;
      }
    }

    if (key === "ArrowUp" || key === "ArrowDown") {
      event.preventDefault();
      let step = key === "ArrowUp" ? 0.1 : -0.1;
      let body = document.body;

      let OP = getComputedStyle(body).opacity;
      OP = parseFloat(OP) + step;
      OP = Math.min(Math.max(OP, 0.1), 1);

      body.style.opacity = OP;
    }
  }
</script>

<svelte:window on:keydown={keydown} />

{#if max}
  <main class="max f j-ct al-ct w-100">
    <div class="tmax fw7">
      {fmt.time(time)}

      <div class="date">{fmt.date(time)}</div>
    </div>
  </main>
{:else}
  <main class="p20 mx-a f-col">
    <img class="logo p-fix" shadow="3" src="/icon.svg" alt="App icon" />

    <div class="time tc p20 fw7" shadow="8">
      {fmt.default(time)} <br />

      <div class="date">{fmt.date(time)}</div>
    </div>

    {#if show}
      <Form on:add={handleAdd} />
    {/if}

    <div class="grid">
      {#each items as item, i}
        <Card {item} index={i} on:remove={remove} />
      {/each}
    </div>

    <button
      class="add p-fix fw7 ptr"
      on:click={toggle}
      title="New (N)"
      shadow="4"
    >
      +
    </button>
  </main>
{/if}

<style>
  main {
    max-width: 1200px;
    gap: 30px;
  }

  .time {
    font-size: 12em;
    color: #fff;
    background: #007bff;
  }

  .date {
    font-size: 0.1em;
    color: #fff8;
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
    background: #007bff;
    font-size: 2.5em;
    transition: all 0.1s ease-in-out;
  }

  .add:hover {
    background: #0056b3;
  }

  .add:active {
    transform: translate(4px, 4px);
    box-shadow: none;
  }

  .logo {
    top: 12px;
    left: 12px;
    width: 32px;
    height: 32px;
  }

  .max {
    background: #000;
    height: 100vh;
    max-width: unset;
    width: 100vw;
  }

  .tmax {
    color: #fff;
    font-size: 12em;
    line-height: 1;
  }
</style>
