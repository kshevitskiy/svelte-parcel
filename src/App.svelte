<script>
  import { Api } from './api'
  import PayrollEntry from './components/PayrollEntry.svelte';

  let age = 34

  $: getPersonsIncome = Api().getPersonsIncome({ age_gt: age })


  // export let data = null
</script>

<div class="container px-12 mx-auto">
  <header class="grid gap-6 mb-6 lg:grid-cols-3">
    <h1 class="text-3xl lg:col-span-2">
      Average income:

      {#await getPersonsIncome}
        <span>...</span>
      {:then value}
        <b class="text-blue-600">&euro;{value.data.avgIncome}</b>
      {/await}
    </h1>

    <div class="flex space-x-4 items-center lg:justify-end">
      <div class="grid gap-2">
        <label for="age">Person age:</label>
        <input id="age" type="number" class="px-4 py-2 rounded drop-shadow" bind:value={age} on:input={getPersonsIncome} />
      </div>
    </div>
  </header>

  {#await getPersonsIncome}
    <p>Loading...</p>
  {:then value}
    <dl class="grid gap-6 lg:grid-cols-3">
      {#each value.data.persons as person}
        <PayrollEntry person={person} />
      {/each}
    </dl>
  {/await}
</div>