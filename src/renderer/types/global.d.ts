declare global {
  interface Window {
    api: {
      queryPivot(filters: unknown): Promise<any>;
      exportCSV(payload: unknown): Promise<any>;
    };
  }
}
export {};
