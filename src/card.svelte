<script>
  import { createEventDispatcher } from "svelte";
  import { fmt } from "./utils";

  export let item;
  export let index;

  const dispatch = createEventDispatcher();

  function getDays(dst) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diff = +new Date(dst) - now.getTime();

    return Math.ceil(diff / (36e5 * 24));
  }

  const colors = ["yellow", "green", "purple", "orange", "pink"];
</script>

<article
  class="f-col j-ct al-ct tc p-rel flow-h"
  style="background: var(--{colors[index % 5]});"
  shadow="8"
>
  <div class="days fw7">
    {getDays(item.target)}
  </div>
  <div class="name fw6">
    {item.name} <br />
    <small>{fmt.date_sm(new Date(item.target))}</small>
  </div>

  <button
    shadow="3"
    class="p-abs fw7 ptr p0 o-0"
    on:click={() => dispatch("edit", index)}
  >
    <svg
      viewBox="0 0 32 32"
      width="20"
      height="20"
      fill="#000"
      stroke-width="2"
    >
      <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
    </svg>
  </button>
</article>

<style lang="scss">
  article {
    color: #000;
    height: 220px;
    &:hover button {
      opacity: 1;
    }
  }

  .days {
    font-size: 4em;
    line-height: 1.1;
  }

  .name {
    font-size: 1.2em;
    margin-top: 5px;
    padding: 0 10px;
  }

  small {
    font-size: 0.8em;
    color: #fffa;
  }

  button {
    top: 10px;
    right: 10px;
    width: 35px;
    height: 35px;

    font-size: 1.5em;
    line-height: 1em;
    border-radius: 50%;

    background-color: #fff;
    transition: all 0.1s ease-in-out;
  }

  button:active {
    transform: translate(3px, 3px);
    box-shadow: none;
  }
</style>
