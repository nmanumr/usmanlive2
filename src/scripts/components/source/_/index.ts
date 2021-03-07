import {defer, NEVER, Observable, of, Subject} from "rxjs"
import {catchError, filter, finalize, map, shareReplay, tap} from "rxjs/operators"

import {setSourceFacts, setSourceState} from "../actions"
import {renderSourceFacts} from "../templates"
import {hash} from "../../../utilities"

import {Component} from "../../_"
import {fetchSourceFacts, SourceFacts} from "../facts"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Repository information
 */
export interface Source {
  facts: SourceFacts                   /* Repository facts */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Repository facts observable
 */
let fetch$: Observable<Source>

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch repository information
 *
 * This function will try to read the repository facts from session storage,
 * and if unsuccessful, fetch them from the underlying provider.
 *
 * @param el - Repository information element
 *
 * @returns Repository information observable
 */
export function watchSource(
  el: HTMLAnchorElement
): Observable<Source> {
  debugger;
  const digest = hash(el.href).toString()

  /* Fetch repository facts once */
  fetch$ = defer(() => {
    const data = sessionStorage.getItem(digest)
    if (data) {
      return of(JSON.parse(data))
    } else {
      const value$ = fetchSourceFacts(el.href)
      value$.subscribe(value => {
        try {
          sessionStorage.setItem(digest, JSON.stringify(value))
        } catch (err) {
          /* Uncritical, just swallow */
        }
      })

      /* Return value */
      return value$
    }
  })
    .pipe(
      catchError(() => NEVER),
      filter(facts => facts.length > 0),
      map(facts => ({facts})),
      shareReplay(1)
    )

  return fetch$;
}

/**
 * Mount repository information
 *
 * @param el - Repository information element
 *
 * @returns Repository information component observable
 */
export function mountSource(
  el: HTMLAnchorElement
): Observable<Component<Source>> {
  const internal$ = new Subject<Source>()
  internal$.subscribe(({facts}) => {
    setSourceFacts(el, renderSourceFacts(facts))
    setSourceState(el, "done")
  })

  /* Create and return component */
  return watchSource(el)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ref: el, ...state}))
    )
}
