import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
export class ForceNativeScrollDirective {
    renderer;
    constructor(renderer, el) {
        this.renderer = renderer;
        ['ps__child', 'ps__child--consume'].forEach((className) => {
            this.renderer.addClass(el?.nativeElement, className);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ForceNativeScrollDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: ForceNativeScrollDirective, selector: "[forceNativeScrolling]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ForceNativeScrollDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[forceNativeScrolling]'
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZmVjdC1zY3JvbGxiYXItZm9yY2UtbmF0aXZlLXNjcm9sbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9saWIvc3JjL2xpYi9wZXJmZWN0LXNjcm9sbGJhci1mb3JjZS1uYXRpdmUtc2Nyb2xsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUF5QixNQUFNLGVBQWUsQ0FBQzs7QUFLakUsTUFBTSxPQUFPLDBCQUEwQjtJQUVqQjtJQUFwQixZQUFvQixRQUFtQixFQUFFLEVBQWM7UUFBbkMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNyQyxDQUFDLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO3dHQU5VLDBCQUEwQjs0RkFBMUIsMEJBQTBCOzs0RkFBMUIsMEJBQTBCO2tCQUh0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7aUJBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2ZvcmNlTmF0aXZlU2Nyb2xsaW5nXSdcbn0pXG5leHBvcnQgY2xhc3MgRm9yY2VOYXRpdmVTY3JvbGxEaXJlY3RpdmUge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBbJ3BzX19jaGlsZCcsICdwc19fY2hpbGQtLWNvbnN1bWUnXS5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWw/Lm5hdGl2ZUVsZW1lbnQsIGNsYXNzTmFtZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==