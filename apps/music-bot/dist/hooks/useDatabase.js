import { HooksRegistry, Symbols } from "./registry.js";
export function useDatabase() {
    const mongoose = HooksRegistry.get(Symbols.kDatabase);
    if (!mongoose) {
        throw new Error("Mongoose has not been initialized");
    }
    return mongoose;
}
