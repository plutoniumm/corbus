<script>
  import { createEventDispatcher } from "svelte";

  export let item;
  export let index;

  const dispatch = createEventDispatcher();

  function getDays(dst) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diff = +new Date(dst) - now.getTime();

    return Math.ceil(diff / (36e5 * 24));
  }

  const colors = ["#FFFF00", "#00FF00", "#FF00FF", "#00FFFF", "#FF6347"];
</script>

<article
  class="f-col j-ct al-ct tc p-rel flow-h"
  style="background: {colors[index % 5]};"
>
  <div class="days fw7">
    {getDays(item.target)}
  </div>
  <div class="name fw6">{item.name}</div>

  <button class="p-abs fw7 ptr p0" on:click={() => dispatch("remove", index)}>
    ⤬
  </button>
</article>

<style>
  article {
    color: #000;
    height: 220px;
    border: 3px solid #000;
    box-shadow: 8px 8px 0px #000;
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

  button {
    top: 10px;
    right: 10px;
    width: 35px;
    height: 35px;

    font-size: 1.5em;
    line-height: 1em;
    border-radius: 50%;

    color: #fff;
    background-color: #f00;
    border: 3px solid #000;
    box-shadow: 3px 3px 0px #000;

    transition: all 0.1s ease-in-out;
  }

  button:hover {
    background-color: #cc0000;
  }

  button:active {
    transform: translate(3px, 3px);
    box-shadow: none;
  }
</style>
