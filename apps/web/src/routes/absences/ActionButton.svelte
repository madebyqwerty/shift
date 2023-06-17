<script lang="ts">
    import {ScanLine, PlusSquare} from "lucide-svelte"
    export let icon:string="plus";
</script>

<button on:click class="h-full w-full rounded-2xl bg-base-50 text-base-950 flex flex-col justify-center items-center gap-1 py-3 shadow active:bg-base-100">
    {#if icon === 'scan'}
        <ScanLine class="w-8 h-8" />
    {:else if icon === 'plus'}
        <PlusSquare class="w-8 h-8" />
    {/if}
    <span class="text-sm leading-5">
        <slot></slot>
    </span>
</button>
