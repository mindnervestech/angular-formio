/**
 * @fileoverview added by tsickle
 * Generated from: components/alerts/formio.alerts.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
import * as ɵngcc0 from '@angular/core';
export function FormioAlert() { }
if (false) {
    /** @type {?} */
    FormioAlert.prototype.type;
    /** @type {?} */
    FormioAlert.prototype.message;
    /** @type {?|undefined} */
    FormioAlert.prototype.component;
}
var FormioAlerts = /** @class */ (function () {
    function FormioAlerts() {
        this.alerts = [];
    }
    /**
     * @param {?} alert
     * @return {?}
     */
    FormioAlerts.prototype.setAlert = /**
     * @param {?} alert
     * @return {?}
     */
    function (alert) {
        this.alerts = [alert];
    };
    /**
     * @param {?} alert
     * @return {?}
     */
    FormioAlerts.prototype.addAlert = /**
     * @param {?} alert
     * @return {?}
     */
    function (alert) {
        this.alerts.push(alert);
    };
    /**
     * @param {?} alerts
     * @return {?}
     */
    FormioAlerts.prototype.setAlerts = /**
     * @param {?} alerts
     * @return {?}
     */
    function (alerts) {
        this.alerts = alerts;
    };
FormioAlerts.ɵfac = function FormioAlerts_Factory(t) { return new (t || FormioAlerts)(); };
FormioAlerts.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: FormioAlerts, factory: function (t) { return FormioAlerts.ɵfac(t); } });

    return FormioAlerts;
}());
export { FormioAlerts };
if (false) {
    /** @type {?} */
    FormioAlerts.prototype.alerts;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWlvLmFsZXJ0cy5qcyIsInNvdXJjZXMiOlsiZm9ybWlvLmFsZXJ0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IGFkZGVkIGJ5IHRzaWNrbGVcbiAqIEdlbmVyYXRlZCBmcm9tOiBjb21wb25lbnRzL2FsZXJ0cy9mb3JtaW8uYWxlcnRzLnRzXG4gKiBAc3VwcHJlc3Mge2NoZWNrVHlwZXMsY29uc3RhbnRQcm9wZXJ0eSxleHRyYVJlcXVpcmUsbWlzc2luZ092ZXJyaWRlLG1pc3NpbmdSZXR1cm4sdW51c2VkUHJpdmF0ZU1lbWJlcnMsdXNlbGVzc0NvZGV9IGNoZWNrZWQgYnkgdHNjXG4gKi9cbi8qKlxuICogQHJlY29yZFxuICovXG5leHBvcnQgZnVuY3Rpb24gRm9ybWlvQWxlcnQoKSB7IH1cbmlmIChmYWxzZSkge1xuICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICBGb3JtaW9BbGVydC5wcm90b3R5cGUudHlwZTtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQWxlcnQucHJvdG90eXBlLm1lc3NhZ2U7XG4gICAgLyoqIEB0eXBlIHs/fHVuZGVmaW5lZH0gKi9cbiAgICBGb3JtaW9BbGVydC5wcm90b3R5cGUuY29tcG9uZW50O1xufVxudmFyIEZvcm1pb0FsZXJ0cyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGb3JtaW9BbGVydHMoKSB7XG4gICAgICAgIHRoaXMuYWxlcnRzID0gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gYWxlcnRcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEZvcm1pb0FsZXJ0cy5wcm90b3R5cGUuc2V0QWxlcnQgPSAvKipcbiAgICAgKiBAcGFyYW0gez99IGFsZXJ0XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAoYWxlcnQpIHtcbiAgICAgICAgdGhpcy5hbGVydHMgPSBbYWxlcnRdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBhbGVydFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgRm9ybWlvQWxlcnRzLnByb3RvdHlwZS5hZGRBbGVydCA9IC8qKlxuICAgICAqIEBwYXJhbSB7P30gYWxlcnRcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIChhbGVydCkge1xuICAgICAgICB0aGlzLmFsZXJ0cy5wdXNoKGFsZXJ0KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gYWxlcnRzXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBGb3JtaW9BbGVydHMucHJvdG90eXBlLnNldEFsZXJ0cyA9IC8qKlxuICAgICAqIEBwYXJhbSB7P30gYWxlcnRzXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAoYWxlcnRzKSB7XG4gICAgICAgIHRoaXMuYWxlcnRzID0gYWxlcnRzO1xuICAgIH07XG4gICAgcmV0dXJuIEZvcm1pb0FsZXJ0cztcbn0oKSk7XG5leHBvcnQgeyBGb3JtaW9BbGVydHMgfTtcbmlmIChmYWxzZSkge1xuICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICBGb3JtaW9BbGVydHMucHJvdG90eXBlLmFsZXJ0cztcbn1cbiJdfQ==