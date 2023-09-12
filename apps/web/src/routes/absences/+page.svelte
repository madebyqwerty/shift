<script lang="ts">
	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';

	import { X } from 'lucide-svelte';
	export let data;

	data.students = data.students
		.map((student) => {
			return {
				...student,
				absences: student.absences.map((absence) => {
					return {
						...absence,
						dateString: new Date(absence.date)
							.toLocaleDateString('cs-CZ', {
								weekday: 'long',
								day: 'numeric',
								month: 'numeric'
							})
							.replace('. ', '.')
					};
				})
			};
		})
		.filter((student) => student !== undefined);

	let currentDate = new Date();
	let currentWeekStart = new Date(
		currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
	);
	let currentWeekEnd = new Date(
		currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 5)
	);
	let days = getDaysOfWeek(currentWeekStart, currentWeekEnd);
	let lessons = [0, 1, 2, 3, 4, 5, 6];
	let students = data.students;

	function getDaysOfWeek(start, end) {
		let days = [];
		const beginning = new Date(start);
		for (let date = beginning; date <= end; date.setDate(date.getDate() + 1)) {
			days.push(
				date
					.toLocaleDateString('cs-CZ', {
						weekday: 'long',
						day: 'numeric',
						month: 'numeric'
					})
					.replace('. ', '.')
			);
		}
		return days;
	}


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

	const absences = students
		.flatMap((student) => {
			if (student.absences.length > 0) {
				return student.absences;
			}
		})
		.filter((absence) => {
			return absence !== undefined;
		});


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
					class="text-center capitalize text-xl text-gray-900 px-2">{day}</TableHead
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
								checked={student.absences.find((a) => a.dateString === day && a.lesson === lesson)}
							/>
						</TableCell>
					{/each}
					<TableCell class="w-2" style="width:0px;" />
				{/each}
			</TableRow>
		{/each}
	</TableBody>
</Table>
