/**
 * by lijie
 * 
 */
declare module EventManager {
    function subscribe(type: any, fn: Function): any
    function publish(type: any, ...data): any
}