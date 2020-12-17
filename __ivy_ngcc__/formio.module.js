/**
 * @fileoverview added by tsickle
 * Generated from: formio.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioComponent } from './components/formio/formio.component';
import { FormBuilderComponent } from './components/formbuilder/formbuilder.component';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { ParseHtmlContentPipe } from './components/alerts/parse-html-content.pipe';
import { FormioAlertsComponent } from './components/alerts/formio.alerts.component';
import { FormioLoaderComponent } from './components/loader/formio.loader.component';
import { CustomTagsService } from './custom-component/custom-tags.service';
import * as ɵngcc0 from '@angular/core';
var FormioModule = /** @class */ (function () {
    function FormioModule() {
    }
FormioModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: FormioModule });
FormioModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function FormioModule_Factory(t) { return new (t || FormioModule)(); }, providers: [
        FormioAlerts,
        CustomTagsService
    ], imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(FormioModule, { declarations: function () { return [FormioComponent,
        FormBuilderComponent,
        FormioLoaderComponent,
        FormioAlertsComponent,
        ParseHtmlContentPipe]; }, imports: function () { return [CommonModule]; }, exports: function () { return [FormioComponent,
        FormBuilderComponent,
        FormioLoaderComponent,
        FormioAlertsComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FormioModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    FormioComponent,
                    FormBuilderComponent,
                    FormioLoaderComponent,
                    FormioAlertsComponent,
                    ParseHtmlContentPipe
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    FormioComponent,
                    FormBuilderComponent,
                    FormioLoaderComponent,
                    FormioAlertsComponent
                ],
                providers: [
                    FormioAlerts,
                    CustomTagsService
                ],
                entryComponents: [
                    FormioComponent,
                    FormBuilderComponent
                ]
            }]
    }], function () { return []; }, null); })();
    return FormioModule;
}());
export { FormioModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWlvLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiZm9ybWlvLm1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0RBNEJNO0FBQ047QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IGFkZGVkIGJ5IHRzaWNrbGVcbiAqIEdlbmVyYXRlZCBmcm9tOiBmb3JtaW8ubW9kdWxlLnRzXG4gKiBAc3VwcHJlc3Mge2NoZWNrVHlwZXMsY29uc3RhbnRQcm9wZXJ0eSxleHRyYVJlcXVpcmUsbWlzc2luZ092ZXJyaWRlLG1pc3NpbmdSZXR1cm4sdW51c2VkUHJpdmF0ZU1lbWJlcnMsdXNlbGVzc0NvZGV9IGNoZWNrZWQgYnkgdHNjXG4gKi9cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybWlvQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvcm1pby9mb3JtaW8uY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1CdWlsZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvcm1idWlsZGVyL2Zvcm1idWlsZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3JtaW9BbGVydHMgfSBmcm9tICcuL2NvbXBvbmVudHMvYWxlcnRzL2Zvcm1pby5hbGVydHMnO1xuaW1wb3J0IHsgUGFyc2VIdG1sQ29udGVudFBpcGUgfSBmcm9tICcuL2NvbXBvbmVudHMvYWxlcnRzL3BhcnNlLWh0bWwtY29udGVudC5waXBlJztcbmltcG9ydCB7IEZvcm1pb0FsZXJ0c0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hbGVydHMvZm9ybWlvLmFsZXJ0cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybWlvTG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvYWRlci9mb3JtaW8ubG9hZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDdXN0b21UYWdzU2VydmljZSB9IGZyb20gJy4vY3VzdG9tLWNvbXBvbmVudC9jdXN0b20tdGFncy5zZXJ2aWNlJztcbnZhciBGb3JtaW9Nb2R1bGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRm9ybWlvTW9kdWxlKCkge1xuICAgIH1cbiAgICBGb3JtaW9Nb2R1bGUuZGVjb3JhdG9ycyA9IFtcbiAgICAgICAgeyB0eXBlOiBOZ01vZHVsZSwgYXJnczogW3tcbiAgICAgICAgICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBGb3JtaW9Db21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBGb3JtQnVpbGRlckNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1pb0xvYWRlckNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1pb0FsZXJ0c0NvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhcnNlSHRtbENvbnRlbnRQaXBlXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbk1vZHVsZVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBleHBvcnRzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBGb3JtaW9Db21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBGb3JtQnVpbGRlckNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1pb0xvYWRlckNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1pb0FsZXJ0c0NvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZvcm1pb0FsZXJ0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIEN1c3RvbVRhZ3NTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWlvQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgRm9ybUJ1aWxkZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXSB9LFxuICAgIF07XG4gICAgcmV0dXJuIEZvcm1pb01vZHVsZTtcbn0oKSk7XG5leHBvcnQgeyBGb3JtaW9Nb2R1bGUgfTtcbiJdfQ==