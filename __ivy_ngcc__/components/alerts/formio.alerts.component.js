/**
 * @fileoverview added by tsickle
 * Generated from: components/alerts/formio.alerts.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormioAlerts } from './formio.alerts';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from './parse-html-content.pipe';

function FormioAlertsComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    var _r3 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵlistener("click", function FormioAlertsComponent_div_0_Template_div_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r3); var alert_r1 = ctx.$implicit; var ctx_r2 = ɵngcc0.ɵɵnextContext(); return ctx_r2.getComponent($event, alert_r1); });
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵpipe(2, "parseHtmlContent");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var alert_r1 = ctx.$implicit;
    ɵngcc0.ɵɵclassMapInterpolate1("alert alert-", alert_r1.type, "");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", ɵngcc0.ɵɵpipeBind1(2, 4, alert_r1.message), " ");
} }
var FormioAlertsComponent = /** @class */ (function () {
    function FormioAlertsComponent() {
        this.focusComponent = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FormioAlertsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.alerts) {
            this.alerts = new FormioAlerts();
        }
    };
    /**
     * @param {?} event
     * @param {?} alert
     * @return {?}
     */
    FormioAlertsComponent.prototype.getComponent = /**
     * @param {?} event
     * @param {?} alert
     * @return {?}
     */
    function (event, alert) {
        this.focusComponent.emit(alert.component.key);
    };
    FormioAlertsComponent.propDecorators = {
        alerts: [{ type: Input }],
        focusComponent: [{ type: Output }]
    };
FormioAlertsComponent.ɵfac = function FormioAlertsComponent_Factory(t) { return new (t || FormioAlertsComponent)(); };
FormioAlertsComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: FormioAlertsComponent, selectors: [["formio-alerts"]], inputs: { alerts: "alerts" }, outputs: { focusComponent: "focusComponent" }, decls: 1, vars: 1, consts: [["role", "alert", 3, "class", "click", 4, "ngFor", "ngForOf"], ["role", "alert", 3, "click"]], template: function FormioAlertsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, FormioAlertsComponent_div_0_Template, 3, 6, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngForOf", ctx.alerts.alerts);
    } }, directives: [ɵngcc1.NgForOf], pipes: [ɵngcc2.ParseHtmlContentPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FormioAlertsComponent, [{
        type: Component,
        args: [{
                selector: 'formio-alerts',
                template: "<div *ngFor=\"let alert of alerts.alerts\" class=\"alert alert-{{ alert.type }}\" role=\"alert\" (click)=\"getComponent($event, alert)\"> {{alert.message | parseHtmlContent}} </div> "
            }]
    }], function () { return []; }, { focusComponent: [{
            type: Output
        }], alerts: [{
            type: Input
        }] }); })();
    return FormioAlertsComponent;
}());
export { FormioAlertsComponent };
if (false) {
    /** @type {?} */
    FormioAlertsComponent.prototype.alerts;
    /** @type {?} */
    FormioAlertsComponent.prototype.focusComponent;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWlvLmFsZXJ0cy5jb21wb25lbnQuanMiLCJzb3VyY2VzIjpbImZvcm1pby5hbGVydHMuY29tcG9uZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQU1NO0FBQ047QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IGFkZGVkIGJ5IHRzaWNrbGVcbiAqIEdlbmVyYXRlZCBmcm9tOiBjb21wb25lbnRzL2FsZXJ0cy9mb3JtaW8uYWxlcnRzLmNvbXBvbmVudC50c1xuICogQHN1cHByZXNzIHtjaGVja1R5cGVzLGNvbnN0YW50UHJvcGVydHksZXh0cmFSZXF1aXJlLG1pc3NpbmdPdmVycmlkZSxtaXNzaW5nUmV0dXJuLHVudXNlZFByaXZhdGVNZW1iZXJzLHVzZWxlc3NDb2RlfSBjaGVja2VkIGJ5IHRzY1xuICovXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybWlvQWxlcnRzIH0gZnJvbSAnLi9mb3JtaW8uYWxlcnRzJztcbnZhciBGb3JtaW9BbGVydHNDb21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRm9ybWlvQWxlcnRzQ29tcG9uZW50KCkge1xuICAgICAgICB0aGlzLmZvY3VzQ29tcG9uZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEZvcm1pb0FsZXJ0c0NvbXBvbmVudC5wcm90b3R5cGUubmdPbkluaXQgPSAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFsZXJ0cykge1xuICAgICAgICAgICAgdGhpcy5hbGVydHMgPSBuZXcgRm9ybWlvQWxlcnRzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gZXZlbnRcbiAgICAgKiBAcGFyYW0gez99IGFsZXJ0XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBGb3JtaW9BbGVydHNDb21wb25lbnQucHJvdG90eXBlLmdldENvbXBvbmVudCA9IC8qKlxuICAgICAqIEBwYXJhbSB7P30gZXZlbnRcbiAgICAgKiBAcGFyYW0gez99IGFsZXJ0XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAoZXZlbnQsIGFsZXJ0KSB7XG4gICAgICAgIHRoaXMuZm9jdXNDb21wb25lbnQuZW1pdChhbGVydC5jb21wb25lbnQua2V5KTtcbiAgICB9O1xuICAgIEZvcm1pb0FsZXJ0c0NvbXBvbmVudC5kZWNvcmF0b3JzID0gW1xuICAgICAgICB7IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdmb3JtaW8tYWxlcnRzJyxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiAqbmdGb3I9XFxcImxldCBhbGVydCBvZiBhbGVydHMuYWxlcnRzXFxcIiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQte3sgYWxlcnQudHlwZSB9fVxcXCIgcm9sZT1cXFwiYWxlcnRcXFwiIChjbGljayk9XFxcImdldENvbXBvbmVudCgkZXZlbnQsIGFsZXJ0KVxcXCI+IHt7YWxlcnQubWVzc2FnZSB8IHBhcnNlSHRtbENvbnRlbnR9fSA8L2Rpdj4gXCJcbiAgICAgICAgICAgICAgICB9LF0gfSxcbiAgICBdO1xuICAgIEZvcm1pb0FsZXJ0c0NvbXBvbmVudC5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAgICAgYWxlcnRzOiBbeyB0eXBlOiBJbnB1dCB9XSxcbiAgICAgICAgZm9jdXNDb21wb25lbnQ6IFt7IHR5cGU6IE91dHB1dCB9XVxuICAgIH07XG4gICAgcmV0dXJuIEZvcm1pb0FsZXJ0c0NvbXBvbmVudDtcbn0oKSk7XG5leHBvcnQgeyBGb3JtaW9BbGVydHNDb21wb25lbnQgfTtcbmlmIChmYWxzZSkge1xuICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICBGb3JtaW9BbGVydHNDb21wb25lbnQucHJvdG90eXBlLmFsZXJ0cztcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQWxlcnRzQ29tcG9uZW50LnByb3RvdHlwZS5mb2N1c0NvbXBvbmVudDtcbn1cbiJdfQ==