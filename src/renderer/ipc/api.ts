export async function queryPivot(filters: unknown) {
  return (window as any).api?.queryPivot(filters);
}

export async function exportCSV(payload: unknown) {
  return (window as any).api?.exportCSV(payload);
}
