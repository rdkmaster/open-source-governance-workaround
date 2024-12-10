import PerfectScrollbar from '@rdkmaster/perfect-scrollbar';
import ResizeObserver from '@rdkmaster/resize-observer-polyfill';
import { Subject, fromEvent } from 'rxjs';
import { auditTime, takeUntil } from 'rxjs/operators';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Optional, Directive, Input, Output, EventEmitter } from '@angular/core';
import { Geometry, Position } from './perfect-scrollbar.interfaces';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfig, PerfectScrollbarEvents } from './perfect-scrollbar.interfaces';
import * as i0 from "@angular/core";
export class PerfectScrollbarDirective {
    zone;
    differs;
    elementRef;
    platformId;
    defaults;
    instance = null;
    ro = null;
    timeout = null;
    animation = null;
    configDiff = null;
    ngDestroy = new Subject();
    disabled = false;
    config;
    psScrollY = new EventEmitter();
    psScrollX = new EventEmitter();
    psScrollUp = new EventEmitter();
    psScrollDown = new EventEmitter();
    psScrollLeft = new EventEmitter();
    psScrollRight = new EventEmitter();
    psYReachEnd = new EventEmitter();
    psYReachStart = new EventEmitter();
    psXReachEnd = new EventEmitter();
    psXReachStart = new EventEmitter();
    constructor(zone, differs, elementRef, platformId, defaults) {
        this.zone = zone;
        this.differs = differs;
        this.elementRef = elementRef;
        this.platformId = platformId;
        this.defaults = defaults;
    }
    ngOnInit() {
        if (!this.disabled && isPlatformBrowser(this.platformId)) {
            const config = new PerfectScrollbarConfig(this.defaults);
            config.assign(this.config); // Custom configuration
            this.zone.runOutsideAngular(() => {
                this.instance = new PerfectScrollbar(this.elementRef.nativeElement, config);
            });
            if (!this.configDiff) {
                this.configDiff = this.differs.find(this.config || {}).create();
                this.configDiff.diff(this.config || {});
            }
            this.zone.runOutsideAngular(() => {
                this.ro = new ResizeObserver(() => {
                    this.update();
                });
                if (this.elementRef.nativeElement.children[0]) {
                    this.ro.observe(this.elementRef.nativeElement.children[0]);
                }
                this.ro.observe(this.elementRef.nativeElement);
            });
            this.zone.runOutsideAngular(() => {
                PerfectScrollbarEvents.forEach((eventName) => {
                    const eventType = eventName.replace(/([A-Z])/g, (c) => `-${c.toLowerCase()}`);
                    fromEvent(this.elementRef.nativeElement, eventType)
                        .pipe(auditTime(20), takeUntil(this.ngDestroy))
                        .subscribe((event) => {
                        this[eventName].emit(event);
                    });
                });
            });
        }
    }
    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            this.ngDestroy.next();
            this.ngDestroy.complete();
            if (this.ro) {
                this.ro.disconnect();
            }
            if (this.timeout && typeof window !== 'undefined') {
                window.clearTimeout(this.timeout);
            }
            this.zone.runOutsideAngular(() => {
                if (this.instance) {
                    this.instance.destroy();
                }
            });
            this.instance = null;
        }
    }
    ngDoCheck() {
        if (!this.disabled && this.configDiff && isPlatformBrowser(this.platformId)) {
            const changes = this.configDiff.diff(this.config || {});
            if (changes) {
                this.ngOnDestroy();
                this.ngOnInit();
            }
        }
    }
    ngOnChanges(changes) {
        if (changes['disabled'] && !changes['disabled'].isFirstChange() && isPlatformBrowser(this.platformId)) {
            if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
                if (changes['disabled'].currentValue === true) {
                    this.ngOnDestroy();
                }
                else if (changes['disabled'].currentValue === false) {
                    this.ngOnInit();
                }
            }
        }
    }
    ps() {
        return this.instance;
    }
    update() {
        if (typeof window !== 'undefined') {
            if (this.timeout) {
                window.clearTimeout(this.timeout);
            }
            this.timeout = window.setTimeout(() => {
                if (!this.disabled && this.configDiff) {
                    try {
                        this.zone.runOutsideAngular(() => {
                            if (this.instance) {
                                this.instance.update();
                            }
                        });
                    }
                    catch (error) {
                        // Update can be finished after destroy so catch errors
                    }
                }
            }, 0);
        }
    }
    geometry(prefix = 'scroll') {
        return new Geometry(this.elementRef.nativeElement[prefix + 'Left'], this.elementRef.nativeElement[prefix + 'Top'], this.elementRef.nativeElement[prefix + 'Width'], this.elementRef.nativeElement[prefix + 'Height']);
    }
    position(absolute = false) {
        if (!absolute && this.instance) {
            return new Position(this.instance.reach.x || 0, this.instance.reach.y || 0);
        }
        else {
            return new Position(this.elementRef.nativeElement.scrollLeft, this.elementRef.nativeElement.scrollTop);
        }
    }
    scrollable(direction = 'any') {
        const element = this.elementRef.nativeElement;
        if (direction === 'any') {
            return element.classList.contains('ps--active-x') ||
                element.classList.contains('ps--active-y');
        }
        else if (direction === 'both') {
            return element.classList.contains('ps--active-x') &&
                element.classList.contains('ps--active-y');
        }
        else {
            return element.classList.contains('ps--active-' + direction);
        }
    }
    scrollTo(x, y, speed) {
        if (!this.disabled) {
            if (y == null && speed == null) {
                this.animateScrolling('scrollTop', x, speed);
            }
            else {
                if (x != null) {
                    this.animateScrolling('scrollLeft', x, speed);
                }
                if (y != null) {
                    this.animateScrolling('scrollTop', y, speed);
                }
            }
        }
    }
    scrollToX(x, speed) {
        this.animateScrolling('scrollLeft', x, speed);
    }
    scrollToY(y, speed) {
        this.animateScrolling('scrollTop', y, speed);
    }
    scrollToTop(offset, speed) {
        this.animateScrolling('scrollTop', (offset || 0), speed);
    }
    scrollToLeft(offset, speed) {
        this.animateScrolling('scrollLeft', (offset || 0), speed);
    }
    scrollToRight(offset, speed) {
        const left = this.elementRef.nativeElement.scrollWidth -
            this.elementRef.nativeElement.clientWidth;
        this.animateScrolling('scrollLeft', left - (offset || 0), speed);
    }
    scrollToBottom(offset, speed) {
        const top = this.elementRef.nativeElement.scrollHeight -
            this.elementRef.nativeElement.clientHeight;
        this.animateScrolling('scrollTop', top - (offset || 0), speed);
    }
    scrollToElement(element, offset, speed) {
        if (typeof element === 'string') {
            element = this.elementRef.nativeElement.querySelector(element);
        }
        if (element) {
            const elementPos = element.getBoundingClientRect();
            const scrollerPos = this.elementRef.nativeElement.getBoundingClientRect();
            if (this.elementRef.nativeElement.classList.contains('ps--active-x')) {
                const currentPos = this.elementRef.nativeElement['scrollLeft'];
                const position = elementPos.left - scrollerPos.left + currentPos;
                this.animateScrolling('scrollLeft', position + (offset || 0), speed);
            }
            if (this.elementRef.nativeElement.classList.contains('ps--active-y')) {
                const currentPos = this.elementRef.nativeElement['scrollTop'];
                const position = elementPos.top - scrollerPos.top + currentPos;
                this.animateScrolling('scrollTop', position + (offset || 0), speed);
            }
        }
    }
    animateScrolling(target, value, speed) {
        if (this.animation) {
            window.cancelAnimationFrame(this.animation);
            this.animation = null;
        }
        if (!speed || typeof window === 'undefined') {
            this.elementRef.nativeElement[target] = value;
        }
        else if (value !== this.elementRef.nativeElement[target]) {
            let newValue = 0;
            let scrollCount = 0;
            let oldTimestamp = performance.now();
            let oldValue = this.elementRef.nativeElement[target];
            const cosParameter = (oldValue - value) / 2;
            const step = (newTimestamp) => {
                scrollCount += Math.PI / (speed / (newTimestamp - oldTimestamp));
                newValue = Math.round(value + cosParameter + cosParameter * Math.cos(scrollCount));
                // Only continue animation if scroll position has not changed
                if (this.elementRef.nativeElement[target] === oldValue) {
                    if (scrollCount >= Math.PI) {
                        this.animateScrolling(target, value, 0);
                    }
                    else {
                        this.elementRef.nativeElement[target] = newValue;
                        // On a zoomed out page the resulting offset may differ
                        oldValue = this.elementRef.nativeElement[target];
                        oldTimestamp = newTimestamp;
                        this.animation = window.requestAnimationFrame(step);
                    }
                }
            };
            window.requestAnimationFrame(step);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PerfectScrollbarDirective, deps: [{ token: i0.NgZone }, { token: i0.KeyValueDiffers }, { token: i0.ElementRef }, { token: PLATFORM_ID }, { token: PERFECT_SCROLLBAR_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: PerfectScrollbarDirective, selector: "[perfectScrollbar]", inputs: { disabled: "disabled", config: ["perfectScrollbar", "config"] }, outputs: { psScrollY: "psScrollY", psScrollX: "psScrollX", psScrollUp: "psScrollUp", psScrollDown: "psScrollDown", psScrollLeft: "psScrollLeft", psScrollRight: "psScrollRight", psYReachEnd: "psYReachEnd", psYReachStart: "psYReachStart", psXReachEnd: "psXReachEnd", psXReachStart: "psXReachStart" }, exportAs: ["ngxPerfectScrollbar"], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PerfectScrollbarDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[perfectScrollbar]',
                    exportAs: 'ngxPerfectScrollbar'
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.KeyValueDiffers }, { type: i0.ElementRef }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [PERFECT_SCROLLBAR_CONFIG]
                }] }]; }, propDecorators: { disabled: [{
                type: Input
            }], config: [{
                type: Input,
                args: ['perfectScrollbar']
            }], psScrollY: [{
                type: Output
            }], psScrollX: [{
                type: Output
            }], psScrollUp: [{
                type: Output
            }], psScrollDown: [{
                type: Output
            }], psScrollLeft: [{
                type: Output
            }], psScrollRight: [{
                type: Output
            }], psYReachEnd: [{
                type: Output
            }], psYReachStart: [{
                type: Output
            }], psXReachEnd: [{
                type: Output
            }], psXReachStart: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZmVjdC1zY3JvbGxiYXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbGliL3NyYy9saWIvcGVyZmVjdC1zY3JvbGxiYXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxjQUFjLE1BQU0sMEJBQTBCLENBQUM7QUFFdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBVSxNQUFNLEVBQUUsUUFBUSxFQUFjLFNBQVMsRUFDZixLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVwRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsc0JBQXNCLEVBQ2hDLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7O0FBTXhGLE1BQU0sT0FBTyx5QkFBeUI7SUE2QmhCO0lBQXNCO0lBQ2pDO0lBQXFEO0lBQ047SUE5QmhELFFBQVEsR0FBNEIsSUFBSSxDQUFDO0lBRXpDLEVBQUUsR0FBMEIsSUFBSSxDQUFDO0lBRWpDLE9BQU8sR0FBa0IsSUFBSSxDQUFDO0lBQzlCLFNBQVMsR0FBa0IsSUFBSSxDQUFDO0lBRWhDLFVBQVUsR0FBdUMsSUFBSSxDQUFDO0lBRTdDLFNBQVMsR0FBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUVqRCxRQUFRLEdBQVksS0FBSyxDQUFDO0lBRVIs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QkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUVHLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGVyZmVjdFNjcm9sbGJhciBmcm9tICdwZXJmZWN0LXNjcm9sbGJhcic7XG5cbmltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xuXG5pbXBvcnQgeyBTdWJqZWN0LCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGF1ZGl0VGltZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdab25lLCBJbmplY3QsIE9wdGlvbmFsLCBFbGVtZW50UmVmLCBEaXJlY3RpdmUsXG4gIE9uSW5pdCwgRG9DaGVjaywgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcixcbiAgU2ltcGxlQ2hhbmdlcywgS2V5VmFsdWVEaWZmZXIsIEtleVZhbHVlRGlmZmVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBHZW9tZXRyeSwgUG9zaXRpb24gfSBmcm9tICcuL3BlcmZlY3Qtc2Nyb2xsYmFyLmludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBQRVJGRUNUX1NDUk9MTEJBUl9DT05GSUcsIFBlcmZlY3RTY3JvbGxiYXJDb25maWcsIFBlcmZlY3RTY3JvbGxiYXJDb25maWdJbnRlcmZhY2UsXG4gIFBlcmZlY3RTY3JvbGxiYXJFdmVudCwgUGVyZmVjdFNjcm9sbGJhckV2ZW50cyB9IGZyb20gJy4vcGVyZmVjdC1zY3JvbGxiYXIuaW50ZXJmYWNlcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twZXJmZWN0U2Nyb2xsYmFyXScsXG4gIGV4cG9ydEFzOiAnbmd4UGVyZmVjdFNjcm9sbGJhcidcbn0pXG5leHBvcnQgY2xhc3MgUGVyZmVjdFNjcm9sbGJhckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBEb0NoZWNrLCBPbkNoYW5nZXMge1xuICBwcml2YXRlIGluc3RhbmNlOiBQZXJmZWN0U2Nyb2xsYmFyIHwgbnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBybzogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIHRpbWVvdXQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGFuaW1hdGlvbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBjb25maWdEaWZmOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT4gfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIHJlYWRvbmx5IG5nRGVzdHJveTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoJ3BlcmZlY3RTY3JvbGxiYXInKSBjb25maWc/OiBQZXJmZWN0U2Nyb2xsYmFyQ29uZmlnSW50ZXJmYWNlO1xuXG4gIEBPdXRwdXQoKSBwc1Njcm9sbFk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwc1Njcm9sbFg6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIHBzU2Nyb2xsVXA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwc1Njcm9sbERvd246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwc1Njcm9sbExlZnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwc1Njcm9sbFJpZ2h0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBwc1lSZWFjaEVuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHBzWVJlYWNoU3RhcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBwc1hSZWFjaEVuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHBzWFJlYWNoU3RhcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFBFUkZFQ1RfU0NST0xMQkFSX0NPTkZJRykgcHJpdmF0ZSBkZWZhdWx0czogUGVyZmVjdFNjcm9sbGJhckNvbmZpZ0ludGVyZmFjZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3QgY29uZmlnID0gbmV3IFBlcmZlY3RTY3JvbGxiYXJDb25maWcodGhpcy5kZWZhdWx0cyk7XG5cbiAgICAgIGNvbmZpZy5hc3NpZ24odGhpcy5jb25maWcpOyAvLyBDdXN0b20gY29uZmlndXJhdGlvblxuXG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IFBlcmZlY3RTY3JvbGxiYXIodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKCF0aGlzLmNvbmZpZ0RpZmYpIHtcbiAgICAgICAgdGhpcy5jb25maWdEaWZmID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5jb25maWcgfHwge30pLmNyZWF0ZSgpO1xuXG4gICAgICAgIHRoaXMuY29uZmlnRGlmZi5kaWZmKHRoaXMuY29uZmlnIHx8IHt9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5ybyA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdKSB7XG4gICAgICAgICAgdGhpcy5yby5vYnNlcnZlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucm8ub2JzZXJ2ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgUGVyZmVjdFNjcm9sbGJhckV2ZW50cy5mb3JFYWNoKChldmVudE5hbWU6IFBlcmZlY3RTY3JvbGxiYXJFdmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGV2ZW50VHlwZSA9IGV2ZW50TmFtZS5yZXBsYWNlKC8oW0EtWl0pL2csIChjKSA9PiBgLSR7Yy50b0xvd2VyQ2FzZSgpfWApO1xuXG4gICAgICAgICAgZnJvbUV2ZW50PEV2ZW50Pih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZXZlbnRUeXBlKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGF1ZGl0VGltZSgyMCksXG4gICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzW2V2ZW50TmFtZV0uZW1pdChldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5uZ0Rlc3Ryb3kubmV4dCgpO1xuICAgICAgdGhpcy5uZ0Rlc3Ryb3kuY29tcGxldGUoKTtcblxuICAgICAgaWYgKHRoaXMucm8pIHtcbiAgICAgICAgdGhpcy5yby5kaXNjb25uZWN0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnRpbWVvdXQgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xuICAgICAgICAgIHRoaXMuaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5pbnN0YW5jZSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmNvbmZpZ0RpZmYgJiYgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuY29uZmlnRGlmZi5kaWZmKHRoaXMuY29uZmlnIHx8IHt9KTtcblxuICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuXG4gICAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2Rpc2FibGVkJ10gJiYgIWNoYW5nZXNbJ2Rpc2FibGVkJ10uaXNGaXJzdENoYW5nZSgpICYmIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGlmIChjaGFuZ2VzWydkaXNhYmxlZCddLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlc1snZGlzYWJsZWQnXS5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzWydkaXNhYmxlZCddLmN1cnJlbnRWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGNoYW5nZXNbJ2Rpc2FibGVkJ10uY3VycmVudFZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwcygpOiBQZXJmZWN0U2Nyb2xsYmFyIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmIHRoaXMuY29uZmlnRGlmZikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UudXBkYXRlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgY2FuIGJlIGZpbmlzaGVkIGFmdGVyIGRlc3Ryb3kgc28gY2F0Y2ggZXJyb3JzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2VvbWV0cnkocHJlZml4OiBzdHJpbmcgPSAnc2Nyb2xsJyk6IEdlb21ldHJ5IHtcbiAgICByZXR1cm4gbmV3IEdlb21ldHJ5KFxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbcHJlZml4ICsgJ0xlZnQnXSxcbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3ByZWZpeCArICdUb3AnXSxcbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3ByZWZpeCArICdXaWR0aCddLFxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbcHJlZml4ICsgJ0hlaWdodCddXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBwb3NpdGlvbihhYnNvbHV0ZTogYm9vbGVhbiA9IGZhbHNlKTogUG9zaXRpb24ge1xuICAgIGlmICghYWJzb2x1dGUgJiYgdGhpcy5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIG5ldyBQb3NpdGlvbihcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5yZWFjaC54IHx8IDAsXG4gICAgICAgIHRoaXMuaW5zdGFuY2UucmVhY2gueSB8fCAwXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFBvc2l0aW9uKFxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxUb3BcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNjcm9sbGFibGUoZGlyZWN0aW9uOiBzdHJpbmcgPSAnYW55Jyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdhbnknKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3BzLS1hY3RpdmUteCcpIHx8XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcy0tYWN0aXZlLXknKTtcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2JvdGgnKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3BzLS1hY3RpdmUteCcpICYmXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcy0tYWN0aXZlLXknKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcy0tYWN0aXZlLScgKyBkaXJlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzY3JvbGxUbyh4OiBudW1iZXIsIHk/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICBpZiAoeSA9PSBudWxsICYmIHNwZWVkID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5hbmltYXRlU2Nyb2xsaW5nKCdzY3JvbGxUb3AnLCB4LCBzcGVlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoeCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRlU2Nyb2xsaW5nKCdzY3JvbGxMZWZ0JywgeCwgc3BlZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHkgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZVNjcm9sbGluZygnc2Nyb2xsVG9wJywgeSwgc3BlZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNjcm9sbFRvWCh4OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5hbmltYXRlU2Nyb2xsaW5nKCdzY3JvbGxMZWZ0JywgeCwgc3BlZWQpO1xuICB9XG5cbiAgcHVibGljIHNjcm9sbFRvWSh5OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5hbmltYXRlU2Nyb2xsaW5nKCdzY3JvbGxUb3AnLCB5LCBzcGVlZCk7XG4gIH1cblxuICBwdWJsaWMgc2Nyb2xsVG9Ub3Aob2Zmc2V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuYW5pbWF0ZVNjcm9sbGluZygnc2Nyb2xsVG9wJywgKG9mZnNldCB8fCAwKSwgc3BlZWQpO1xuICB9XG5cbiAgcHVibGljIHNjcm9sbFRvTGVmdChvZmZzZXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5hbmltYXRlU2Nyb2xsaW5nKCdzY3JvbGxMZWZ0JywgKG9mZnNldCB8fCAwKSwgc3BlZWQpO1xuICB9XG5cbiAgcHVibGljIHNjcm9sbFRvUmlnaHQob2Zmc2V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGxlZnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aCAtXG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgIHRoaXMuYW5pbWF0ZVNjcm9sbGluZygnc2Nyb2xsTGVmdCcsIGxlZnQgLSAob2Zmc2V0IHx8IDApLCBzcGVlZCk7XG4gIH1cblxuICBwdWJsaWMgc2Nyb2xsVG9Cb3R0b20ob2Zmc2V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHRvcCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCAtXG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICB0aGlzLmFuaW1hdGVTY3JvbGxpbmcoJ3Njcm9sbFRvcCcsIHRvcCAtIChvZmZzZXQgfHwgMCksIHNwZWVkKTtcbiAgfVxuXG4gIHB1YmxpYyBzY3JvbGxUb0VsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQgfCBzdHJpbmcsIG9mZnNldD86IG51bWJlciwgc3BlZWQ/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KSBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgY29uc3QgZWxlbWVudFBvcyA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgIGNvbnN0IHNjcm9sbGVyUG9zID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgIGlmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3BzLS1hY3RpdmUteCcpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQb3MgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFsnc2Nyb2xsTGVmdCddO1xuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZWxlbWVudFBvcy5sZWZ0IC0gc2Nyb2xsZXJQb3MubGVmdCArIGN1cnJlbnRQb3M7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlU2Nyb2xsaW5nKCdzY3JvbGxMZWZ0JywgcG9zaXRpb24gKyAob2Zmc2V0IHx8IDApLCBzcGVlZCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3BzLS1hY3RpdmUteScpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQb3MgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFsnc2Nyb2xsVG9wJ107XG5cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBlbGVtZW50UG9zLnRvcCAtIHNjcm9sbGVyUG9zLnRvcCArIGN1cnJlbnRQb3M7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlU2Nyb2xsaW5nKCdzY3JvbGxUb3AnLCBwb3NpdGlvbiArIChvZmZzZXQgfHwgMCksIHNwZWVkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGVTY3JvbGxpbmcodGFyZ2V0OiBzdHJpbmcsIHZhbHVlOiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb24pO1xuXG4gICAgICB0aGlzLmFuaW1hdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFzcGVlZCB8fCB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbdGFyZ2V0XSA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3RhcmdldF0pIHtcbiAgICAgIGxldCBuZXdWYWx1ZSA9IDA7XG4gICAgICBsZXQgc2Nyb2xsQ291bnQgPSAwO1xuXG4gICAgICBsZXQgb2xkVGltZXN0YW1wID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFt0YXJnZXRdO1xuXG4gICAgICBjb25zdCBjb3NQYXJhbWV0ZXIgPSAob2xkVmFsdWUgLSB2YWx1ZSkgLyAyO1xuXG4gICAgICBjb25zdCBzdGVwID0gKG5ld1RpbWVzdGFtcDogbnVtYmVyKSA9PiB7XG4gICAgICAgIHNjcm9sbENvdW50ICs9IE1hdGguUEkgLyAoc3BlZWQgLyAobmV3VGltZXN0YW1wIC0gb2xkVGltZXN0YW1wKSk7XG5cbiAgICAgICAgbmV3VmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlICsgY29zUGFyYW1ldGVyICsgY29zUGFyYW1ldGVyICogTWF0aC5jb3Moc2Nyb2xsQ291bnQpKTtcblxuICAgICAgICAvLyBPbmx5IGNvbnRpbnVlIGFuaW1hdGlvbiBpZiBzY3JvbGwgcG9zaXRpb24gaGFzIG5vdCBjaGFuZ2VkXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFt0YXJnZXRdID09PSBvbGRWYWx1ZSkge1xuICAgICAgICAgIGlmIChzY3JvbGxDb3VudCA+PSBNYXRoLlBJKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGVTY3JvbGxpbmcodGFyZ2V0LCB2YWx1ZSwgMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3RhcmdldF0gPSBuZXdWYWx1ZTtcblxuICAgICAgICAgICAgLy8gT24gYSB6b29tZWQgb3V0IHBhZ2UgdGhlIHJlc3VsdGluZyBvZmZzZXQgbWF5IGRpZmZlclxuICAgICAgICAgICAgb2xkVmFsdWUgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFt0YXJnZXRdO1xuXG4gICAgICAgICAgICBvbGRUaW1lc3RhbXAgPSBuZXdUaW1lc3RhbXA7XG5cbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgfVxuICB9XG59XG4iXX0=