<script lang="ts">
  import '../app.css';
  import Cell from '$lib/cell.svelte';
  import { getSelectedCell } from '$lib/cell-menu.svelte';

  const board = $state([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]);

  const selected = getSelectedCell();
  const onupdate = (id: string, num: number) => {
    const [row, col] = id.split(':').map(Number);
    board[row][col] = num;
    selected.value = null;
  };
</script>

<div class="board">
  {#each board as row, ri}
    <div class="section">
      {#each row as col, ci}
        <Cell value={col} id={`${ri}:${ci}`} {onupdate} />
      {/each}
    </div>
  {/each}
</div>

<style>
  .board {
    padding: 0 0.5rem;
    width: 100%;
    max-width: 900px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .section {
    width: 100%;
    max-width: 300px;
    aspect-ratio: 1;
    border: 1px solid white;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
</style>
