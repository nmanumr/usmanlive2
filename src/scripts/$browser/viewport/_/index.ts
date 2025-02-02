/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import { Observable, combineLatest } from "rxjs"
import {
  distinctUntilKeyChanged,
  map,
  shareReplay,
} from "rxjs/operators"

import {
  ViewportOffset,
  watchViewportOffset
} from "../offset"
import {
  ViewportSize,
  watchViewportSize
} from "../size"
import {ElementSize, watchElementSize} from "../../element/size";
import {getElementOrThrow} from "../../element/_";

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Viewport
 */
export interface Viewport {
  offset: ViewportOffset               /* Viewport offset */
  size: ViewportSize                   /* Viewport size */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch at options
 */
interface WatchAtOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch viewport
 *
 * @returns Viewport observable
 */
export function watchViewport(): Observable<Viewport> {
  return combineLatest([
    watchViewportOffset(),
    watchViewportSize()
  ])
    .pipe(
      map(([offset, size]) => ({ offset, size } as Viewport)),
      shareReplay(1)
    )
}

/**
 * Watch viewport relative to element
 *
 * @param el - Element
 * @param options - Options
 *
 * @returns Viewport observable
 */
export function watchViewportAt(
  el: HTMLElement, { viewport$ }: WatchAtOptions
): Observable<Viewport> {
  const size$ = viewport$
    .pipe(
      distinctUntilKeyChanged("size")
    )

  /* Compute element offset */
  const offset$ = combineLatest([size$])
    .pipe(
      map((): ViewportOffset => ({
        x: el.offsetLeft,
        y: el.offsetTop
      }))
    )

  const $headerSize = watchElementSize(getElementOrThrow(`[data-md-component=header]`));

  /* Compute relative viewport, return hot observable */
  return (combineLatest([viewport$, offset$, $headerSize]) as Observable<[Viewport, ViewportOffset, ElementSize]>)
    .pipe(
      map(([{ offset, size }, { x, y }, {height}]) => ({
        offset: {
          x: offset.x - x,
          y: offset.y - y + height
        },
        size
      })),
    )
}
