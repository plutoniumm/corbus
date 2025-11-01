<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let name = "";
  let date = "";

  function handleSubmit() {
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

    dispatch("add", { name, target });
    name = "";
    date = "";
  }
</script>

<form class="f fw p20" on:submit|preventDefault={handleSubmit} shadow="8">
  <input
    class="p10 fw6"
    placeholder="Name"
    bind:value={name}
    bind:this={nameInput}
    required
    autofocus
    shadow="2"
  />

  <input
    class="p10 fw6"
    placeholder="Date (YYYY-MM-DD) or Days"
    bind:value={date}
    required
    shadow="2"
  />

  <button shadow="4" class="p10 fw7 ptr" type="submit">Add</button>
</form>

<style>
  form {
    gap: 10px;
    background-color: #fff;
  }

  input {
    flex: 1 1 200px;
  }

  input:focus {
    outline: none;
    background: #fffde7;
  }

  button {
    flex-basis: 150px;
    background-color: #007bff;
    transition: all 0.1s ease-in-out;
  }

  button:hover {
    background-color: #0056b3;
  }

  button:active {
    transform: translate(4px, 4px);
    box-shadow: none;
  }
</style>
