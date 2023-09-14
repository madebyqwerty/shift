<script lang="ts">
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { isDefined, getDaysOfWeek, localizeDate } from '$lib/utils';

	export let data;

	$: students = data.students;

	let currentDate = new Date();
	let currentWeekStart = new Date(
		currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
	);
	let currentWeekEnd = new Date(
		currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 5)
	);
	let days = getDaysOfWeek(currentWeekStart, currentWeekEnd);
	console.log(days);
	let lessons = [0, 1, 2, 3, 4, 5, 6];

	function updateTable(weekStart: Date) {
		currentWeekStart = new Date(weekStart);
		currentWeekEnd = new Date(new Date(weekStart).setDate(weekStart.getDate() + 4));
		days = getDaysOfWeek(currentWeekStart, currentWeekEnd);
	}

	function prevWeek() {
		updateTable(new Date(new Date(currentWeekStart).setDate(currentWeekStart.getDate() - 7)));
	}

	function nextWeek() {
		updateTable(new Date(new Date(currentWeekStart).setDate(currentWeekStart.getDate() + 7)));
	}
</script>

<h1>Absence</h1>
<div class="flex justify-between mb-4">
	<Button on:click={prevWeek}>Předchozí týden</Button>
	<Button on:click={nextWeek}>Následující týden</Button>
</div>
<Table class="table-fixed">
	<TableHeader>
		<TableRow>
			<TableHead class="w-48">Jméno</TableHead>
			{#each days as day}
				<TableHead
					colspan={lessons.length + 2}
					class="text-center capitalize text-xl text-gray-900 px-2">{localizeDate(day)}</TableHead
				>
			{/each}
		</TableRow>
		<TableRow>
			<TableHead />
			{#each days as day}
				<TableHead class="w-0 p-0" style="width:0px;" />

				{#each lessons as lesson, index}
					<TableHead class="text-center p-0 ">{lesson}</TableHead>
				{/each}
				<TableHead class="w-0 p-0" style="width:0px;" />
			{/each}
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each students as student}
			<TableRow>
				<TableCell>{student.name}</TableCell>
				{#each days as day}
					<TableCell class="w-2" style="width:0px;" />

					{#each lessons as lesson}
						<TableCell class="text-center p-0">
							<Checkbox
								checked={isDefined(
									student.absences.find(
										(absence) =>
											new Date(absence.date).toISOString() === day.toISOString() &&
											absence.lesson === lesson
									)
								)}
							/>
						</TableCell>
					{/each}
					<TableCell class="w-2" style="width:0px;" />
				{/each}
			</TableRow>
		{/each}
	</TableBody>
</Table>
