<script>
  export let person

  const [firstName, lastName] = person.name.split(' ')
</script>

<div class="grid px-4 py-2 bg-white drop-shadow-md rounded-lg">
  <dt class="text-lg">
    {lastName}, {firstName}
  </dt>
  <dd class="text-gray-400 text-sm font-light">
    Age: {person.age};
    Income: &euro;{person.income}
  <dd>
</div>
