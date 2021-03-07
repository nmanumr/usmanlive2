import "focus-visible"
import {merge, Observable, Subject} from "rxjs"
import {mergeWith, shareReplay} from "rxjs/operators"

import {
  watchDocument,
  watchKeyboard,
  watchLocation,
  watchLocationTarget,
  watchMedia,
  watchPrint,
  watchViewport
} from "./$browser";
import {Component, getComponentElements, mountSource, mountTabs,} from "./components";

/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */

/* Yay, JavaScript is available */
document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

/* Set up navigation observables and subjects */
const document$ = watchDocument()
const location$ = watchLocation()
const target$ = watchLocationTarget()
const keyboard$ = watchKeyboard()

/* Set up media observables */
const viewport$ = watchViewport()
const tablet$ = watchMedia("(min-width: 960px)")
const screen$ = watchMedia("(min-width: 1220px)")
const print$ = watchPrint()

/* Set up Clipboard.js integration */
const alert$ = new Subject<string>()
// setupClipboardJS({alert$})

/* Set up control component observables */
const control$ = merge(
  /* Repository information */
  ...getComponentElements("source")
    .map(el => mountSource(el as HTMLAnchorElement)),

  /* Navigation tabs */
  ...getComponentElements("tabs")
    .map(el => mountTabs(el, {viewport$})),
)

/* Set up component observables */
const component$ = document$
  .pipe(
    mergeWith(control$),
    shareReplay(1)
  )

/* Subscribe to all components */
component$.subscribe()

/* ----------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------- */

window.document$ = document$
window.location$ = location$
window.target$ = target$
window.keyboard$ = keyboard$
window.viewport$ = viewport$
window.tablet$ = tablet$
window.screen$ = screen$
window.print$ = print$
window.alert$ = alert$
window.component$ = component$ as Observable<Component>
