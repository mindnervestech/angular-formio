import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from './formio.config';
import * as ɵngcc2 from './custom-component/custom-tags.service';

var _c0 = ["formio"];
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * @fileoverview added by tsickle
 * Generated from: FormioBaseComponent.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ElementRef, EventEmitter, Input, NgZone, Optional, Output, ViewChild } from '@angular/core';
import { FormioService } from './formio.service';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { FormioAppConfig } from './formio.config';
import { assign, get, isEmpty } from 'lodash';
import { CustomTagsService } from './custom-component/custom-tags.service';
import Evaluator from 'formiojs/utils/Evaluator';
import { AlertsPosition } from './types/alerts-position';
var FormioBaseComponent = /** @class */ (function () {
    function FormioBaseComponent(ngZone, config, customTags) {
        var _this = this;
        this.ngZone = ngZone;
        this.config = config;
        this.customTags = customTags;
        this.submission = {};
        this.noeval = false;
        this.readOnly = false;
        this.viewOnly = false;
        this.hooks = {};
        this.watchSubmissionErrors = false;
        this.render = new EventEmitter();
        this.customEvent = new EventEmitter();
        this.fileUploadingStatus = new EventEmitter();
        this.submit = new EventEmitter();
        this.prevPage = new EventEmitter();
        this.nextPage = new EventEmitter();
        this.beforeSubmit = new EventEmitter();
        this.change = new EventEmitter();
        this.invalid = new EventEmitter();
        this.errorChange = new EventEmitter();
        this.formLoad = new EventEmitter();
        this.submissionLoad = new EventEmitter();
        this.ready = new EventEmitter();
        this.AlertsPosition = AlertsPosition;
        this.initialized = false;
        this.alerts = new FormioAlerts();
        this.submitting = false;
        this.submissionSuccess = false;
        this.isLoading = true;
        this.formioReady = new Promise((/**
         * @param {?} ready
         * @return {?}
         */
        function (ready) {
            _this.formioReadyResolve = ready;
        }));
    }
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.getRenderer = /**
     * @return {?}
     */
    function () {
        return this.renderer;
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.getRendererOptions = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var extraTags = this.customTags ? this.customTags.tags : [];
        return assign({}, {
            icons: get(this.config, 'icons', 'fontawesome'),
            noAlerts: get(this.options, 'noAlerts', true),
            readOnly: this.readOnly,
            viewAsHtml: this.viewOnly,
            i18n: get(this.options, 'i18n', null),
            fileService: get(this.options, 'fileService', null),
            hooks: this.hooks,
            sanitizeConfig: {
                addTags: extraTags
            }
        }, this.renderOptions || {});
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.createRenderer = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var Renderer = this.getRenderer();
        /** @type {?} */
        var form = (new Renderer(this.formioElement ? this.formioElement.nativeElement : null, this.form, this.getRendererOptions()));
        return form.instance;
    };
    /**
     * @param {?} form
     * @return {?}
     */
    FormioBaseComponent.prototype.setForm = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        this.form = form;
        if (this.formio) {
            this.formio.destroy();
        }
        // Clear out the element to render the new form.
        if (this.formioElement && this.formioElement.nativeElement) {
            this.formioElement.nativeElement.innerHTML = '';
        }
        this.formio = this.createRenderer();
        this.formio.submission = this.submission;
        if (this.renderOptions && this.renderOptions.validateOnInit) {
            this.formio.setValue(this.submission, { validateOnInit: true });
        }
        if (this.url) {
            this.formio.setUrl(this.url, this.formioOptions || {});
        }
        if (this.src) {
            this.formio.setUrl(this.src, this.formioOptions || {});
        }
        this.formio.nosubmit = true;
        this.formio.on('prevPage', (/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.onPrevPage(data); })); }));
        this.formio.on('nextPage', (/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.onNextPage(data); })); }));
        this.formio.on('change', (/**
         * @param {?} value
         * @param {?} flags
         * @param {?} isModified
         * @return {?}
         */
        function (value, flags, isModified) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.onChange(value, flags, isModified); })); }));
        this.formio.on('customEvent', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return _this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.customEvent.emit(event); }));
        }));
        ['fileUploadingStart', 'fileUploadingEnd'].forEach((/**
         * @param {?} eventName
         * @param {?} index
         * @return {?}
         */
        function (eventName, index) {
            /** @type {?} */
            var status = !!index ? 'end' : 'start';
            _this.formio.on(eventName, (/**
             * @return {?}
             */
            function () {
                return _this.ngZone.run((/**
                 * @return {?}
                 */
                function () { return _this.fileUploadingStatus.emit(status); }));
            }));
        }));
        this.formio.on('submit', (/**
         * @param {?} submission
         * @param {?} saved
         * @return {?}
         */
        function (submission, saved) {
            return _this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.submitForm(submission, saved); }));
        }));
        this.formio.on('error', (/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () {
            _this.submissionSuccess = false;
            return _this.onError(err);
        })); }));
        this.formio.on('render', (/**
         * @return {?}
         */
        function () { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.render.emit(); })); }));
        this.formio.on('formLoad', (/**
         * @param {?} loadedForm
         * @return {?}
         */
        function (loadedForm) {
            return _this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.formLoad.emit(loadedForm); }));
        }));
        return this.formio.ready.then((/**
         * @return {?}
         */
        function () {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.isLoading = false;
                _this.ready.emit(_this);
                _this.formioReadyResolve(_this.formio);
                if (_this.formio.submissionReady) {
                    _this.formio.submissionReady.then((/**
                     * @param {?} submission
                     * @return {?}
                     */
                    function (submission) {
                        _this.submissionLoad.emit(submission);
                    }));
                }
            }));
            return _this.formio;
        }));
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.initialize = /**
     * @return {?}
     */
    function () {
        if (this.initialized) {
            return;
        }
        /** @type {?} */
        var extraTags = this.customTags ? this.customTags.tags : [];
        /** @type {?} */
        var defaultOptions = {
            errors: {
                message: 'Please fix the following errors before submitting.'
            },
            alerts: {
                submitMessage: 'Submission Complete.'
            },
            disableAlerts: false,
            hooks: {
                beforeSubmit: null
            },
            sanitizeConfig: {
                addTags: extraTags
            },
            alertsPosition: AlertsPosition.top,
        };
        this.options = Object.assign(defaultOptions, this.options);
        if (this.options.disableAlerts) {
            this.options.alertsPosition = AlertsPosition.none;
        }
        this.initialized = true;
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Evaluator.noeval = this.noeval;
        this.initialize();
        if (this.language) {
            if (typeof this.language === 'string') {
                this.formio.language = this.language;
            }
            else {
                this.language.subscribe((/**
                 * @param {?} lang
                 * @return {?}
                 */
                function (lang) {
                    _this.formio.language = lang;
                }));
            }
        }
        if (this.refresh) {
            this.refresh.subscribe((/**
             * @param {?} refresh
             * @return {?}
             */
            function (refresh) {
                return _this.onRefresh(refresh);
            }));
        }
        if (this.error) {
            this.error.subscribe((/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onError(err); }));
        }
        if (this.success) {
            this.success.subscribe((/**
             * @param {?} message
             * @return {?}
             */
            function (message) {
                _this.alerts.setAlert({
                    type: 'success',
                    message: message || get(_this.options, 'alerts.submitMessage')
                });
            }));
        }
        if (this.src) {
            if (!this.service) {
                this.service = new FormioService(this.src);
            }
            this.isLoading = true;
            this.service.loadForm({ params: { live: 1 } }).subscribe((/**
             * @param {?} form
             * @return {?}
             */
            function (form) {
                if (form && form.components) {
                    _this.ngZone.runOutsideAngular((/**
                     * @return {?}
                     */
                    function () {
                        _this.setForm(form);
                    }));
                }
                // if a submission is also provided.
                if (isEmpty(_this.submission) &&
                    _this.service &&
                    _this.service.formio.submissionId) {
                    _this.service.loadSubmission().subscribe((/**
                     * @param {?} submission
                     * @return {?}
                     */
                    function (submission) {
                        if (_this.readOnly) {
                            _this.formio.options.readOnly = true;
                        }
                        _this.submission = _this.formio.submission = submission;
                    }), (/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) { return _this.onError(err); }));
                }
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onError(err); }));
        }
        if (this.url && !this.service) {
            this.service = new FormioService(this.url);
        }
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.formio) {
            this.formio.destroy();
        }
    };
    /**
     * @param {?} refresh
     * @return {?}
     */
    FormioBaseComponent.prototype.onRefresh = /**
     * @param {?} refresh
     * @return {?}
     */
    function (refresh) {
        var _this = this;
        this.formioReady.then((/**
         * @return {?}
         */
        function () {
            if (refresh.form) {
                _this.formio.setForm(refresh.form).then((/**
                 * @return {?}
                 */
                function () {
                    if (refresh.submission) {
                        _this.formio.setSubmission(refresh.submission);
                    }
                }));
            }
            else if (refresh.submission) {
                _this.formio.setSubmission(refresh.submission);
            }
            else {
                switch (refresh.property) {
                    case 'submission':
                        _this.formio.submission = refresh.value;
                        break;
                    case 'form':
                        _this.formio.form = refresh.value;
                        break;
                }
            }
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FormioBaseComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        Evaluator.noeval = this.noeval;
        this.initialize();
        if (changes.form && changes.form.currentValue) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.setForm(changes.form.currentValue);
            }));
        }
        this.formioReady.then((/**
         * @return {?}
         */
        function () {
            if (changes.submission && changes.submission.currentValue) {
                _this.formio.setSubmission(changes.submission.currentValue, {
                    fromSubmission: false,
                });
            }
            if (changes.hideComponents && changes.hideComponents.currentValue) {
                /** @type {?} */
                var hiddenComponents_1 = changes.hideComponents.currentValue;
                _this.formio.options.hide = hiddenComponents_1;
                _this.formio.everyComponent((/**
                 * @param {?} component
                 * @return {?}
                 */
                function (component) {
                    component.options.hide = hiddenComponents_1;
                    if (hiddenComponents_1.includes(component.component.key)) {
                        component.visible = false;
                    }
                }));
            }
        }));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    FormioBaseComponent.prototype.onPrevPage = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.alerts.setAlerts([]);
        this.prevPage.emit(data);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    FormioBaseComponent.prototype.onNextPage = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.alerts.setAlerts([]);
        this.nextPage.emit(data);
    };
    /**
     * @param {?} submission
     * @param {?} saved
     * @param {?=} noemit
     * @return {?}
     */
    FormioBaseComponent.prototype.onSubmit = /**
     * @param {?} submission
     * @param {?} saved
     * @param {?=} noemit
     * @return {?}
     */
    function (submission, saved, noemit) {
        this.submitting = false;
        this.submissionSuccess = true;
        if (saved) {
            this.formio.emit('submitDone', submission);
        }
        if (!noemit) {
            this.submit.emit(submission);
        }
        if (!this.success) {
            this.alerts.setAlert({
                type: 'success',
                message: get(this.options, 'alerts.submitMessage')
            });
        }
    };
    /**
     * @param {?} err
     * @return {?}
     */
    FormioBaseComponent.prototype.onError = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        var _this = this;
        this.alerts.setAlerts([]);
        this.submitting = false;
        this.isLoading = false;
        if (!err) {
            return;
        }
        // Make sure it is an array.
        /** @type {?} */
        var errors = Array.isArray(err) ? err : [err];
        // Emit these errors again.
        this.errorChange.emit(errors);
        if (err.silent) {
            return;
        }
        if (this.formio && errors.length) {
            this.formio.emit('submitError', errors);
        }
        // Iterate through each one and set the alerts array.
        errors.forEach((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            var _a = error
                ? error.details
                    ? {
                        message: error.details.map((/**
                         * @param {?} detail
                         * @return {?}
                         */
                        function (detail) { return detail.message; })),
                        paths: error.details.map((/**
                         * @param {?} detail
                         * @return {?}
                         */
                        function (detail) { return detail.path; })),
                    }
                    : {
                        message: error.message || error.toString(),
                        paths: error.path ? [error.path] : [],
                    }
                : {
                    message: '',
                    paths: [],
                }, message = _a.message, paths = _a.paths;
            /** @type {?} */
            var shouldErrorDisplay = true;
            if (_this.formio) {
                paths.forEach((/**
                 * @param {?} path
                 * @param {?} index
                 * @return {?}
                 */
                function (path, index) {
                    /** @type {?} */
                    var component = _this.formio.getComponent(path);
                    if (component) {
                        /** @type {?} */
                        var components = Array.isArray(component) ? component : [component];
                        /** @type {?} */
                        var messageText_1 = Array.isArray(message) ? message[index] : message;
                        components.forEach((/**
                         * @param {?} comp
                         * @return {?}
                         */
                        function (comp) { return comp.setCustomValidity(messageText_1, true); }));
                        _this.alerts.addAlert({
                            type: 'danger',
                            message: message[index],
                            component: component,
                        });
                        shouldErrorDisplay = false;
                    }
                }));
                if (((/** @type {?} */ (window))).VPAT_ENABLED) {
                    if (typeof error === 'string' && _this.formio.components) {
                        _this.formio.components.forEach((/**
                         * @param {?} comp
                         * @return {?}
                         */
                        function (comp) {
                            if (comp && comp.type !== 'button') {
                                comp.setCustomValidity(message, true);
                            }
                        }));
                    }
                }
                if (!_this.noAlerts) {
                    _this.formio.showErrors();
                }
            }
            if (shouldErrorDisplay) {
                _this.alerts.addAlert({
                    type: 'danger',
                    message: message,
                    component: error.component,
                });
            }
        }));
    };
    /**
     * @param {?} key
     * @return {?}
     */
    FormioBaseComponent.prototype.focusOnComponet = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (this.formio) {
            this.formio.focusOnComponent(key);
        }
    };
    /**
     * @param {?} submission
     * @param {?=} saved
     * @return {?}
     */
    FormioBaseComponent.prototype.submitExecute = /**
     * @param {?} submission
     * @param {?=} saved
     * @return {?}
     */
    function (submission, saved) {
        var _this = this;
        if (saved === void 0) { saved = false; }
        if (this.service && !this.url && !saved) {
            this.service
                .saveSubmission(submission)
                .subscribe((/**
             * @param {?} sub
             * @return {?}
             */
            function (sub) { return _this.onSubmit(sub, true); }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onError(err); }));
        }
        else {
            this.onSubmit(submission, false);
        }
    };
    /**
     * @param {?} submission
     * @param {?=} saved
     * @return {?}
     */
    FormioBaseComponent.prototype.submitForm = /**
     * @param {?} submission
     * @param {?=} saved
     * @return {?}
     */
    function (submission, saved) {
        var _this = this;
        if (saved === void 0) { saved = false; }
        // Keep double submits from occurring...
        if (this.submitting) {
            return;
        }
        this.submissionSuccess = false;
        this.submitting = true;
        this.beforeSubmit.emit(submission);
        // if they provide a beforeSubmit hook, then allow them to alter the submission asynchronously
        // or even provide a custom Error method.
        /** @type {?} */
        var beforeSubmit = get(this.options, 'hooks.beforeSubmit');
        if (beforeSubmit) {
            beforeSubmit(submission, (/**
             * @param {?} err
             * @param {?} sub
             * @return {?}
             */
            function (err, sub) {
                if (err) {
                    _this.onError(err);
                    return;
                }
                _this.submitExecute(sub, saved);
            }));
        }
        else {
            this.submitExecute(submission, saved);
        }
    };
    /**
     * @param {?} value
     * @param {?} flags
     * @param {?} isModified
     * @return {?}
     */
    FormioBaseComponent.prototype.onChange = /**
     * @param {?} value
     * @param {?} flags
     * @param {?} isModified
     * @return {?}
     */
    function (value, flags, isModified) {
        if (this.watchSubmissionErrors && !this.submissionSuccess) {
            /** @type {?} */
            var errors = get(this, 'formio.errors', []);
            /** @type {?} */
            var alerts = get(this, 'alerts.alerts', []);
            /** @type {?} */
            var submitted = get(this, 'formio.submitted', false);
            if (submitted && (errors.length || alerts.length)) {
                this.onError(errors);
            }
        }
        return this.change.emit(__assign(__assign({}, value), { flags: flags, isModified: isModified }));
    };
    /** @nocollapse */
    FormioBaseComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: FormioAppConfig, decorators: [{ type: Optional }] },
        { type: CustomTagsService, decorators: [{ type: Optional }] }
    ]; };
    FormioBaseComponent.propDecorators = {
        form: [{ type: Input }],
        submission: [{ type: Input }],
        src: [{ type: Input }],
        url: [{ type: Input }],
        service: [{ type: Input }],
        options: [{ type: Input }],
        noeval: [{ type: Input }],
        formioOptions: [{ type: Input }],
        renderOptions: [{ type: Input }],
        readOnly: [{ type: Input }],
        viewOnly: [{ type: Input }],
        hideComponents: [{ type: Input }],
        refresh: [{ type: Input }],
        error: [{ type: Input }],
        success: [{ type: Input }],
        language: [{ type: Input }],
        hooks: [{ type: Input }],
        renderer: [{ type: Input }],
        watchSubmissionErrors: [{ type: Input }],
        render: [{ type: Output }],
        customEvent: [{ type: Output }],
        fileUploadingStatus: [{ type: Output }],
        submit: [{ type: Output }],
        prevPage: [{ type: Output }],
        nextPage: [{ type: Output }],
        beforeSubmit: [{ type: Output }],
        change: [{ type: Output }],
        invalid: [{ type: Output }],
        errorChange: [{ type: Output }],
        formLoad: [{ type: Output }],
        submissionLoad: [{ type: Output }],
        ready: [{ type: Output }],
        formioElement: [{ type: ViewChild, args: ['formio', { static: true },] }]
    };
