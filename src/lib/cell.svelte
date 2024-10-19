<script lang="ts">
  import { createFloatingActions } from 'svelte-floating-ui';
  import { offset, autoPlacement } from 'svelte-floating-ui/dom';
  import { getSelectedCell } from './cell-menu.svelte';

  const {
    value,
    id,
    onupdate,
  }: {
    value: number;
    id: string;
    onupdate: (id: string, value: number) => void;
  } = $props();

  const selected = getSelectedCell();
  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'absolute',
    placement: 'bottom',
    middleware: [
      offset(1),
      autoPlacement({
        allowedPlacements: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
        ],
      }),
    ],
  });

  let open = $derived(selected.value === id);
  const onToggleMenu = () => {
    selected.value = open ? null : id;
  };
  const onSelectNumber = (num: number) => () => {
    onupdate(id, num);
  };
  const onClear = () => {
    onupdate(id, 0);
  };

  let hovering = $state(false);
  const onHover = () => {
    hovering = true;
  };
  const offHover = () => {
    hovering = false;
  };
</script>

<div
  class="cell"
  role="button"
  tabindex="0"
  onmouseover={onHover}
  onmouseout={offHover}
  onblur={offHover}
  onfocus={onHover}
  onfocusin={onHover}
  onfocusout={offHover}
>
  <button onclick={onClear} class="clear-btn" class:hide={!hovering}>X</button>
  <button use:floatingRef class="cell-btn" onclick={onToggleMenu}>
    <span class:hidden={value === 0}>
      {value}
    </span>
  </button>

  {#if open}
    <div class="menu" use:floatingContent>
      {#each { length: 9 } as _, idx}
        {@const num = idx + 1}
        <button class="cell-btn" onclick={onSelectNumber(num)}>{num}</button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .cell {
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
  }
  .clear-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 0.8rem;
    font-weight: 400;
    background: transparent;
    border: 0;
    cursor: pointer;
  }
  .clear-btn.hide {
    display: none;
  }
  .cell-btn {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
  }
  .cell-btn:hover {
    background-color: #2a2a2a;
  }
  .hidden {
    visibility: hidden;
  }
  .menu {
    position: absolute;
    z-index: 10;
    display: inline-grid;
    grid-template-columns: repeat(3, auto);
    border: 1px solid rgba(255, 255, 255, 0.5);
    background-color: #242424;
  }
  .menu button {
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem;
  }
  @media (min-width: 376px) {
    .menu button {
      padding: 2rem;
    }
  }
</style>
