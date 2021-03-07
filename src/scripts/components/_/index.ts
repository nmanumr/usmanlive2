import { getElementOrThrow, getElements } from "../../$browser"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Component
 */
export type ComponentType =
  | "announce"                         /* Announcement bar */
  | "container"                        /* Container */
  | "content"                          /* Content */
  | "dialog"                           /* Dialog */
  | "header"                           /* Header */
  | "header-title"                     /* Header title */
  | "header-topic"                     /* Header topic */
  | "main"                             /* Main area */
  | "search"                           /* Search */
  | "search-query"                     /* Search input */
  | "search-result"                    /* Search results */
  | "sidebar"                          /* Sidebar */
  | "skip"                             /* Skip link */
  | "source"                           /* Repository information */
  | "tabs"                             /* Navigation tabs */
  | "toc"                              /* Table of contents */

/**
 * A component
 *
 * @template T - Component type
 * @template U - Reference type
 */
export type Component<
  T extends {} = {},
  U extends HTMLElement = HTMLElement
> =
  T & {
    ref: U                             /* Component reference */
  }

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve the element for a given component or throw a reference error
 *
 * @template T - Element type
 *
 * @param type - Component type
 * @param node - Node of reference
 *
 * @returns Element
 */
export function getComponentElement<T extends HTMLElement>(
  type: ComponentType, node: ParentNode = document
): T {
  return getElementOrThrow(`[data-md-component=${type}]`, node)
}

/**
 * Retrieve all elements for a given component
 *
 * @template T - Element type
 *
 * @param type - Component type
 * @param node - Node of reference
 *
 * @returns Elements
 */
export function getComponentElements<T extends HTMLElement>(
  type: ComponentType, node: ParentNode = document
): T[] {
  return getElements(`[data-md-component=${type}]`, node)
}
