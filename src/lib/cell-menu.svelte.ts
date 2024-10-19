let selected = $state<string | null>(null);

export function getSelectedCell() {
  return {
    get value() {
      return selected;
    },
    set value(v: string | null) {
      selected = v;
    },
  };
}
