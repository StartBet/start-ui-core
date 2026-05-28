export type ZendeskApi = (..._args: unknown[]) => void;

export type ZendeskGlobal = typeof globalThis & { zE?: ZendeskApi };
