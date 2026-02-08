export async function queryPivot(filters: unknown) {
  return window.api?.queryPivot(filters);
}

export async function exportCSV(payload: unknown) {
  return window.api?.exportCSV(payload);
}
