<script>
	let data = [
		{ name: 'Tomáš', absence: ['19.5.', '20.5.'] },
		{ name: 'Dan', absence: ['18.5.', '20.5.'] },
		{ name: 'Vašek', absence: ['18.5.', '19.5.'] }
	];

	let dates = ['17.5.', '18.5.', '19.5.', '20.5.', '21.5.', "22.5.", "23.5.", "24.5.", "25.5.", "26.5."];

	function isAbsent(student, date) {
		return student.absence.includes(date);
	}
</script>

<table class="table table-zebra w-full">
	<thead>
		<tr>
			<th>Jméno</th>
			{#each dates as date}
				<th>{date}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as student}
			<tr>
				<td>{student.name}</td>
				{#each dates as date}
					<td>
						{#if isAbsent(student, date)}
							✕
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
