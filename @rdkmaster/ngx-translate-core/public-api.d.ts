import { ModuleWithProviders, Provider, EnvironmentProviders } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./lib/translate.pipe";
import * as i2 from "./lib/translate.directive";
export * from "./lib/translate.loader";
export * from "./lib/translate.service";
export * from "./lib/missing-translation-handler";
export * from "./lib/translate.parser";
export * from "./lib/translate.compiler";
export * from "./lib/translate.directive";
export * from "./lib/translate.pipe";
export * from "./lib/translate.store";
export * from "./lib/extraction-marker";
export * from "./lib/util";
export interface TranslateModuleConfig {
    loader?: Provider;
    compiler?: Provider;
    parser?: Provider;
    missingTranslationHandler?: Provider;
    isolate?: boolean;
    extend?: boolean;
    useDefaultLang?: boolean;
    defaultLanguage?: string;
}
export declare const provideTranslateService: (config?: TranslateModuleConfig) => EnvironmentProviders;
export declare class TranslateModule {
    /**
     * Use this method in your root module to provide the TranslateService
     */
    static forRoot(config?: TranslateModuleConfig): ModuleWithProviders<TranslateModule>;
    /**
     * Use this method in your other (non root) modules to import the directive/pipe
     */
    static forChild(config?: TranslateModuleConfig): ModuleWithProviders<TranslateModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslateModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TranslateModule, never, [typeof i1.TranslatePipe, typeof i2.TranslateDirective], [typeof i1.TranslatePipe, typeof i2.TranslateDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TranslateModule>;
}
