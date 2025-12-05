<script>
  import { onMount } from "svelte";

  import { fmt, LS, visibility } from "./utils";
  import Card from "./card.svelte";
  import Form from "./form.svelte";

  let items = [];
  let time = new Date();

  let show = false;
  let max = false;

  let timer;
  let data;

  onMount(() => {
    data = LS("corbus", {
      items: [],
      opacity: 1,
    });
    items = data.items;

    document.body.style.opacity = data.opacity;
    timer = setInterval(() => (time = new Date()), 1000);
    return () => clearInterval(timer);
  });

  const save = () => (data.items = items);
  const toggle = () => (show = !show);
  const byDate = (a, b) => new Date(a.target) - new Date(b.target);

  function handleAdd(event) {
    const item = event.detail;
    items = [...items, item];
    save();

    show = false;
  }

  let formName = "";
  let formDate = "";
  function edit(event) {
    const i = event.detail;
    let item = items[i];

    show = true;
    formName = item.name;

    let date = +new Date(item.target);
    let now = +new Date();
    let days = Math.ceil((date - now) / (36e5 * 24));
    formDate = days;

    items.splice(i, 1);
    items = items;
    save();
  }

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
      let OP = visibility(step);
      data.opacity = OP;
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
      <Form on:add={handleAdd} name={formName} date={formDate} />
    {/if}

    <div class="grid">
      {#each items.sort(byDate) as item, i}
        <Card {item} index={i} on:edit={edit} />
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
    background: var(--blue);
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
    background: var(--blue);
    font-size: 2.5em;
    transition: all 0.1s ease-in-out;
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
