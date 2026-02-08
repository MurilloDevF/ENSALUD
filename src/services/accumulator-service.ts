export type Accumulator = { name: string; sedeCodigo: string; cecoPattern: string };

const store: Accumulator[] = [];

export function saveAccumulator(acc: Accumulator) {
  store.push(acc);
  return acc;
}

export function listAccumulators() {
  return store;
}