FormioBaseComponent.ɵfac = function FormioBaseComponent_Factory(t) { return new (t || FormioBaseComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.FormioAppConfig, 8), ɵngcc0.ɵɵdirectiveInject(ɵngcc2.CustomTagsService, 8)); };
FormioBaseComponent.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: FormioBaseComponent, viewQuery: function FormioBaseComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵstaticViewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.formioElement = _t.first);
    } }, inputs: { submission: "submission", noeval: "noeval", readOnly: "readOnly", viewOnly: "viewOnly", hooks: "hooks", watchSubmissionErrors: "watchSubmissionErrors", form: "form", options: "options", service: "service", src: "src", url: "url", formioOptions: "formioOptions", renderOptions: "renderOptions", hideComponents: "hideComponents", refresh: "refresh", error: "error", success: "success", language: "language", renderer: "renderer" }, outputs: { render: "render", customEvent: "customEvent", fileUploadingStatus: "fileUploadingStatus", submit: "submit", prevPage: "prevPage", nextPage: "nextPage", beforeSubmit: "beforeSubmit", change: "change", invalid: "invalid", errorChange: "errorChange", formLoad: "formLoad", submissionLoad: "submissionLoad", ready: "ready" }, features: [ɵngcc0.ɵɵNgOnChangesFeature] });

    return FormioBaseComponent;
}());
export { FormioBaseComponent };
if (false) {
    /** @type {?} */
    FormioBaseComponent.prototype.form;
    /** @type {?} */
    FormioBaseComponent.prototype.submission;
    /** @type {?} */
    FormioBaseComponent.prototype.src;
    /** @type {?} */
    FormioBaseComponent.prototype.url;
    /** @type {?} */
    FormioBaseComponent.prototype.service;
    /** @type {?} */
    FormioBaseComponent.prototype.options;
    /** @type {?} */
    FormioBaseComponent.prototype.noeval;
    /** @type {?} */
    FormioBaseComponent.prototype.formioOptions;
    /** @type {?} */
    FormioBaseComponent.prototype.renderOptions;
    /** @type {?} */
    FormioBaseComponent.prototype.readOnly;
    /** @type {?} */
    FormioBaseComponent.prototype.viewOnly;
    /** @type {?} */
    FormioBaseComponent.prototype.hideComponents;
    /** @type {?} */
    FormioBaseComponent.prototype.refresh;
    /** @type {?} */
    FormioBaseComponent.prototype.error;
    /** @type {?} */
    FormioBaseComponent.prototype.success;
    /** @type {?} */
    FormioBaseComponent.prototype.language;
    /** @type {?} */
    FormioBaseComponent.prototype.hooks;
    /** @type {?} */
    FormioBaseComponent.prototype.renderer;
    /** @type {?} */
    FormioBaseComponent.prototype.watchSubmissionErrors;
    /** @type {?} */
    FormioBaseComponent.prototype.render;
    /** @type {?} */
    FormioBaseComponent.prototype.customEvent;
    /** @type {?} */
    FormioBaseComponent.prototype.fileUploadingStatus;
    /** @type {?} */
    FormioBaseComponent.prototype.submit;
    /** @type {?} */
    FormioBaseComponent.prototype.prevPage;
    /** @type {?} */
    FormioBaseComponent.prototype.nextPage;
    /** @type {?} */
    FormioBaseComponent.prototype.beforeSubmit;
    /** @type {?} */
    FormioBaseComponent.prototype.change;
    /** @type {?} */
    FormioBaseComponent.prototype.invalid;
    /** @type {?} */
    FormioBaseComponent.prototype.errorChange;
    /** @type {?} */
    FormioBaseComponent.prototype.formLoad;
    /** @type {?} */
    FormioBaseComponent.prototype.submissionLoad;
    /** @type {?} */
    FormioBaseComponent.prototype.ready;
    /** @type {?} */
    FormioBaseComponent.prototype.formioElement;
    /** @type {?} */
    FormioBaseComponent.prototype.AlertsPosition;
    /** @type {?} */
    FormioBaseComponent.prototype.formio;
    /** @type {?} */
    FormioBaseComponent.prototype.initialized;
    /** @type {?} */
    FormioBaseComponent.prototype.alerts;
    /** @type {?} */
    FormioBaseComponent.prototype.formioReady;
    /**
     * @type {?}
     * @private
     */
    FormioBaseComponent.prototype.formioReadyResolve;
    /**
     * @type {?}
     * @private
     */
    FormioBaseComponent.prototype.submitting;
    /**
     * @type {?}
     * @private
     */
    FormioBaseComponent.prototype.submissionSuccess;
    /** @type {?} */
    FormioBaseComponent.prototype.isLoading;
    /** @type {?} */
    FormioBaseComponent.prototype.noAlerts;
    /** @type {?} */
    FormioBaseComponent.prototype.ngZone;
    /** @type {?} */
    FormioBaseComponent.prototype.config;
    /** @type {?} */
    FormioBaseComponent.prototype.customTags;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybWlvQmFzZUNvbXBvbmVudC5qcyIsInNvdXJjZXMiOlsiRm9ybWlvQmFzZUNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbi8qKlxuICogQGZpbGVvdmVydmlldyBhZGRlZCBieSB0c2lja2xlXG4gKiBHZW5lcmF0ZWQgZnJvbTogRm9ybWlvQmFzZUNvbXBvbmVudC50c1xuICogQHN1cHByZXNzIHtjaGVja1R5cGVzLGNvbnN0YW50UHJvcGVydHksZXh0cmFSZXF1aXJlLG1pc3NpbmdPdmVycmlkZSxtaXNzaW5nUmV0dXJuLHVudXNlZFByaXZhdGVNZW1iZXJzLHVzZWxlc3NDb2RlfSBjaGVja2VkIGJ5IHRzY1xuICovXG5pbXBvcnQgeyBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBOZ1pvbmUsIE9wdGlvbmFsLCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybWlvU2VydmljZSB9IGZyb20gJy4vZm9ybWlvLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybWlvQWxlcnRzIH0gZnJvbSAnLi9jb21wb25lbnRzL2FsZXJ0cy9mb3JtaW8uYWxlcnRzJztcbmltcG9ydCB7IEZvcm1pb0FwcENvbmZpZyB9IGZyb20gJy4vZm9ybWlvLmNvbmZpZyc7XG5pbXBvcnQgeyBhc3NpZ24sIGdldCwgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBDdXN0b21UYWdzU2VydmljZSB9IGZyb20gJy4vY3VzdG9tLWNvbXBvbmVudC9jdXN0b20tdGFncy5zZXJ2aWNlJztcbmltcG9ydCBFdmFsdWF0b3IgZnJvbSAnZm9ybWlvanMvdXRpbHMvRXZhbHVhdG9yJztcbmltcG9ydCB7IEFsZXJ0c1Bvc2l0aW9uIH0gZnJvbSAnLi90eXBlcy9hbGVydHMtcG9zaXRpb24nO1xudmFyIEZvcm1pb0Jhc2VDb21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRm9ybWlvQmFzZUNvbXBvbmVudChuZ1pvbmUsIGNvbmZpZywgY3VzdG9tVGFncykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLm5nWm9uZSA9IG5nWm9uZTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgICAgIHRoaXMuY3VzdG9tVGFncyA9IGN1c3RvbVRhZ3M7XG4gICAgICAgIHRoaXMuc3VibWlzc2lvbiA9IHt9O1xuICAgICAgICB0aGlzLm5vZXZhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlYWRPbmx5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudmlld09ubHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ob29rcyA9IHt9O1xuICAgICAgICB0aGlzLndhdGNoU3VibWlzc2lvbkVycm9ycyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5jdXN0b21FdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5maWxlVXBsb2FkaW5nU3RhdHVzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLnN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5wcmV2UGFnZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5uZXh0UGFnZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5iZWZvcmVTdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLmludmFsaWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuZXJyb3JDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuZm9ybUxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuc3VibWlzc2lvbkxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMucmVhZHkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuQWxlcnRzUG9zaXRpb24gPSBBbGVydHNQb3NpdGlvbjtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFsZXJ0cyA9IG5ldyBGb3JtaW9BbGVydHMoKTtcbiAgICAgICAgdGhpcy5zdWJtaXR0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3VibWlzc2lvblN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmZvcm1pb1JlYWR5ID0gbmV3IFByb21pc2UoKC8qKlxuICAgICAgICAgKiBAcGFyYW0gez99IHJlYWR5XG4gICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiAocmVhZHkpIHtcbiAgICAgICAgICAgIF90aGlzLmZvcm1pb1JlYWR5UmVzb2x2ZSA9IHJlYWR5O1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuZ2V0UmVuZGVyZXIgPSAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLmdldFJlbmRlcmVyT3B0aW9ucyA9IC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAvKiogQHR5cGUgez99ICovXG4gICAgICAgIHZhciBleHRyYVRhZ3MgPSB0aGlzLmN1c3RvbVRhZ3MgPyB0aGlzLmN1c3RvbVRhZ3MudGFncyA6IFtdO1xuICAgICAgICByZXR1cm4gYXNzaWduKHt9LCB7XG4gICAgICAgICAgICBpY29uczogZ2V0KHRoaXMuY29uZmlnLCAnaWNvbnMnLCAnZm9udGF3ZXNvbWUnKSxcbiAgICAgICAgICAgIG5vQWxlcnRzOiBnZXQodGhpcy5vcHRpb25zLCAnbm9BbGVydHMnLCB0cnVlKSxcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnJlYWRPbmx5LFxuICAgICAgICAgICAgdmlld0FzSHRtbDogdGhpcy52aWV3T25seSxcbiAgICAgICAgICAgIGkxOG46IGdldCh0aGlzLm9wdGlvbnMsICdpMThuJywgbnVsbCksXG4gICAgICAgICAgICBmaWxlU2VydmljZTogZ2V0KHRoaXMub3B0aW9ucywgJ2ZpbGVTZXJ2aWNlJywgbnVsbCksXG4gICAgICAgICAgICBob29rczogdGhpcy5ob29rcyxcbiAgICAgICAgICAgIHNhbml0aXplQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgYWRkVGFnczogZXh0cmFUYWdzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMucmVuZGVyT3B0aW9ucyB8fCB7fSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLmNyZWF0ZVJlbmRlcmVyID0gLyoqXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICAgICAgdmFyIFJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpO1xuICAgICAgICAvKiogQHR5cGUgez99ICovXG4gICAgICAgIHZhciBmb3JtID0gKG5ldyBSZW5kZXJlcih0aGlzLmZvcm1pb0VsZW1lbnQgPyB0aGlzLmZvcm1pb0VsZW1lbnQubmF0aXZlRWxlbWVudCA6IG51bGwsIHRoaXMuZm9ybSwgdGhpcy5nZXRSZW5kZXJlck9wdGlvbnMoKSkpO1xuICAgICAgICByZXR1cm4gZm9ybS5pbnN0YW5jZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gZm9ybVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuc2V0Rm9ybSA9IC8qKlxuICAgICAqIEBwYXJhbSB7P30gZm9ybVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgZnVuY3Rpb24gKGZvcm0pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICAgICAgaWYgKHRoaXMuZm9ybWlvKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1pby5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2xlYXIgb3V0IHRoZSBlbGVtZW50IHRvIHJlbmRlciB0aGUgbmV3IGZvcm0uXG4gICAgICAgIGlmICh0aGlzLmZvcm1pb0VsZW1lbnQgJiYgdGhpcy5mb3JtaW9FbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWlvRWxlbWVudC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9ybWlvID0gdGhpcy5jcmVhdGVSZW5kZXJlcigpO1xuICAgICAgICB0aGlzLmZvcm1pby5zdWJtaXNzaW9uID0gdGhpcy5zdWJtaXNzaW9uO1xuICAgICAgICBpZiAodGhpcy5yZW5kZXJPcHRpb25zICYmIHRoaXMucmVuZGVyT3B0aW9ucy52YWxpZGF0ZU9uSW5pdCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtaW8uc2V0VmFsdWUodGhpcy5zdWJtaXNzaW9uLCB7IHZhbGlkYXRlT25Jbml0OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVybCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtaW8uc2V0VXJsKHRoaXMudXJsLCB0aGlzLmZvcm1pb09wdGlvbnMgfHwge30pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNyYykge1xuICAgICAgICAgICAgdGhpcy5mb3JtaW8uc2V0VXJsKHRoaXMuc3JjLCB0aGlzLmZvcm1pb09wdGlvbnMgfHwge30pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9ybWlvLm5vc3VibWl0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mb3JtaW8ub24oJ3ByZXZQYWdlJywgKC8qKlxuICAgICAgICAgKiBAcGFyYW0gez99IGRhdGFcbiAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBfdGhpcy5uZ1pvbmUucnVuKCgvKipcbiAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLm9uUHJldlBhZ2UoZGF0YSk7IH0pKTsgfSkpO1xuICAgICAgICB0aGlzLmZvcm1pby5vbignbmV4dFBhZ2UnLCAoLyoqXG4gICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIF90aGlzLm5nWm9uZS5ydW4oKC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMub25OZXh0UGFnZShkYXRhKTsgfSkpOyB9KSk7XG4gICAgICAgIHRoaXMuZm9ybWlvLm9uKCdjaGFuZ2UnLCAoLyoqXG4gICAgICAgICAqIEBwYXJhbSB7P30gdmFsdWVcbiAgICAgICAgICogQHBhcmFtIHs/fSBmbGFnc1xuICAgICAgICAgKiBAcGFyYW0gez99IGlzTW9kaWZpZWRcbiAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uICh2YWx1ZSwgZmxhZ3MsIGlzTW9kaWZpZWQpIHsgcmV0dXJuIF90aGlzLm5nWm9uZS5ydW4oKC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMub25DaGFuZ2UodmFsdWUsIGZsYWdzLCBpc01vZGlmaWVkKTsgfSkpOyB9KSk7XG4gICAgICAgIHRoaXMuZm9ybWlvLm9uKCdjdXN0b21FdmVudCcsICgvKipcbiAgICAgICAgICogQHBhcmFtIHs/fSBldmVudFxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMubmdab25lLnJ1bigoLyoqXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5jdXN0b21FdmVudC5lbWl0KGV2ZW50KTsgfSkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIFsnZmlsZVVwbG9hZGluZ1N0YXJ0JywgJ2ZpbGVVcGxvYWRpbmdFbmQnXS5mb3JFYWNoKCgvKipcbiAgICAgICAgICogQHBhcmFtIHs/fSBldmVudE5hbWVcbiAgICAgICAgICogQHBhcmFtIHs/fSBpbmRleFxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gKGV2ZW50TmFtZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSAhIWluZGV4ID8gJ2VuZCcgOiAnc3RhcnQnO1xuICAgICAgICAgICAgX3RoaXMuZm9ybWlvLm9uKGV2ZW50TmFtZSwgKC8qKlxuICAgICAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5uZ1pvbmUucnVuKCgvKipcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmZpbGVVcGxvYWRpbmdTdGF0dXMuZW1pdChzdGF0dXMpOyB9KSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5mb3JtaW8ub24oJ3N1Ym1pdCcsICgvKipcbiAgICAgICAgICogQHBhcmFtIHs/fSBzdWJtaXNzaW9uXG4gICAgICAgICAqIEBwYXJhbSB7P30gc2F2ZWRcbiAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIChzdWJtaXNzaW9uLCBzYXZlZCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLm5nWm9uZS5ydW4oKC8qKlxuICAgICAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuc3VibWl0Rm9ybShzdWJtaXNzaW9uLCBzYXZlZCk7IH0pKTtcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLmZvcm1pby5vbignZXJyb3InLCAoLyoqXG4gICAgICAgICAqIEBwYXJhbSB7P30gZXJyXG4gICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBfdGhpcy5uZ1pvbmUucnVuKCgvKipcbiAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLnN1Ym1pc3Npb25TdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMub25FcnJvcihlcnIpO1xuICAgICAgICB9KSk7IH0pKTtcbiAgICAgICAgdGhpcy5mb3JtaW8ub24oJ3JlbmRlcicsICgvKipcbiAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLm5nWm9uZS5ydW4oKC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMucmVuZGVyLmVtaXQoKTsgfSkpOyB9KSk7XG4gICAgICAgIHRoaXMuZm9ybWlvLm9uKCdmb3JtTG9hZCcsICgvKipcbiAgICAgICAgICogQHBhcmFtIHs/fSBsb2FkZWRGb3JtXG4gICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiAobG9hZGVkRm9ybSkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLm5nWm9uZS5ydW4oKC8qKlxuICAgICAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuZm9ybUxvYWQuZW1pdChsb2FkZWRGb3JtKTsgfSkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1pby5yZWFkeS50aGVuKCgvKipcbiAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLm5nWm9uZS5ydW4oKC8qKlxuICAgICAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIF90aGlzLnJlYWR5LmVtaXQoX3RoaXMpO1xuICAgICAgICAgICAgICAgIF90aGlzLmZvcm1pb1JlYWR5UmVzb2x2ZShfdGhpcy5mb3JtaW8pO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5mb3JtaW8uc3VibWlzc2lvblJlYWR5KSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmZvcm1pby5zdWJtaXNzaW9uUmVhZHkudGhlbigoLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7P30gc3VibWlzc2lvblxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHN1Ym1pc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnN1Ym1pc3Npb25Mb2FkLmVtaXQoc3VibWlzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuZm9ybWlvO1xuICAgICAgICB9KSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLmluaXRpYWxpemUgPSAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvKiogQHR5cGUgez99ICovXG4gICAgICAgIHZhciBleHRyYVRhZ3MgPSB0aGlzLmN1c3RvbVRhZ3MgPyB0aGlzLmN1c3RvbVRhZ3MudGFncyA6IFtdO1xuICAgICAgICAvKiogQHR5cGUgez99ICovXG4gICAgICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGVycm9yczoge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdQbGVhc2UgZml4IHRoZSBmb2xsb3dpbmcgZXJyb3JzIGJlZm9yZSBzdWJtaXR0aW5nLidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGVydHM6IHtcbiAgICAgICAgICAgICAgICBzdWJtaXRNZXNzYWdlOiAnU3VibWlzc2lvbiBDb21wbGV0ZS4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlzYWJsZUFsZXJ0czogZmFsc2UsXG4gICAgICAgICAgICBob29rczoge1xuICAgICAgICAgICAgICAgIGJlZm9yZVN1Ym1pdDogbnVsbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNhbml0aXplQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgYWRkVGFnczogZXh0cmFUYWdzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWxlcnRzUG9zaXRpb246IEFsZXJ0c1Bvc2l0aW9uLnRvcCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlQWxlcnRzKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYWxlcnRzUG9zaXRpb24gPSBBbGVydHNQb3NpdGlvbi5ub25lO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5uZ09uSW5pdCA9IC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBFdmFsdWF0b3Iubm9ldmFsID0gdGhpcy5ub2V2YWw7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICBpZiAodGhpcy5sYW5ndWFnZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmxhbmd1YWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybWlvLmxhbmd1YWdlID0gdGhpcy5sYW5ndWFnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2Uuc3Vic2NyaWJlKCgvKipcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gez99IGxhbmdcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChsYW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmZvcm1pby5sYW5ndWFnZSA9IGxhbmc7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaC5zdWJzY3JpYmUoKC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHs/fSByZWZyZXNoXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVmcmVzaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5vblJlZnJlc2gocmVmcmVzaCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3Iuc3Vic2NyaWJlKCgvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZXJyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBfdGhpcy5vbkVycm9yKGVycik7IH0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3Muc3Vic2NyaWJlKCgvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7P30gbWVzc2FnZVxuICAgICAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5hbGVydHMuc2V0QWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UgfHwgZ2V0KF90aGlzLm9wdGlvbnMsICdhbGVydHMuc3VibWl0TWVzc2FnZScpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3JjKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VydmljZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZSA9IG5ldyBGb3JtaW9TZXJ2aWNlKHRoaXMuc3JjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5sb2FkRm9ybSh7IHBhcmFtczogeyBsaXZlOiAxIH0gfSkuc3Vic2NyaWJlKCgvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZm9ybVxuICAgICAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gKGZvcm0pIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9ybSAmJiBmb3JtLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgvKipcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNldEZvcm0oZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgYSBzdWJtaXNzaW9uIGlzIGFsc28gcHJvdmlkZWQuXG4gICAgICAgICAgICAgICAgaWYgKGlzRW1wdHkoX3RoaXMuc3VibWlzc2lvbikgJiZcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VydmljZSAmJlxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXJ2aWNlLmZvcm1pby5zdWJtaXNzaW9uSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VydmljZS5sb2FkU3VibWlzc2lvbigpLnN1YnNjcmliZSgoLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7P30gc3VibWlzc2lvblxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHN1Ym1pc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5yZWFkT25seSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZvcm1pby5vcHRpb25zLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnN1Ym1pc3Npb24gPSBfdGhpcy5mb3JtaW8uc3VibWlzc2lvbiA9IHN1Ym1pc3Npb247XG4gICAgICAgICAgICAgICAgICAgIH0pLCAoLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZXJyXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBfdGhpcy5vbkVycm9yKGVycik7IH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgKC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHs/fSBlcnJcbiAgICAgICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIF90aGlzLm9uRXJyb3IoZXJyKTsgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVybCAmJiAhdGhpcy5zZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UgPSBuZXcgRm9ybWlvU2VydmljZSh0aGlzLnVybCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUubmdPbkRlc3Ryb3kgPSAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9ybWlvKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1pby5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gcmVmcmVzaFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUub25SZWZyZXNoID0gLyoqXG4gICAgICogQHBhcmFtIHs/fSByZWZyZXNoXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAocmVmcmVzaCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmZvcm1pb1JlYWR5LnRoZW4oKC8qKlxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHJlZnJlc2guZm9ybSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmZvcm1pby5zZXRGb3JtKHJlZnJlc2guZm9ybSkudGhlbigoLyoqXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWZyZXNoLnN1Ym1pc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZvcm1pby5zZXRTdWJtaXNzaW9uKHJlZnJlc2guc3VibWlzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyZWZyZXNoLnN1Ym1pc3Npb24pIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5mb3JtaW8uc2V0U3VibWlzc2lvbihyZWZyZXNoLnN1Ym1pc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChyZWZyZXNoLnByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N1Ym1pc3Npb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZm9ybWlvLnN1Ym1pc3Npb24gPSByZWZyZXNoLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Zvcm0nOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZm9ybWlvLmZvcm0gPSByZWZyZXNoLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGNoYW5nZXNcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gLyoqXG4gICAgICogQHBhcmFtIHs/fSBjaGFuZ2VzXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBFdmFsdWF0b3Iubm9ldmFsID0gdGhpcy5ub2V2YWw7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICBpZiAoY2hhbmdlcy5mb3JtICYmIGNoYW5nZXMuZm9ybS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgvKipcbiAgICAgICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRGb3JtKGNoYW5nZXMuZm9ybS5jdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9ybWlvUmVhZHkudGhlbigoLyoqXG4gICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5zdWJtaXNzaW9uICYmIGNoYW5nZXMuc3VibWlzc2lvbi5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5mb3JtaW8uc2V0U3VibWlzc2lvbihjaGFuZ2VzLnN1Ym1pc3Npb24uY3VycmVudFZhbHVlLCB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21TdWJtaXNzaW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmhpZGVDb21wb25lbnRzICYmIGNoYW5nZXMuaGlkZUNvbXBvbmVudHMuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgICAgICAgICAgICAgIHZhciBoaWRkZW5Db21wb25lbnRzXzEgPSBjaGFuZ2VzLmhpZGVDb21wb25lbnRzLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5mb3JtaW8ub3B0aW9ucy5oaWRlID0gaGlkZGVuQ29tcG9uZW50c18xO1xuICAgICAgICAgICAgICAgIF90aGlzLmZvcm1pby5ldmVyeUNvbXBvbmVudCgoLyoqXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHs/fSBjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50Lm9wdGlvbnMuaGlkZSA9IGhpZGRlbkNvbXBvbmVudHNfMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhpZGRlbkNvbXBvbmVudHNfMS5pbmNsdWRlcyhjb21wb25lbnQuY29tcG9uZW50LmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gZGF0YVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUub25QcmV2UGFnZSA9IC8qKlxuICAgICAqIEBwYXJhbSB7P30gZGF0YVxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdGhpcy5hbGVydHMuc2V0QWxlcnRzKFtdKTtcbiAgICAgICAgdGhpcy5wcmV2UGFnZS5lbWl0KGRhdGEpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBkYXRhXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5vbk5leHRQYWdlID0gLyoqXG4gICAgICogQHBhcmFtIHs/fSBkYXRhXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB0aGlzLmFsZXJ0cy5zZXRBbGVydHMoW10pO1xuICAgICAgICB0aGlzLm5leHRQYWdlLmVtaXQoZGF0YSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHN1Ym1pc3Npb25cbiAgICAgKiBAcGFyYW0gez99IHNhdmVkXG4gICAgICogQHBhcmFtIHs/PX0gbm9lbWl0XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5vblN1Ym1pdCA9IC8qKlxuICAgICAqIEBwYXJhbSB7P30gc3VibWlzc2lvblxuICAgICAqIEBwYXJhbSB7P30gc2F2ZWRcbiAgICAgKiBAcGFyYW0gez89fSBub2VtaXRcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIChzdWJtaXNzaW9uLCBzYXZlZCwgbm9lbWl0KSB7XG4gICAgICAgIHRoaXMuc3VibWl0dGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN1Ym1pc3Npb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgaWYgKHNhdmVkKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1pby5lbWl0KCdzdWJtaXREb25lJywgc3VibWlzc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFub2VtaXQpIHtcbiAgICAgICAgICAgIHRoaXMuc3VibWl0LmVtaXQoc3VibWlzc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRoaXMuYWxlcnRzLnNldEFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogZ2V0KHRoaXMub3B0aW9ucywgJ2FsZXJ0cy5zdWJtaXRNZXNzYWdlJylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGVyclxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUub25FcnJvciA9IC8qKlxuICAgICAqIEBwYXJhbSB7P30gZXJyXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuYWxlcnRzLnNldEFsZXJ0cyhbXSk7XG4gICAgICAgIHRoaXMuc3VibWl0dGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIE1ha2Ugc3VyZSBpdCBpcyBhbiBhcnJheS5cbiAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgICAgICB2YXIgZXJyb3JzID0gQXJyYXkuaXNBcnJheShlcnIpID8gZXJyIDogW2Vycl07XG4gICAgICAgIC8vIEVtaXQgdGhlc2UgZXJyb3JzIGFnYWluLlxuICAgICAgICB0aGlzLmVycm9yQ2hhbmdlLmVtaXQoZXJyb3JzKTtcbiAgICAgICAgaWYgKGVyci5zaWxlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mb3JtaW8gJiYgZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtaW8uZW1pdCgnc3VibWl0RXJyb3InLCBlcnJvcnMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIG9uZSBhbmQgc2V0IHRoZSBhbGVydHMgYXJyYXkuXG4gICAgICAgIGVycm9ycy5mb3JFYWNoKCgvKipcbiAgICAgICAgICogQHBhcmFtIHs/fSBlcnJvclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSBlcnJvclxuICAgICAgICAgICAgICAgID8gZXJyb3IuZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLmRldGFpbHMubWFwKCgvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZGV0YWlsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZGV0YWlsKSB7IHJldHVybiBkZXRhaWwubWVzc2FnZTsgfSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aHM6IGVycm9yLmRldGFpbHMubWFwKCgvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZGV0YWlsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZGV0YWlsKSB7IHJldHVybiBkZXRhaWwucGF0aDsgfSkpLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB8fCBlcnJvci50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aHM6IGVycm9yLnBhdGggPyBbZXJyb3IucGF0aF0gOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgcGF0aHM6IFtdLFxuICAgICAgICAgICAgICAgIH0sIG1lc3NhZ2UgPSBfYS5tZXNzYWdlLCBwYXRocyA9IF9hLnBhdGhzO1xuICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgICAgICAgICAgdmFyIHNob3VsZEVycm9yRGlzcGxheSA9IHRydWU7XG4gICAgICAgICAgICBpZiAoX3RoaXMuZm9ybWlvKSB7XG4gICAgICAgICAgICAgICAgcGF0aHMuZm9yRWFjaCgoLyoqXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHs/fSBwYXRoXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHs/fSBpbmRleFxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHBhdGgsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IF90aGlzLmZvcm1pby5nZXRDb21wb25lbnQocGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnRzID0gQXJyYXkuaXNBcnJheShjb21wb25lbnQpID8gY29tcG9uZW50IDogW2NvbXBvbmVudF07XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiogQHR5cGUgez99ICovXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZVRleHRfMSA9IEFycmF5LmlzQXJyYXkobWVzc2FnZSkgPyBtZXNzYWdlW2luZGV4XSA6IG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmZvckVhY2goKC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogQHBhcmFtIHs/fSBjb21wXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoY29tcCkgeyByZXR1cm4gY29tcC5zZXRDdXN0b21WYWxpZGl0eShtZXNzYWdlVGV4dF8xLCB0cnVlKTsgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYWxlcnRzLmFkZEFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlW2luZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IGNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkRXJyb3JEaXNwbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgaWYgKCgoLyoqIEB0eXBlIHs/fSAqLyAod2luZG93KSkpLlZQQVRfRU5BQkxFRCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyAmJiBfdGhpcy5mb3JtaW8uY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZm9ybWlvLmNvbXBvbmVudHMuZm9yRWFjaCgoLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gez99IGNvbXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChjb21wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXAgJiYgY29tcC50eXBlICE9PSAnYnV0dG9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wLnNldEN1c3RvbVZhbGlkaXR5KG1lc3NhZ2UsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLm5vQWxlcnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmZvcm1pby5zaG93RXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNob3VsZEVycm9yRGlzcGxheSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmFsZXJ0cy5hZGRBbGVydCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IGVycm9yLmNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBrZXlcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLmZvY3VzT25Db21wb25ldCA9IC8qKlxuICAgICAqIEBwYXJhbSB7P30ga2V5XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICh0aGlzLmZvcm1pbykge1xuICAgICAgICAgICAgdGhpcy5mb3JtaW8uZm9jdXNPbkNvbXBvbmVudChrZXkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHN1Ym1pc3Npb25cbiAgICAgKiBAcGFyYW0gez89fSBzYXZlZFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuc3VibWl0RXhlY3V0ZSA9IC8qKlxuICAgICAqIEBwYXJhbSB7P30gc3VibWlzc2lvblxuICAgICAqIEBwYXJhbSB7Pz19IHNhdmVkXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAoc3VibWlzc2lvbiwgc2F2ZWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHNhdmVkID09PSB2b2lkIDApIHsgc2F2ZWQgPSBmYWxzZTsgfVxuICAgICAgICBpZiAodGhpcy5zZXJ2aWNlICYmICF0aGlzLnVybCAmJiAhc2F2ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZVxuICAgICAgICAgICAgICAgIC5zYXZlU3VibWlzc2lvbihzdWJtaXNzaW9uKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHs/fSBzdWJcbiAgICAgICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIChzdWIpIHsgcmV0dXJuIF90aGlzLm9uU3VibWl0KHN1YiwgdHJ1ZSk7IH0pLCAoLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0gez99IGVyclxuICAgICAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gX3RoaXMub25FcnJvcihlcnIpOyB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uU3VibWl0KHN1Ym1pc3Npb24sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBzdWJtaXNzaW9uXG4gICAgICogQHBhcmFtIHs/PX0gc2F2ZWRcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLnN1Ym1pdEZvcm0gPSAvKipcbiAgICAgKiBAcGFyYW0gez99IHN1Ym1pc3Npb25cbiAgICAgKiBAcGFyYW0gez89fSBzYXZlZFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgZnVuY3Rpb24gKHN1Ym1pc3Npb24sIHNhdmVkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChzYXZlZCA9PT0gdm9pZCAwKSB7IHNhdmVkID0gZmFsc2U7IH1cbiAgICAgICAgLy8gS2VlcCBkb3VibGUgc3VibWl0cyBmcm9tIG9jY3VycmluZy4uLlxuICAgICAgICBpZiAodGhpcy5zdWJtaXR0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJtaXNzaW9uU3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN1Ym1pdHRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmJlZm9yZVN1Ym1pdC5lbWl0KHN1Ym1pc3Npb24pO1xuICAgICAgICAvLyBpZiB0aGV5IHByb3ZpZGUgYSBiZWZvcmVTdWJtaXQgaG9vaywgdGhlbiBhbGxvdyB0aGVtIHRvIGFsdGVyIHRoZSBzdWJtaXNzaW9uIGFzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIG9yIGV2ZW4gcHJvdmlkZSBhIGN1c3RvbSBFcnJvciBtZXRob2QuXG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICAgICAgdmFyIGJlZm9yZVN1Ym1pdCA9IGdldCh0aGlzLm9wdGlvbnMsICdob29rcy5iZWZvcmVTdWJtaXQnKTtcbiAgICAgICAgaWYgKGJlZm9yZVN1Ym1pdCkge1xuICAgICAgICAgICAgYmVmb3JlU3VibWl0KHN1Ym1pc3Npb24sICgvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZXJyXG4gICAgICAgICAgICAgKiBAcGFyYW0gez99IHN1YlxuICAgICAgICAgICAgICogQHJldHVybiB7P31cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gKGVyciwgc3ViKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuc3VibWl0RXhlY3V0ZShzdWIsIHNhdmVkKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3VibWl0RXhlY3V0ZShzdWJtaXNzaW9uLCBzYXZlZCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gdmFsdWVcbiAgICAgKiBAcGFyYW0gez99IGZsYWdzXG4gICAgICogQHBhcmFtIHs/fSBpc01vZGlmaWVkXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5vbkNoYW5nZSA9IC8qKlxuICAgICAqIEBwYXJhbSB7P30gdmFsdWVcbiAgICAgKiBAcGFyYW0gez99IGZsYWdzXG4gICAgICogQHBhcmFtIHs/fSBpc01vZGlmaWVkXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAodmFsdWUsIGZsYWdzLCBpc01vZGlmaWVkKSB7XG4gICAgICAgIGlmICh0aGlzLndhdGNoU3VibWlzc2lvbkVycm9ycyAmJiAhdGhpcy5zdWJtaXNzaW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgICAgICAgICAgdmFyIGVycm9ycyA9IGdldCh0aGlzLCAnZm9ybWlvLmVycm9ycycsIFtdKTtcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICAgICAgICAgIHZhciBhbGVydHMgPSBnZXQodGhpcywgJ2FsZXJ0cy5hbGVydHMnLCBbXSk7XG4gICAgICAgICAgICAvKiogQHR5cGUgez99ICovXG4gICAgICAgICAgICB2YXIgc3VibWl0dGVkID0gZ2V0KHRoaXMsICdmb3JtaW8uc3VibWl0dGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKHN1Ym1pdHRlZCAmJiAoZXJyb3JzLmxlbmd0aCB8fCBhbGVydHMubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcihlcnJvcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZS5lbWl0KF9fYXNzaWduKF9fYXNzaWduKHt9LCB2YWx1ZSksIHsgZmxhZ3M6IGZsYWdzLCBpc01vZGlmaWVkOiBpc01vZGlmaWVkIH0pKTtcbiAgICB9O1xuICAgIC8qKiBAbm9jb2xsYXBzZSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgICAgIHsgdHlwZTogTmdab25lIH0sXG4gICAgICAgIHsgdHlwZTogRm9ybWlvQXBwQ29uZmlnLCBkZWNvcmF0b3JzOiBbeyB0eXBlOiBPcHRpb25hbCB9XSB9LFxuICAgICAgICB7IHR5cGU6IEN1c3RvbVRhZ3NTZXJ2aWNlLCBkZWNvcmF0b3JzOiBbeyB0eXBlOiBPcHRpb25hbCB9XSB9XG4gICAgXTsgfTtcbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3BEZWNvcmF0b3JzID0ge1xuICAgICAgICBmb3JtOiBbeyB0eXBlOiBJbnB1dCB9XSxcbiAgICAgICAgc3VibWlzc2lvbjogW3sgdHlwZTogSW5wdXQgfV0sXG4gICAgICAgIHNyYzogW3sgdHlwZTogSW5wdXQgfV0sXG4gICAgICAgIHVybDogW3sgdHlwZTogSW5wdXQgfV0sXG4gICAgICAgIHNlcnZpY2U6IFt7IHR5cGU6IElucHV0IH1dLFxuICAgICAgICBvcHRpb25zOiBbeyB0eXBlOiBJbnB1dCB9XSxcbiAgICAgICAgbm9ldmFsOiBbeyB0eXBlOiBJbnB1dCB9XSxcbiAgICAgICAgZm9ybWlvT3B0aW9uczogW3sgdHlwZTogSW5wdXQgfV0sXG4gICAgICAgIHJlbmRlck9wdGlvbnM6IFt7IHR5cGU6IElucHV0IH1dLFxuICAgICAgICByZWFkT25seTogW3sgdHlwZTogSW5wdXQgfV0sXG4gICAgICAgIHZpZXdPbmx5OiBbeyB0eXBlOiBJbnB1dCB9XSxcbiAgICAgICAgaGlkZUNvbXBvbmVudHM6IFt7IHR5cGU6IElucHV0IH1dLFxuICAgICAgICByZWZyZXNoOiBbeyB0eXBlOiBJbnB1dCB9XSxcbiAgICAgICAgZXJyb3I6IFt7IHR5cGU6IElucHV0IH1dLFxuICAgICAgICBzdWNjZXNzOiBbeyB0eXBlOiBJbnB1dCB9XSxcbiAgICAgICAgbGFuZ3VhZ2U6IFt7IHR5cGU6IElucHV0IH1dLFxuICAgICAgICBob29rczogW3sgdHlwZTogSW5wdXQgfV0sXG4gICAgICAgIHJlbmRlcmVyOiBbeyB0eXBlOiBJbnB1dCB9XSxcbiAgICAgICAgd2F0Y2hTdWJtaXNzaW9uRXJyb3JzOiBbeyB0eXBlOiBJbnB1dCB9XSxcbiAgICAgICAgcmVuZGVyOiBbeyB0eXBlOiBPdXRwdXQgfV0sXG4gICAgICAgIGN1c3RvbUV2ZW50OiBbeyB0eXBlOiBPdXRwdXQgfV0sXG4gICAgICAgIGZpbGVVcGxvYWRpbmdTdGF0dXM6IFt7IHR5cGU6IE91dHB1dCB9XSxcbiAgICAgICAgc3VibWl0OiBbeyB0eXBlOiBPdXRwdXQgfV0sXG4gICAgICAgIHByZXZQYWdlOiBbeyB0eXBlOiBPdXRwdXQgfV0sXG4gICAgICAgIG5leHRQYWdlOiBbeyB0eXBlOiBPdXRwdXQgfV0sXG4gICAgICAgIGJlZm9yZVN1Ym1pdDogW3sgdHlwZTogT3V0cHV0IH1dLFxuICAgICAgICBjaGFuZ2U6IFt7IHR5cGU6IE91dHB1dCB9XSxcbiAgICAgICAgaW52YWxpZDogW3sgdHlwZTogT3V0cHV0IH1dLFxuICAgICAgICBlcnJvckNoYW5nZTogW3sgdHlwZTogT3V0cHV0IH1dLFxuICAgICAgICBmb3JtTG9hZDogW3sgdHlwZTogT3V0cHV0IH1dLFxuICAgICAgICBzdWJtaXNzaW9uTG9hZDogW3sgdHlwZTogT3V0cHV0IH1dLFxuICAgICAgICByZWFkeTogW3sgdHlwZTogT3V0cHV0IH1dLFxuICAgICAgICBmb3JtaW9FbGVtZW50OiBbeyB0eXBlOiBWaWV3Q2hpbGQsIGFyZ3M6IFsnZm9ybWlvJywgeyBzdGF0aWM6IHRydWUgfSxdIH1dXG4gICAgfTtcbiAgICByZXR1cm4gRm9ybWlvQmFzZUNvbXBvbmVudDtcbn0oKSk7XG5leHBvcnQgeyBGb3JtaW9CYXNlQ29tcG9uZW50IH07XG5pZiAoZmFsc2UpIHtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuZm9ybTtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuc3VibWlzc2lvbjtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuc3JjO1xuICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS51cmw7XG4gICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLnNlcnZpY2U7XG4gICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLm9wdGlvbnM7XG4gICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLm5vZXZhbDtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuZm9ybWlvT3B0aW9ucztcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyT3B0aW9ucztcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUucmVhZE9ubHk7XG4gICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLnZpZXdPbmx5O1xuICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5oaWRlQ29tcG9uZW50cztcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUucmVmcmVzaDtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuZXJyb3I7XG4gICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLnN1Y2Nlc3M7XG4gICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLmxhbmd1YWdlO1xuICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5ob29rcztcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyZXI7XG4gICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLndhdGNoU3VibWlzc2lvbkVycm9ycztcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyO1xuICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5jdXN0b21FdmVudDtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuZmlsZVVwbG9hZGluZ1N0YXR1cztcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuc3VibWl0O1xuICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5wcmV2UGFnZTtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUubmV4dFBhZ2U7XG4gICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLmJlZm9yZVN1Ym1pdDtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuY2hhbmdlO1xuICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5pbnZhbGlkO1xuICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5lcnJvckNoYW5nZTtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuZm9ybUxvYWQ7XG4gICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLnN1Ym1pc3Npb25Mb2FkO1xuICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5yZWFkeTtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuZm9ybWlvRWxlbWVudDtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuQWxlcnRzUG9zaXRpb247XG4gICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLmZvcm1pbztcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuaW5pdGlhbGl6ZWQ7XG4gICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLmFsZXJ0cztcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuZm9ybWlvUmVhZHk7XG4gICAgLyoqXG4gICAgICogQHR5cGUgez99XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5mb3JtaW9SZWFkeVJlc29sdmU7XG4gICAgLyoqXG4gICAgICogQHR5cGUgez99XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5zdWJtaXR0aW5nO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuc3VibWlzc2lvblN1Y2Nlc3M7XG4gICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLmlzTG9hZGluZztcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUubm9BbGVydHM7XG4gICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgIEZvcm1pb0Jhc2VDb21wb25lbnQucHJvdG90eXBlLm5nWm9uZTtcbiAgICAvKiogQHR5cGUgez99ICovXG4gICAgRm9ybWlvQmFzZUNvbXBvbmVudC5wcm90b3R5cGUuY29uZmlnO1xuICAgIC8qKiBAdHlwZSB7P30gKi9cbiAgICBGb3JtaW9CYXNlQ29tcG9uZW50LnByb3RvdHlwZS5jdXN0b21UYWdzO1xufVxuIl19