<script lang="ts">
  import { onMount } from "svelte";

  import { fmt, LS, visibility } from "./utils";
  import Card from "./card.svelte";
  import Form from "./form.svelte";
  import Task from "./task.svelte";

  $: items = [];
  $: tasks = [];
  let time = new Date();

  let show: string | Boolean = false;
  let max = false;

  let timer;
  let data;

  onMount(() => {
    data = LS("corbus", {
      items: [],
      opacity: 1,
      tasks: [
        {
          time: "10m",
          steps: ["Wake up", "Brush teeth", "Exercise", "Breakfast"],
          statii: [false, false, false, false],
        },
      ],
    });
    items = data.items;
    tasks = data.tasks;

    document.body.style.opacity = data.opacity;
    timer = setInterval(() => (time = new Date()), 1000);

    return () => clearInterval(timer);
  });

  const saveSync = () => (data.items = items);
  const saveAsync = () => (data.tasks = tasks);
  const toggle = () => (show = "sync");
  const rapid = () => (show = "async");
  const byDate = (a, b) => new Date(a.target) - new Date(b.target);

  function handleSync({ detail }) {
    items = [...items, detail];
    saveSync();
    show = false;
  }

  function handleAsync({ detail }) {
    tasks = [...tasks, detail];
    saveAsync();
    show = false;
  }

  let formName = "";
  let formDate = "";
  function edit({ detail: i }) {
    let item = items[i];

    show = true;
    formName = item.name;

    let days = Math.ceil((+new Date(item.target) - +new Date()) / 864e5);
    formDate = days;

    items.splice(i, 1);
    items = items;
    saveSync();
  }

  function handleUpdate({ detail }) {
    let { key, i } = detail;
    // as before we can just regenerate the whole task
    let T = tasks[key];
    T.statii[i] = !T.statii[i];
    tasks[key] = T;
    tasks = tasks;
    saveAsync();
  }

  function keydown(event) {
    const key = event.key;
    let lkey = key.toLowerCase();
    let isInput =
      event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA";

    if (key === "Escape" && show) show = false;
    if (lkey === "n" && !isInput) toggle();
    if (lkey === "f" && !isInput) max = !max;

    if (key === "ArrowUp" || key === "ArrowDown") {
      let step = key === "ArrowUp" ? 0.1 : -0.1;
      data.opacity = visibility(step);
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
      <Form
        on:async={handleAsync}
        on:sync={handleSync}
        name={formName}
        date={formDate}
        mode={show}
      />
    {/if}

    <div class="f">
      {#each tasks as T, key}
        <Task
          time={T.time}
          {key}
          steps={T.steps}
          on:toggle={handleUpdate}
          statii={T.statii}
        />
      {/each}
    </div>

    <div class="grid">
      {#each items.sort(byDate) as item, i}
        <Card {item} index={i} on:edit={edit} />
      {/each}
    </div>

    <div class="p-fix fw7" id="controls">
      <button class="add ptr m5" on:click={rapid} shadow="4"> ↣ </button>
      <button class="add ptr m5" on:click={toggle} shadow="4"> + </button>
    </div>
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

  .p-fix {
    bottom: 30px;
    right: 30px;
  }

  .add {
    border-radius: 50%;
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
