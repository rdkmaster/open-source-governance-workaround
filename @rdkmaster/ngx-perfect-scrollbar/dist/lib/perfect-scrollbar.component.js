/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject, merge, fromEvent } from 'rxjs';
import { mapTo, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgZone, Inject, Component, Input, Output, EventEmitter, HostBinding, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { PerfectScrollbarDirective } from './perfect-scrollbar.directive';
import { PerfectScrollbarEvents } from './perfect-scrollbar.interfaces';
var PerfectScrollbarComponent = /** @class */ (function () {
    function PerfectScrollbarComponent(zone, cdRef, platformId) {
        this.zone = zone;
        this.cdRef = cdRef;
        this.platformId = platformId;
        this.states = {};
        this.indicatorX = false;
        this.indicatorY = false;
        this.interaction = false;
        this.scrollPositionX = 0;
        this.scrollPositionY = 0;
        this.scrollDirectionX = 0;
        this.scrollDirectionY = 0;
        this.usePropagationX = false;
        this.usePropagationY = false;
        this.allowPropagationX = false;
        this.allowPropagationY = false;
        this.stateTimeout = null;
        this.ngDestroy = new Subject();
        this.stateUpdate = new Subject();
        this.disabled = false;
        this.usePSClass = true;
        this.autoPropagation = false;
        this.scrollIndicators = false;
        this.psScrollY = new EventEmitter();
        this.psScrollX = new EventEmitter();
        this.psScrollUp = new EventEmitter();
        this.psScrollDown = new EventEmitter();
        this.psScrollLeft = new EventEmitter();
        this.psScrollRight = new EventEmitter();
        this.psYReachEnd = new EventEmitter();
        this.psYReachStart = new EventEmitter();
        this.psXReachEnd = new EventEmitter();
        this.psXReachStart = new EventEmitter();
    }
    /**
     * @return {?}
     */
    PerfectScrollbarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (isPlatformBrowser(this.platformId)) {
            this.stateUpdate
                .pipe(takeUntil(this.ngDestroy), distinctUntilChanged((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return (a === b && !_this.stateTimeout); })))
                .subscribe((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                if (_this.stateTimeout && typeof window !== 'undefined') {
                    window.clearTimeout(_this.stateTimeout);
                    _this.stateTimeout = null;
                }
                if (state === 'x' || state === 'y') {
                    _this.interaction = false;
                    if (state === 'x') {
                        _this.indicatorX = false;
                        _this.states.left = false;
                        _this.states.right = false;
                        if (_this.autoPropagation && _this.usePropagationX) {
                            _this.allowPropagationX = false;
                        }
                    }
                    else if (state === 'y') {
                        _this.indicatorY = false;
                        _this.states.top = false;
                        _this.states.bottom = false;
                        if (_this.autoPropagation && _this.usePropagationY) {
                            _this.allowPropagationY = false;
                        }
                    }
                }
                else {
                    if (state === 'left' || state === 'right') {
                        _this.states.left = false;
                        _this.states.right = false;
                        _this.states[state] = true;
                        if (_this.autoPropagation && _this.usePropagationX) {
                            _this.indicatorX = true;
                        }
                    }
                    else if (state === 'top' || state === 'bottom') {
                        _this.states.top = false;
                        _this.states.bottom = false;
                        _this.states[state] = true;
                        if (_this.autoPropagation && _this.usePropagationY) {
                            _this.indicatorY = true;
                        }
                    }
                    if (_this.autoPropagation && typeof window !== 'undefined') {
                        _this.stateTimeout = window.setTimeout((/**
                         * @return {?}
                         */
                        function () {
                            _this.indicatorX = false;
                            _this.indicatorY = false;
                            _this.stateTimeout = null;
                            if (_this.interaction && (_this.states.left || _this.states.right)) {
                                _this.allowPropagationX = true;
                            }
                            if (_this.interaction && (_this.states.top || _this.states.bottom)) {
                                _this.allowPropagationY = true;
                            }
                            _this.cdRef.markForCheck();
                        }), 500);
                    }
                }
                _this.cdRef.markForCheck();
                _this.cdRef.detectChanges();
            }));
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                if (_this.directiveRef) {
                    /** @type {?} */
                    var element = _this.directiveRef.elementRef.nativeElement;
                    fromEvent(element, 'wheel')
                        .pipe(takeUntil(_this.ngDestroy))
                        .subscribe((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        if (!_this.disabled && _this.autoPropagation) {
                            /** @type {?} */
                            var scrollDeltaX = event.deltaX;
                            /** @type {?} */
                            var scrollDeltaY = event.deltaY;
                            _this.checkPropagation(event, scrollDeltaX, scrollDeltaY);
                        }
                    }));
                    fromEvent(element, 'touchmove')
                        .pipe(takeUntil(_this.ngDestroy))
                        .subscribe((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        if (!_this.disabled && _this.autoPropagation) {
                            /** @type {?} */
                            var scrollPositionX = event.touches[0].clientX;
                            /** @type {?} */
                            var scrollPositionY = event.touches[0].clientY;
                            /** @type {?} */
                            var scrollDeltaX = scrollPositionX - _this.scrollPositionX;
                            /** @type {?} */
                            var scrollDeltaY = scrollPositionY - _this.scrollPositionY;
                            _this.checkPropagation(event, scrollDeltaX, scrollDeltaY);
                            _this.scrollPositionX = scrollPositionX;
                            _this.scrollPositionY = scrollPositionY;
                        }
                    }));
                    merge(fromEvent(element, 'ps-scroll-x')
                        .pipe(mapTo('x')), fromEvent(element, 'ps-scroll-y')
                        .pipe(mapTo('y')), fromEvent(element, 'ps-x-reach-end')
                        .pipe(mapTo('right')), fromEvent(element, 'ps-y-reach-end')
                        .pipe(mapTo('bottom')), fromEvent(element, 'ps-x-reach-start')
                        .pipe(mapTo('left')), fromEvent(element, 'ps-y-reach-start')
                        .pipe(mapTo('top')))
                        .pipe(takeUntil(_this.ngDestroy))
                        .subscribe((/**
                     * @param {?} state
                     * @return {?}
                     */
                    function (state) {
                        if (!_this.disabled && (_this.autoPropagation || _this.scrollIndicators)) {
                            _this.stateUpdate.next(state);
                        }
                    }));
                }
            }));
            window.setTimeout((/**
             * @return {?}
             */
            function () {
                PerfectScrollbarEvents.forEach((/**
                 * @param {?} eventName
                 * @return {?}
                 */
                function (eventName) {
                    if (_this.directiveRef) {
                        _this.directiveRef[eventName] = _this[eventName];
                    }
                }));
            }), 0);
        }
    };
    /**
     * @return {?}
     */
    PerfectScrollbarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.ngDestroy.next();
            this.ngDestroy.unsubscribe();
            if (this.stateTimeout && typeof window !== 'undefined') {
                window.clearTimeout(this.stateTimeout);
            }
        }
    };
    /**
     * @return {?}
     */
    PerfectScrollbarComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.disabled && this.autoPropagation && this.directiveRef) {
                /** @type {?} */
                var element = this.directiveRef.elementRef.nativeElement;
                this.usePropagationX = element.classList.contains('ps--active-x');
                this.usePropagationY = element.classList.contains('ps--active-y');
            }
        }
    };
    /**
     * @private
     * @param {?} event
     * @param {?} deltaX
     * @param {?} deltaY
     * @return {?}
     */
    PerfectScrollbarComponent.prototype.checkPropagation = /**
     * @private
     * @param {?} event
     * @param {?} deltaX
     * @param {?} deltaY
     * @return {?}
     */
    function (event, deltaX, deltaY) {
        this.interaction = true;
        /** @type {?} */
        var scrollDirectionX = (deltaX < 0) ? -1 : 1;
        /** @type {?} */
        var scrollDirectionY = (deltaY < 0) ? -1 : 1;
        if ((this.usePropagationX && this.usePropagationY) ||
            (this.usePropagationX && (!this.allowPropagationX ||
                (this.scrollDirectionX !== scrollDirectionX))) ||
            (this.usePropagationY && (!this.allowPropagationY ||
                (this.scrollDirectionY !== scrollDirectionY)))) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (!!deltaX) {
            this.scrollDirectionX = scrollDirectionX;
        }
        if (!!deltaY) {
            this.scrollDirectionY = scrollDirectionY;
        }
        this.stateUpdate.next('interaction');
        this.cdRef.detectChanges();
    };
    PerfectScrollbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'perfect-scrollbar',
                    exportAs: 'ngxPerfectScrollbar',
                    template: "<div style=\"position: static;\" [class.ps]=\"usePSClass\" [perfectScrollbar]=\"config\" [disabled]=\"disabled\">\n  <div class=\"ps-content\">\n    <ng-content></ng-content>\n  </div>\n\n  <div *ngIf=\"scrollIndicators\" class=\"ps-overlay\" [class.ps-at-top]=\"states.top\" [class.ps-at-left]=\"states.left\" [class.ps-at-right]=\"states.right\" [class.ps-at-bottom]=\"states.bottom\">\n    <div class=\"ps-indicator-top\" [class.ps-indicator-show]=\"indicatorY && interaction\"></div>\n    <div class=\"ps-indicator-left\" [class.ps-indicator-show]=\"indicatorX && interaction\"></div>\n    <div class=\"ps-indicator-right\" [class.ps-indicator-show]=\"indicatorX && interaction\"></div>\n    <div class=\"ps-indicator-bottom\" [class.ps-indicator-show]=\"indicatorY && interaction\"></div>\n  </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["/*\n  TODO: Remove important flags after this bug if fixed:\n  https://github.com/angular/flex-layout/issues/381\n*/\n\nperfect-scrollbar {\n  position: relative;\n\n  display: block;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n}\n\nperfect-scrollbar[hidden] {\n  display: none;\n}\n\nperfect-scrollbar[fxflex] {\n  display: flex;\n  flex-direction: column;\n  height: auto;\n  min-width: 0;\n  min-height: 0;\n\n  -webkit-box-direction: column;\n  -webkit-box-orient: column;\n}\n\nperfect-scrollbar[fxflex] > .ps {\n  -ms-flex: 1 1 auto;\n\n  flex: 1 1 auto;\n  width: auto;\n  height: auto;\n  min-width: 0;\n  min-height: 0;\n\n  -webkit-box-flex: 1;\n}\n\nperfect-scrollbar[fxlayout] > .ps,\nperfect-scrollbar[fxlayout] > .ps > .ps-content {\n  display: flex;\n\n  -ms-flex: 1 1 auto;\n\n  flex: 1 1 auto;\n  flex-direction: inherit;\n  align-items: inherit;\n  align-content: inherit;\n  justify-content: inherit;\n  width: 100%;\n  height: 100%;\n\n  -webkit-box-align: inherit;\n  -webkit-box-direction: inherit;\n  -webkit-box-flex: 1;\n  -webkit-box-orient: inherit;\n  -webkit-box-pack: inherit;\n}\n\nperfect-scrollbar[fxlayout='row'] > .ps,\nperfect-scrollbar[fxlayout='row'] > .ps > .ps-content, {\n  flex-direction: row !important;\n\n  -webkit-box-direction: row !important;\n  -webkit-box-orient: row !important;\n}\n\nperfect-scrollbar[fxlayout='column'] > .ps,\nperfect-scrollbar[fxlayout='column'] > .ps > .ps-content {\n  flex-direction: column !important;\n\n  -webkit-box-direction: column !important;\n  -webkit-box-orient: column !important;\n}\n\nperfect-scrollbar > .ps {\n  position: static;\n\n  display: block;\n  width: inherit;\n  height: inherit;\n  max-width: inherit;\n  max-height: inherit;\n}\n\nperfect-scrollbar > .ps textarea {\n  -ms-overflow-style: scrollbar;\n}\n\nperfect-scrollbar > .ps > .ps-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n\n  display: block;\n  overflow: hidden;\n\n  pointer-events: none;\n}\n\nperfect-scrollbar > .ps > .ps-overlay .ps-indicator-top,\nperfect-scrollbar > .ps > .ps-overlay .ps-indicator-left,\nperfect-scrollbar > .ps > .ps-overlay .ps-indicator-right,\nperfect-scrollbar > .ps > .ps-overlay .ps-indicator-bottom {\n  position: absolute;\n\n  opacity: 0;\n\n  transition: opacity 300ms ease-in-out;\n}\n\nperfect-scrollbar > .ps > .ps-overlay .ps-indicator-top,\nperfect-scrollbar > .ps > .ps-overlay .ps-indicator-bottom {\n  left: 0;\n\n  min-width: 100%;\n  min-height: 24px;\n}\n\nperfect-scrollbar > .ps > .ps-overlay .ps-indicator-left,\nperfect-scrollbar > .ps > .ps-overlay .ps-indicator-right {\n  top: 0;\n\n  min-width: 24px;\n  min-height: 100%;\n}\n\nperfect-scrollbar > .ps > .ps-overlay .ps-indicator-top {\n  top: 0;\n}\n\nperfect-scrollbar > .ps > .ps-overlay .ps-indicator-left {\n  left: 0;\n}\n\nperfect-scrollbar > .ps > .ps-overlay .ps-indicator-right {\n  right: 0;\n}\n\nperfect-scrollbar > .ps > .ps-overlay .ps-indicator-bottom {\n  bottom: 0;\n}\n\nperfect-scrollbar > .ps.ps--active-y > .ps__rail-y {\n  top: 0 !important;\n  right: 0 !important;\n  left: auto !important;\n\n  width: 10px;\n\n  cursor: default;\n\n  transition:\n    width 200ms linear,\n    opacity 200ms linear,\n    background-color 200ms linear;\n}\n\nperfect-scrollbar > .ps.ps--active-y > .ps__rail-y:hover,\nperfect-scrollbar > .ps.ps--active-y > .ps__rail-y.ps--clicking {\n  width: 15px;\n}\n\nperfect-scrollbar > .ps.ps--active-x > .ps__rail-x {\n  top: auto !important;\n  bottom: 0 !important;\n  left: 0 !important;\n\n  height: 10px;\n\n  cursor: default;\n\n  transition:\n    height 200ms linear,\n    opacity 200ms linear,\n    background-color 200ms linear;\n}\n\nperfect-scrollbar > .ps.ps--active-x > .ps__rail-x:hover,\nperfect-scrollbar > .ps.ps--active-x > .ps__rail-x.ps--clicking {\n  height: 15px;\n}\n\nperfect-scrollbar > .ps.ps--active-x.ps--active-y > .ps__rail-y {\n  margin: 0 0 10px;\n}\n\nperfect-scrollbar > .ps.ps--active-x.ps--active-y > .ps__rail-x {\n  margin: 0 10px 0 0;\n}\n\nperfect-scrollbar > .ps.ps--scrolling-y > .ps__rail-y,\nperfect-scrollbar > .ps.ps--scrolling-x > .ps__rail-x {\n  opacity: 0.9;\n\n  background-color: #eee;\n}\n\nperfect-scrollbar.ps-show-always > .ps.ps--active-y > .ps__rail-y,\nperfect-scrollbar.ps-show-always > .ps.ps--active-x > .ps__rail-x {\n  opacity: 0.6;\n}\n\nperfect-scrollbar.ps-show-active > .ps.ps--active-y > .ps-overlay:not(.ps-at-top) .ps-indicator-top {\n  opacity: 1;\n\n  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);\n}\n\nperfect-scrollbar.ps-show-active > .ps.ps--active-y > .ps-overlay:not(.ps-at-bottom) .ps-indicator-bottom {\n  opacity: 1;\n\n  background: linear-gradient(to top, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);\n}\n\nperfect-scrollbar.ps-show-active > .ps.ps--active-x > .ps-overlay:not(.ps-at-left) .ps-indicator-left {\n  opacity: 1;\n\n  background: linear-gradient(to right, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);\n}\n\nperfect-scrollbar.ps-show-active > .ps.ps--active-x > .ps-overlay:not(.ps-at-right) .ps-indicator-right {\n  opacity: 1;\n\n  background: linear-gradient(to left, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);\n}\n\nperfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-y > .ps-overlay.ps-at-top .ps-indicator-top {\n  background: linear-gradient(to bottom, rgba(170, 170, 170, 0.5) 0%, rgba(170, 170, 170, 0) 100%);\n}\n\nperfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-y > .ps-overlay.ps-at-bottom .ps-indicator-bottom {\n  background: linear-gradient(to top, rgba(170, 170, 170, 0.5) 0%, rgba(170, 170, 170, 0) 100%);\n}\n\nperfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-x > .ps-overlay.ps-at-left .ps-indicator-left {\n  background: linear-gradient(to right, rgba(170, 170, 170, 0.5) 0%, rgba(170, 170, 170, 0) 100%);\n}\n\nperfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-x > .ps-overlay.ps-at-right .ps-indicator-right {\n  background: linear-gradient(to left, rgba(170, 170, 170, 0.5) 0%, rgba(170, 170, 170, 0) 100%);\n}\n\nperfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-y > .ps-overlay.ps-at-top .ps-indicator-top.ps-indicator-show,\nperfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-y > .ps-overlay.ps-at-bottom .ps-indicator-bottom.ps-indicator-show,\nperfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-x > .ps-overlay.ps-at-left .ps-indicator-left.ps-indicator-show,\nperfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-x > .ps-overlay.ps-at-right .ps-indicator-right.ps-indicator-show {\n  opacity: 1;\n}\n", "/*\n * Container style\n */\n.ps {\n  overflow: hidden !important;\n  overflow-anchor: none;\n  -ms-overflow-style: none;\n  touch-action: auto;\n  -ms-touch-action: auto;\n}\n\n/*\n * Scrollbar rail styles\n */\n.ps__rail-x {\n  display: none;\n  opacity: 0;\n  transition: background-color .2s linear, opacity .2s linear;\n  -webkit-transition: background-color .2s linear, opacity .2s linear;\n  height: 15px;\n  /* there must be 'bottom' or 'top' for ps__rail-x */\n  bottom: 0px;\n  /* please don't change 'position' */\n  position: absolute;\n}\n\n.ps__rail-y {\n  display: none;\n  opacity: 0;\n  transition: background-color .2s linear, opacity .2s linear;\n  -webkit-transition: background-color .2s linear, opacity .2s linear;\n  width: 15px;\n  /* there must be 'right' or 'left' for ps__rail-y */\n  right: 0;\n  /* please don't change 'position' */\n  position: absolute;\n}\n\n.ps--active-x > .ps__rail-x,\n.ps--active-y > .ps__rail-y {\n  display: block;\n  background-color: transparent;\n}\n\n.ps:hover > .ps__rail-x,\n.ps:hover > .ps__rail-y,\n.ps--focus > .ps__rail-x,\n.ps--focus > .ps__rail-y,\n.ps--scrolling-x > .ps__rail-x,\n.ps--scrolling-y > .ps__rail-y {\n  opacity: 0.6;\n}\n\n.ps .ps__rail-x:hover,\n.ps .ps__rail-y:hover,\n.ps .ps__rail-x:focus,\n.ps .ps__rail-y:focus,\n.ps .ps__rail-x.ps--clicking,\n.ps .ps__rail-y.ps--clicking {\n  background-color: #eee;\n  opacity: 0.9;\n}\n\n/*\n * Scrollbar thumb styles\n */\n.ps__thumb-x {\n  background-color: #aaa;\n  border-radius: 6px;\n  transition: background-color .2s linear, height .2s ease-in-out;\n  -webkit-transition: background-color .2s linear, height .2s ease-in-out;\n  height: 6px;\n  /* there must be 'bottom' for ps__thumb-x */\n  bottom: 2px;\n  /* please don't change 'position' */\n  position: absolute;\n}\n\n.ps__thumb-y {\n  background-color: #aaa;\n  border-radius: 6px;\n  transition: background-color .2s linear, width .2s ease-in-out;\n  -webkit-transition: background-color .2s linear, width .2s ease-in-out;\n  width: 6px;\n  /* there must be 'right' for ps__thumb-y */\n  right: 2px;\n  /* please don't change 'position' */\n  position: absolute;\n}\n\n.ps__rail-x:hover > .ps__thumb-x,\n.ps__rail-x:focus > .ps__thumb-x,\n.ps__rail-x.ps--clicking .ps__thumb-x {\n  background-color: #999;\n  height: 11px;\n}\n\n.ps__rail-y:hover > .ps__thumb-y,\n.ps__rail-y:focus > .ps__thumb-y,\n.ps__rail-y.ps--clicking .ps__thumb-y {\n  background-color: #999;\n  width: 11px;\n}\n\n/* MS supports */\n@supports (-ms-overflow-style: none) {\n  .ps {\n    overflow: auto !important;\n  }\n}\n\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .ps {\n    overflow: auto !important;\n  }\n}\n"]
                }] }
    ];
    /** @nocollapse */
    PerfectScrollbarComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    PerfectScrollbarComponent.propDecorators = {
        disabled: [{ type: Input }],
        usePSClass: [{ type: Input }],
        autoPropagation: [{ type: HostBinding, args: ['class.ps-show-limits',] }, { type: Input }],
        scrollIndicators: [{ type: HostBinding, args: ['class.ps-show-active',] }, { type: Input }],
        config: [{ type: Input }],
        psScrollY: [{ type: Output }],
        psScrollX: [{ type: Output }],
        psScrollUp: [{ type: Output }],
        psScrollDown: [{ type: Output }],
        psScrollLeft: [{ type: Output }],
        psScrollRight: [{ type: Output }],
        psYReachEnd: [{ type: Output }],
        psYReachStart: [{ type: Output }],
        psXReachEnd: [{ type: Output }],
        psXReachStart: [{ type: Output }],
        directiveRef: [{ type: ViewChild, args: [PerfectScrollbarDirective, { static: true },] }]
    };
    return PerfectScrollbarComponent;
}());
export { PerfectScrollbarComponent };
if (false) {
    /** @type {?} */
    PerfectScrollbarComponent.prototype.states;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.indicatorX;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.indicatorY;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.interaction;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.scrollPositionX;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.scrollPositionY;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.scrollDirectionX;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.scrollDirectionY;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.usePropagationX;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.usePropagationY;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.allowPropagationX;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.allowPropagationY;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.stateTimeout;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.ngDestroy;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.stateUpdate;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.disabled;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.usePSClass;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.autoPropagation;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.scrollIndicators;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.config;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.psScrollY;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.psScrollX;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.psScrollUp;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.psScrollDown;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.psScrollLeft;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.psScrollRight;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.psYReachEnd;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.psYReachStart;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.psXReachEnd;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.psXReachStart;
    /** @type {?} */
    PerfectScrollbarComponent.prototype.directiveRef;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    PerfectScrollbarComponent.prototype.platformId;
}
//# sourceMappingURL=perfect-scrollbar.component.js.map