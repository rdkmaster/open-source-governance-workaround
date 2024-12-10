import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarComponent } from './perfect-scrollbar.component';
import { PerfectScrollbarDirective } from './perfect-scrollbar.directive';
import { ForceNativeScrollDirective } from './perfect-scrollbar-force-native-scroll.directive';
import * as i0 from "@angular/core";
export class PerfectScrollbarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PerfectScrollbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: PerfectScrollbarModule, declarations: [PerfectScrollbarComponent, PerfectScrollbarDirective, ForceNativeScrollDirective], imports: [CommonModule], exports: [CommonModule, PerfectScrollbarComponent, PerfectScrollbarDirective, ForceNativeScrollDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PerfectScrollbarModule, imports: [CommonModule, CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PerfectScrollbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [PerfectScrollbarComponent, PerfectScrollbarDirective, ForceNativeScrollDirective],
                    exports: [CommonModule, PerfectScrollbarComponent, PerfectScrollbarDirective, ForceNativeScrollDirective]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZmVjdC1zY3JvbGxiYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbGliL3NyYy9saWIvcGVyZmVjdC1zY3JvbGxiYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDOztBQU8vRixNQUFNLE9BQU8sc0JBQXNCO3dHQUF0QixzQkFBc0I7eUdBQXRCLHNCQUFzQixpQkFIaEIseUJBQXlCLEVBQUUseUJBQXlCLEVBQUUsMEJBQTBCLGFBRHJGLFlBQVksYUFFWixZQUFZLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLEVBQUUsMEJBQTBCO3lHQUUvRixzQkFBc0IsWUFKckIsWUFBWSxFQUVaLFlBQVk7OzRGQUViLHNCQUFzQjtrQkFMbEMsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRSxDQUFDLHlCQUF5QixFQUFFLHlCQUF5QixFQUFFLDBCQUEwQixDQUFDO29CQUNoRyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLEVBQUUsMEJBQTBCLENBQUM7aUJBQzVHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFBlcmZlY3RTY3JvbGxiYXJDb21wb25lbnQgfSBmcm9tICcuL3BlcmZlY3Qtc2Nyb2xsYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQZXJmZWN0U2Nyb2xsYmFyRGlyZWN0aXZlIH0gZnJvbSAnLi9wZXJmZWN0LXNjcm9sbGJhci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRm9yY2VOYXRpdmVTY3JvbGxEaXJlY3RpdmUgfSBmcm9tICcuL3BlcmZlY3Qtc2Nyb2xsYmFyLWZvcmNlLW5hdGl2ZS1zY3JvbGwuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtQZXJmZWN0U2Nyb2xsYmFyQ29tcG9uZW50LCBQZXJmZWN0U2Nyb2xsYmFyRGlyZWN0aXZlLCBGb3JjZU5hdGl2ZVNjcm9sbERpcmVjdGl2ZV0sXG4gICAgZXhwb3J0czogW0NvbW1vbk1vZHVsZSwgUGVyZmVjdFNjcm9sbGJhckNvbXBvbmVudCwgUGVyZmVjdFNjcm9sbGJhckRpcmVjdGl2ZSwgRm9yY2VOYXRpdmVTY3JvbGxEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIFBlcmZlY3RTY3JvbGxiYXJNb2R1bGUge1xufVxuIl19