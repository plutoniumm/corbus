<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let steps: string[] = [];
  export let statii: boolean[] = [];
  export let time: string = "";
  export let key: number;

  const dispatch = createEventDispatcher();
</script>

<div class="entry p-rel p20 f-col" shadow="2">
  <div class="time o-50 p-abs">{time}</div>

  <div class="steps flow-y-s f-col">
    {#each steps as step, i}
      <label class="step d-if al-ct ptr">
        <input
          type="checkbox"
          class="cbox p-abs o-0"
          bind:checked={statii[i]}
          on:change={() =>
            dispatch("toggle", {
              key,
              i,
            })}
        />
        <span class="checkmark al-ct j-ct"></span>

        <span class="label">{step}</span>
      </label>
    {/each}
  </div>
</div>

<style>
  .entry {
    background: var(--blue);
    min-width: 275px;
    color: #fff;
    margin-right: 20px;
  }

  .time {
    top: 5px;
    right: 10px;
  }

  .steps {
    gap: 0.35rem;
  }

  .step {
    gap: 0.4rem;
  }

  .cbox {
    pointer-events: none;
  }

  .checkmark {
    width: 1rem;
    height: 1rem;
    border: 2px solid #fff;
    transition:
      background 0.15s ease,
      border-color 0.15s ease;
  }

  .step:has(.cbox:checked) .checkmark {
    background: #fff;
    border-color: #fff;
  }

  label {
    color: #fff;
  }
</style>
