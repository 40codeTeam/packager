<script>
  import ResetButton from "./ResetButton.svelte";

 
  export let reset;
</script>

<center
  ><mdui-card variant="filled">
    {#if reset}
      <div class="reset">
        <ResetButton on:click={reset} />
      </div>
    {/if}
    <slot></slot>
  </mdui-card></center>

<style>
  .reset {
    float: right;
  }
</style>
