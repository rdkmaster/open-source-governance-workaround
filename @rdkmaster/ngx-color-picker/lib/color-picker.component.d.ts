import { OnInit, OnDestroy, AfterViewInit, ElementRef, ChangeDetectorRef, TemplateRef, NgZone } from '@angular/core';
import { ColorFormats, Cmyk, Hsla, Rgba } from './formats';
import { AlphaChannel, OutputFormat, SliderPosition } from './helpers';
import { ColorPickerService } from './color-picker.service';
import * as i0 from "@angular/core";
export declare class ColorPickerComponent implements OnInit, OnDestroy, AfterViewInit {
    private ngZone;
    private elRef;
    private cdRef;
    private document;
    private platformId;
    private service;
    private isIE10;
    private cmyk;
    private hsva;
    private width;
    private height;
    private cmykColor;
    private outputColor;
    private initialColor;
    private fallbackColor;
    private listenerResize;
    private listenerMouseDown;
    private directiveInstance;
    private sliderH;
    private sliderDimMax;
    private directiveElementRef;
    private dialogArrowSize;
    private dialogArrowOffset;
    private dialogInputFields;
    private useRootViewContainer;
    show: boolean;
    hidden: boolean;
    top: number;
    left: number;
    position: string;
    format: ColorFormats;
    slider: SliderPosition;
    hexText: string;
    hexAlpha: number;
    cmykText: Cmyk;
    hslaText: Hsla;
    rgbaText: Rgba;
    arrowTop: number;
    selectedColor: string;
    hueSliderColor: string;
    alphaSliderColor: string;
    cpWidth: number;
    cpHeight: number;
    cpColorMode: number;
    cpCmykEnabled: boolean;
    cpAlphaChannel: AlphaChannel;
    cpOutputFormat: OutputFormat;
    cpDisableInput: boolean;
    cpDialogDisplay: string;
    cpIgnoredElements: any;
    cpSaveClickOutside: boolean;
    cpCloseClickOutside: boolean;
    cpPosition: string;
    cpUsePosition: string;
    cpPositionOffset: number;
    cpOKButton: boolean;
    cpOKButtonText: string;
    cpOKButtonClass: string;
    cpCancelButton: boolean;
    cpCancelButtonText: string;
    cpCancelButtonClass: string;
    cpEyeDropper: boolean;
    eyeDropperSupported: boolean;
    cpPresetLabel: string;
    cpPresetColors: string[];
    cpPresetColorsClass: string;
    cpMaxPresetColorsLength: number;
    cpPresetEmptyMessage: string;
    cpPresetEmptyMessageClass: string;
    cpAddColorButton: boolean;
    cpAddColorButtonText: string;
    cpAddColorButtonClass: string;
    cpRemoveColorButtonClass: string;
    cpArrowPosition: number;
    cpTriggerElement: ElementRef;
    cpExtraTemplate: TemplateRef<any>;
    dialogElement: ElementRef;
    hueSlider: ElementRef;
    alphaSlider: ElementRef;
    handleEsc(event: any): void;
    handleEnter(event: any): void;
    constructor(ngZone: NgZone, elRef: ElementRef, cdRef: ChangeDetectorRef, document: Document, platformId: string, service: ColorPickerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    openDialog(color: any, emit?: boolean): void;
    closeDialog(): void;
    setupDialog(instance: any, elementRef: ElementRef, color: any, cpWidth: string, cpHeight: string, cpDialogDisplay: string, cpFallbackColor: string, cpColorMode: string, cpCmykEnabled: boolean, cpAlphaChannel: AlphaChannel, cpOutputFormat: OutputFormat, cpDisableInput: boolean, cpIgnoredElements: any, cpSaveClickOutside: boolean, cpCloseClickOutside: boolean, cpUseRootViewContainer: boolean, cpPosition: string, cpPositionOffset: string, cpPositionRelativeToArrow: boolean, cpPresetLabel: string, cpPresetColors: string[], cpPresetColorsClass: string, cpMaxPresetColorsLength: number, cpPresetEmptyMessage: string, cpPresetEmptyMessageClass: string, cpOKButton: boolean, cpOKButtonClass: string, cpOKButtonText: string, cpCancelButton: boolean, cpCancelButtonClass: string, cpCancelButtonText: string, cpAddColorButton: boolean, cpAddColorButtonClass: string, cpAddColorButtonText: string, cpRemoveColorButtonClass: string, cpEyeDropper: boolean, cpTriggerElement: ElementRef, cpExtraTemplate: TemplateRef<any>): void;
    setColorMode(mode: string): void;
    setInitialColor(color: any): void;
    setPresetConfig(cpPresetLabel: string, cpPresetColors: string[]): void;
    setColorFromString(value: string, emit?: boolean, update?: boolean): void;
    onResize(): void;
    onDragEnd(slider: string): void;
    onDragStart(slider: string): void;
    onMouseDown(event: MouseEvent): void;
    onAcceptColor(event: Event): void;
    onCancelColor(event: Event): void;
    onEyeDropper(): void;
    onFormatToggle(change: number): void;
    onColorChange(value: {
        s: number;
        v: number;
        rgX: number;
        rgY: number;
    }): void;
    onHueChange(value: {
        v: number;
        rgX: number;
    }): void;
    onValueChange(value: {
        v: number;
        rgX: number;
    }): void;
    onAlphaChange(value: {
        v: number;
        rgX: number;
    }): void;
    onHexInput(value: string | null): void;
    onRedInput(value: {
        v: number;
        rg: number;
    }): void;
    onBlueInput(value: {
        v: number;
        rg: number;
    }): void;
    onGreenInput(value: {
        v: number;
        rg: number;
    }): void;
    onHueInput(value: {
        v: number;
        rg: number;
    }): void;
    onValueInput(value: {
        v: number;
        rg: number;
    }): void;
    onAlphaInput(value: {
        v: number;
        rg: number;
    }): void;
    onLightnessInput(value: {
        v: number;
        rg: number;
    }): void;
    onSaturationInput(value: {
        v: number;
        rg: number;
    }): void;
    onCyanInput(value: {
        v: number;
        rg: number;
    }): void;
    onMagentaInput(value: {
        v: number;
        rg: number;
    }): void;
    onYellowInput(value: {
        v: number;
        rg: number;
    }): void;
    onBlackInput(value: {
        v: number;
        rg: number;
    }): void;
    onAddPresetColor(event: any, value: string): void;
    onRemovePresetColor(event: any, value: string): void;
    private openColorPicker;
    private closeColorPicker;
    private updateColorPicker;
    private setDialogPosition;
    private isDescendant;
    private createDialogBox;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColorPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColorPickerComponent, "color-picker", never, {}, {}, never, never, false, never>;
}
