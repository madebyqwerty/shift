<script>
    import Upload from "./Upload.svelte"
    import CreateUser from "./CreateUser.svelte"
</script>

<div class="navbar bg-base-100 mb-8">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl">Shift</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1 gap-2">
			<li><a>Absence</a></li>
			<li><label for="my-modal" class="btn btn-primary">Nahrát tabulku</label></li>
			<li><label for="create-user" class="btn btn-primary btn-outline">Přidat žáka</label></li>
		</ul>
	</div>
</div>

<CreateUser />
<Upload />