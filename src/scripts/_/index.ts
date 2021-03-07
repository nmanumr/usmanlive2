import { getElementOrThrow, getLocation } from "../$browser"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
/**
 * Configuration
 */
export interface Config {
    base: string                         /* Base URL */
    search: string                       /* Search worker URL */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Retrieve global configuration and make base URL absolute
 */
const script = getElementOrThrow("#__config")
const config: Config = JSON.parse(script.textContent!)
config.base = new URL(config.base, getLocation())
    .toString()
    .replace(/\/$/, "")

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve global configuration
 *
 * @returns Global configuration
 */
export function configuration(): Config {
    return config
}
