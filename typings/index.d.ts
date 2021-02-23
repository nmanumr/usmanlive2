import { Observable, Subject } from "rxjs"
import { Keyboard, Viewport } from "../src/scripts/$browser"
import { Component } from "../src/scripts/components"

declare global {
    interface Window {
        document$: Observable<Document>    /* Document observable */
        location$: Subject<URL>            /* Location subject */
        target$: Observable<HTMLElement>   /* Location target observable */
        keyboard$: Observable<Keyboard>    /* Keyboard observable */
        viewport$: Observable<Viewport>    /* Viewport obsevable */
        tablet$: Observable<boolean>       /* Tablet breakpoint observable */
        screen$: Observable<boolean>       /* Screen breakpoint observable */
        print$: Observable<void>           /* Print mode observable */
        alert$: Subject<string>            /* Alert subject */
        component$: Observable<Component>  /* Component observable */
    }
}
