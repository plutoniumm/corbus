<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let name = "";
  export let date = "";
  export let mode: string = "sync";

  $: isSync = mode === "sync";

  function syncSubmit() {
    let target;

    if (date.includes("-")) {
      target = new Date(date);
    } else {
      const days = parseInt(date, 10);
      if (isNaN(days)) return;
      target = new Date();
      target.setDate(target.getDate() + days);
    }

    target.setHours(0, 0, 0, 0);
    target = target.toISOString();

    dispatch("sync", { name, target });
  }

  function asyncSubmit() {
    const steps = name
      .split("\n")
      .map((s) => s.replace(/^-\ ?/, ""))
      .map((s) => s.trim())
      .filter((s) => s.length);
    if (steps.length === 0) return;

    dispatch("async", {
      steps,
      time: date,
      statii: steps.map(() => false),
    });
  }

  function handleSubmit() {
    if (mode === "sync") {
      syncSubmit();
    } else if (mode === "async") {
      asyncSubmit();
    } else {
      console.error("Invalid mode:", mode);
    }

    name = "";
    date = "";
  }
</script>

<form class="fw p20" on:submit|preventDefault={handleSubmit} shadow="8">
  <input
    class="p10 fw6 time"
    placeholder={isSync ? "YYYY-MM-DD or Days" : "10m or 30s"}
    bind:value={date}
    required
    shadow="2"
  />

  {#if isSync}
    <input
      class="p10 fw6"
      placeholder="Name"
      bind:value={name}
      required
      autofocus
      shadow="2"
    />
  {:else if mode === "async"}
    <textarea
      class="p10 fw6"
      placeholder={`
- Sub Tasks
- One per line
      `.trim()}
      rows="4"
      bind:value={name}
      required
      autofocus
      shadow="2"
    ></textarea>
  {:else}
    <div>Invalid mode: {mode}</div>
  {/if}

  <button shadow="4" class="p10 fw7 ptr" type="submit">Add</button>
</form>

<style>
  form {
    gap: 10px;
    background-color: #fff;
  }

  button[type="submit"],
  .time {
    flex: 1;
  }

  *[autofocus] {
    flex: 3;
  }

  input:focus {
    outline: none;
    background: #fffde7;
  }

  button {
    flex-basis: 150px;
    background-color: var(--blue);
    transition: all 0.1s ease-in-out;
  }

  button:active {
    transform: translate(4px, 4px);
    box-shadow: none;
  }
</style>
