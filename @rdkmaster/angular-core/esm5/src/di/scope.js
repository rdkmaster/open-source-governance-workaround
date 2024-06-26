/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from './injection_token';
/**
 * An internal token whose presence in an injector indicates that the injector should treat itself
 * as a root scoped injector when processing requests for unknown tokens which may indicate
 * they are provided in the root scope.
 */
export var INJECTOR_SCOPE = new InjectionToken('Set Injector scope.');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9zY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFHakQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxJQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBeUIscUJBQXFCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbn0gZnJvbSAnLi9pbmplY3Rpb25fdG9rZW4nO1xuXG5cbi8qKlxuICogQW4gaW50ZXJuYWwgdG9rZW4gd2hvc2UgcHJlc2VuY2UgaW4gYW4gaW5qZWN0b3IgaW5kaWNhdGVzIHRoYXQgdGhlIGluamVjdG9yIHNob3VsZCB0cmVhdCBpdHNlbGZcbiAqIGFzIGEgcm9vdCBzY29wZWQgaW5qZWN0b3Igd2hlbiBwcm9jZXNzaW5nIHJlcXVlc3RzIGZvciB1bmtub3duIHRva2VucyB3aGljaCBtYXkgaW5kaWNhdGVcbiAqIHRoZXkgYXJlIHByb3ZpZGVkIGluIHRoZSByb290IHNjb3BlLlxuICovXG5leHBvcnQgY29uc3QgSU5KRUNUT1JfU0NPUEUgPSBuZXcgSW5qZWN0aW9uVG9rZW48J3Jvb3QnfCdwbGF0Zm9ybSd8bnVsbD4oJ1NldCBJbmplY3RvciBzY29wZS4nKTtcbiJdfQ==