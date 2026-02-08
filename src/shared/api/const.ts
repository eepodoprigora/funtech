export const API_STATE = {
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
} as const;

export type ApiState = typeof API_STATE[keyof typeof API_STATE];

export const API_URL = 'https://api.coingecko.com/api/v3/nfts/list'