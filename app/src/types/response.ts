export interface HealthResponse {
  cache: {
    ping: string | null;
    env: {
      endpoint: string | null;
    };
  };
  serverTime: number;
}
