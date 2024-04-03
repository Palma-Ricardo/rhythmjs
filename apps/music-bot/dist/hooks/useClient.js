import { HooksRegistry, Symbols } from "./registry.js";
export function useClient() {
    const client = HooksRegistry.get(Symbols.kClient);
    if (!client) {
        throw new Error("Client has not been initialized");
    }
    return client;
}
