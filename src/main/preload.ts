import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
  queryPivot: async (filters: unknown) => {
    // TODO: connect to services/query-service via IPC or direct
    return { rows: [], meta: { filters } };
  },
  exportCSV: async (payload: unknown) => {
    // TODO: connect to export-service
    return { ok: true, meta: { payload } };
  }
});
