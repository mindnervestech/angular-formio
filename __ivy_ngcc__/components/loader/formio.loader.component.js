/**
 * @fileoverview added by tsickle
 * Generated from: components/loader/formio.loader.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

function FormioLoaderComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵelement(1, "div", 2);
    ɵngcc0.ɵɵelementEnd();
} }
var FormioLoaderComponent = /** @class */ (function () {
    function FormioLoaderComponent() {
    }
    FormioLoaderComponent.propDecorators = {
        isLoading: [{ type: Input }]
    };
FormioLoaderComponent.ɵfac = function FormioLoaderComponent_Factory(t) { return new (t || FormioLoaderComponent)(); };
FormioLoaderComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: FormioLoaderComponent, selectors: [["formio-loader"]], inputs: { isLoading: "isLoading" }, decls: 1, vars: 1, consts: [["class", "formio-loader-wrapper", 4, "ngIf"], [1, "formio-loader-wrapper"], [1, "formio-loader"]], template: function FormioLoaderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, FormioLoaderComponent_div_0_Template, 2, 0, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.isLoading);
    } }, directives: [ɵngcc1.NgIf], styles: [".formio-loader-wrapper[_ngcontent-%COMP%] { position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; z-index: 1000; } .formio-loader[_ngcontent-%COMP%] { position: absolute; left: 50%; top: 50%; margin-left: -30px; margin-top: -30px; z-index: 10000; display: inline-block; border: 6px solid #f3f3f3; border-top: 6px solid #3498db; border-radius: 50%; width: 60px; height: 60px; animation: spin 2s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }"] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FormioLoaderComponent, [{
        type: Component,
        args: [{
                selector: 'formio-loader',
                styles: [".formio-loader-wrapper { position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; z-index: 1000; } .formio-loader { position: absolute; left: 50%; top: 50%; margin-left: -30px; margin-top: -30px; z-index: 10000; display: inline-block; border: 6px solid #f3f3f3; border-top: 6px solid #3498db; border-radius: 50%; width: 60px; height: 60px; animation: spin 2s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } "],
                template: "<div class=\"formio-loader-wrapper\" *ngIf=\"isLoading\"> <div class=\"formio-loader\"></div> </div> "
            }]
    }], function () { return []; }, { isLoading: [{
            type: Input
        }] }); })();
    return FormioLoaderComponent;
}());
export { FormioLoaderComponent };
if (false) {
    /** @type {?} */
    FormioLoaderComponent.prototype.isLoading;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWlvLmxvYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VzIjpbImZvcm1pby5sb2FkZXIuY29tcG9uZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBLEtBT007QUFDTjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVvdmVydmlldyBhZGRlZCBieSB0c2lja2xlXG4gKiBHZW5lcmF0ZWQgZnJvbTogY29tcG9uZW50cy9sb2FkZXIvZm9ybWlvLmxvYWRlci5jb21wb25lbnQudHNcbiAqIEBzdXBwcmVzcyB7Y2hlY2tUeXBlcyxjb25zdGFudFByb3BlcnR5LGV4dHJhUmVxdWlyZSxtaXNzaW5nT3ZlcnJpZGUsbWlzc2luZ1JldHVybix1bnVzZWRQcml2YXRlTWVtYmVycyx1c2VsZXNzQ29kZX0gY2hlY2tlZCBieSB0c2NcbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xudmFyIEZvcm1pb0xvYWRlckNvbXBvbmVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGb3JtaW9Mb2FkZXJDb21wb25lbnQoKSB7XG4gICAgfVxuICAgIEZvcm1pb0xvYWRlckNvbXBvbmVudC5kZWNvcmF0b3JzID0gW1xuICAgICAgICB7IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdmb3JtaW8tbG9hZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiBbXCIuZm9ybWlvLWxvYWRlci13cmFwcGVyIHsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDBweDsgYm90dG9tOiAwcHg7IGxlZnQ6IDBweDsgcmlnaHQ6IDBweDsgei1pbmRleDogMTAwMDsgfSAuZm9ybWlvLWxvYWRlciB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDogNTAlOyB0b3A6IDUwJTsgbWFyZ2luLWxlZnQ6IC0zMHB4OyBtYXJnaW4tdG9wOiAtMzBweDsgei1pbmRleDogMTAwMDA7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgYm9yZGVyOiA2cHggc29saWQgI2YzZjNmMzsgYm9yZGVyLXRvcDogNnB4IHNvbGlkICMzNDk4ZGI7IGJvcmRlci1yYWRpdXM6IDUwJTsgd2lkdGg6IDYwcHg7IGhlaWdodDogNjBweDsgYW5pbWF0aW9uOiBzcGluIDJzIGxpbmVhciBpbmZpbml0ZTsgfSBAa2V5ZnJhbWVzIHNwaW4geyAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9IDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH0gXCJdLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPVxcXCJmb3JtaW8tbG9hZGVyLXdyYXBwZXJcXFwiICpuZ0lmPVxcXCJpc0xvYWRpbmdcXFwiPiA8ZGl2IGNsYXNzPVxcXCJmb3JtaW8tbG9hZGVyXFxcIj48L2Rpdj4gPC9kaXY+IFwiXG4gICAgICAgICAgICAgICAgfSxdIH0sXG4gICAgXTtcbiAgICBGb3JtaW9Mb2FkZXJDb21wb25lbnQucHJvcERlY29yYXRvcnMgPSB7XG4gICAgICAgIGlzTG9hZGluZzogW3sgdHlwZTogSW5wdXQgfV1cbiAgICB9O1xuICAgIHJldHVybiBGb3JtaW9Mb2FkZXJDb21wb25lbnQ7XG59KCkpO1xuZXhwb3J0IHsgRm9ybWlvTG9hZGVyQ29tcG9uZW50IH07XG5pZiAoZmFsc2UpIHtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvTG9hZGVyQ29tcG9uZW50LnByb3RvdHlwZS5pc0xvYWRpbmc7XG59XG4iXX0=