/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TYPE } from './container';
import { FLAGS } from './view';
/**
 * True if `value` is `LView`.
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
export function isLView(value) {
    return Array.isArray(value) && typeof value[TYPE] === 'object';
}
/**
 * True if `value` is `LContainer`.
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
export function isLContainer(value) {
    return Array.isArray(value) && value[TYPE] === true;
}
export function isContentQueryHost(tNode) {
    return (tNode.flags & 8 /* hasContentQuery */) !== 0;
}
export function isComponentHost(tNode) {
    return (tNode.flags & 2 /* isComponentHost */) === 2 /* isComponentHost */;
}
export function isDirectiveHost(tNode) {
    return (tNode.flags & 1 /* isDirectiveHost */) === 1 /* isDirectiveHost */;
}
export function isComponentDef(def) {
    return def.template !== null;
}
export function isRootView(target) {
    return (target[FLAGS] & 512 /* IsRoot */) !== 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZV9jaGVja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ludGVyZmFjZXMvdHlwZV9jaGVja3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBSUgsT0FBTyxFQUFhLElBQUksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUc3QyxPQUFPLEVBQUMsS0FBSyxFQUFvQixNQUFNLFFBQVEsQ0FBQztBQUdoRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsT0FBTyxDQUFDLEtBQXFDO0lBQzNELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxRQUFRLENBQUM7QUFDakUsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsS0FBcUM7SUFDaEUsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDdEQsQ0FBQztBQUVELE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxLQUFZO0lBQzdDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSywwQkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxLQUFZO0lBQzFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSywwQkFBNkIsQ0FBQyw0QkFBK0IsQ0FBQztBQUNuRixDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxLQUFZO0lBQzFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSywwQkFBNkIsQ0FBQyw0QkFBK0IsQ0FBQztBQUNuRixDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBSSxHQUFvQjtJQUNwRCxPQUFRLEdBQXVCLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQztBQUNwRCxDQUFDO0FBRUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxNQUFhO0lBQ3RDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25ELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50RGVmLCBEaXJlY3RpdmVEZWZ9IGZyb20gJy4uJztcblxuaW1wb3J0IHtMQ29udGFpbmVyLCBUWVBFfSBmcm9tICcuL2NvbnRhaW5lcic7XG5pbXBvcnQge1ROb2RlLCBUTm9kZUZsYWdzfSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtSTm9kZX0gZnJvbSAnLi9yZW5kZXJlcic7XG5pbXBvcnQge0ZMQUdTLCBMVmlldywgTFZpZXdGbGFnc30gZnJvbSAnLi92aWV3JztcblxuXG4vKipcbiAqIFRydWUgaWYgYHZhbHVlYCBpcyBgTFZpZXdgLlxuICogQHBhcmFtIHZhbHVlIHdyYXBwZWQgdmFsdWUgb2YgYFJOb2RlYCwgYExWaWV3YCwgYExDb250YWluZXJgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0xWaWV3KHZhbHVlOiBSTm9kZXxMVmlld3xMQ29udGFpbmVyfHt9fG51bGwpOiB2YWx1ZSBpcyBMVmlldyB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB0eXBlb2YgdmFsdWVbVFlQRV0gPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIFRydWUgaWYgYHZhbHVlYCBpcyBgTENvbnRhaW5lcmAuXG4gKiBAcGFyYW0gdmFsdWUgd3JhcHBlZCB2YWx1ZSBvZiBgUk5vZGVgLCBgTFZpZXdgLCBgTENvbnRhaW5lcmBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTENvbnRhaW5lcih2YWx1ZTogUk5vZGV8TFZpZXd8TENvbnRhaW5lcnx7fXxudWxsKTogdmFsdWUgaXMgTENvbnRhaW5lciB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZVtUWVBFXSA9PT0gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29udGVudFF1ZXJ5SG9zdCh0Tm9kZTogVE5vZGUpOiBib29sZWFuIHtcbiAgcmV0dXJuICh0Tm9kZS5mbGFncyAmIFROb2RlRmxhZ3MuaGFzQ29udGVudFF1ZXJ5KSAhPT0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29tcG9uZW50SG9zdCh0Tm9kZTogVE5vZGUpOiBib29sZWFuIHtcbiAgcmV0dXJuICh0Tm9kZS5mbGFncyAmIFROb2RlRmxhZ3MuaXNDb21wb25lbnRIb3N0KSA9PT0gVE5vZGVGbGFncy5pc0NvbXBvbmVudEhvc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RpcmVjdGl2ZUhvc3QodE5vZGU6IFROb2RlKTogYm9vbGVhbiB7XG4gIHJldHVybiAodE5vZGUuZmxhZ3MgJiBUTm9kZUZsYWdzLmlzRGlyZWN0aXZlSG9zdCkgPT09IFROb2RlRmxhZ3MuaXNEaXJlY3RpdmVIb3N0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb21wb25lbnREZWY8VD4oZGVmOiBEaXJlY3RpdmVEZWY8VD4pOiBkZWYgaXMgQ29tcG9uZW50RGVmPFQ+IHtcbiAgcmV0dXJuIChkZWYgYXMgQ29tcG9uZW50RGVmPFQ+KS50ZW1wbGF0ZSAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUm9vdFZpZXcodGFyZ2V0OiBMVmlldyk6IGJvb2xlYW4ge1xuICByZXR1cm4gKHRhcmdldFtGTEFHU10gJiBMVmlld0ZsYWdzLklzUm9vdCkgIT09IDA7XG59XG4iXX0=