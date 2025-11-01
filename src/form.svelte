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

<form class="f fw p20" on:submit|preventDefault={handleSubmit}>
  <input
    class="p10 fw6"
    placeholder="Name"
    bind:value={name}
    bind:this={nameInput}
    required
    autofocus
  />

  <input
    class="p10 fw6"
    placeholder="Date (YYYY-MM-DD) or Days"
    bind:value={date}
    required
  />

  <button class="submit p10 fw7 ptr" type="submit">Add</button>
</form>

<style>
  form {
    gap: 10px;
    background-color: #ffffff;
    border: 3px solid #000000;
    box-shadow: 8px 8px 0px #000000;
  }

  input {
    flex: 1 1 200px;
    font-size: 1em;
    border: 3px solid #000;
    background-color: #fff;
  }

  input:focus {
    outline: none;
    background-color: #fffde7;
  }

  .submit {
    flex-basis: 150px;
    font-size: 1em;

    background-color: #007bff;
    color: #fff;
    border: 3px solid #000;
    box-shadow: 4px 4px 0px #000;

    transition: all 0.1s ease-in-out;
  }

  .submit:hover {
    background-color: #0056b3;
  }

  .submit:active {
    transform: translate(4px, 4px);
    box-shadow: none;
  }
</style>
