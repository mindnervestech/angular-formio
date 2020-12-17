/**
 * @fileoverview added by tsickle
 * Generated from: components/formbuilder/formbuilder.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation, Optional, ElementRef, ViewChild, EventEmitter, Output, NgZone } from '@angular/core';
import { FormioAppConfig } from '../../formio.config';
import { Formio, FormBuilder, Utils } from 'formiojs';
import { assign } from 'lodash';
import { Observable } from 'rxjs';
import { CustomTagsService } from '../../custom-component/custom-tags.service';
/* tslint:disable */
var FormBuilderComponent = /** @class */ (function () {
    function FormBuilderComponent(ngZone, config, customTags) {
        var _this = this;
        this.ngZone = ngZone;
        this.config = config;
        this.customTags = customTags;
        this.componentAdding = false;
        this.noeval = false;
        if (this.config) {
            Formio.setBaseUrl(this.config.apiUrl);
            Formio.setProjectUrl(this.config.appUrl);
        }
        else {
            console.warn('You must provide an AppConfig within your application!');
        }
        this.change = new EventEmitter();
        this.ready = new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.readyResolve = resolve;
        }));
    }
    /**
     * @return {?}
     */
    FormBuilderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Utils.Evaluator.noeval = this.noeval;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe((/**
             * @return {?}
             */
            function () {
                _this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    _this.buildForm(_this.form);
                }));
            }));
        }
        if (this.rebuild) {
            this.rebuild.subscribe((/**
             * @param {?} options
             * @return {?}
             */
            function (options) {
                _this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    _this.rebuildForm(_this.form, options);
                }));
            }));
        }
    };
    /**
     * @param {?} instance
     * @return {?}
     */
    FormBuilderComponent.prototype.setInstance = /**
     * @param {?} instance
     * @return {?}
     */
    function (instance) {
        var _this = this;
        this.formio = instance;
        instance.off('addComponent');
        instance.off('saveComponent');
        instance.off('updateComponent');
        instance.off('removeComponent');
        instance.on('addComponent', (/**
         * @param {?} component
         * @param {?} parent
         * @param {?} path
         * @param {?} index
         * @param {?} isNew
         * @return {?}
         */
        function (component, parent, path, index, isNew) {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                if (isNew) {
                    _this.componentAdding = true;
                }
                else {
                    _this.change.emit({
                        type: 'addComponent',
                        builder: instance,
                        form: instance.schema,
                        component: component,
                        parent: parent,
                        path: path,
                        index: index
                    });
                    _this.componentAdding = false;
                }
            }));
        }));
        instance.on('saveComponent', (/**
         * @param {?} component
         * @param {?} original
         * @param {?} parent
         * @param {?} path
         * @param {?} index
         * @param {?} isNew
         * @return {?}
         */
        function (component, original, parent, path, index, isNew) {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.change.emit({
                    type: _this.componentAdding ? 'addComponent' : 'saveComponent',
                    builder: instance,
                    form: instance.schema,
                    component: component,
                    originalComponent: original,
                    parent: parent,
                    path: path,
                    index: index,
                    isNew: isNew || false
                });
                _this.componentAdding = false;
            }));
        }));
        instance.on('updateComponent', (/**
         * @param {?} component
         * @return {?}
         */
        function (component) {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.change.emit({
                    type: 'updateComponent',
                    builder: instance,
                    form: instance.schema,
                    component: component
                });
            }));
        }));
        instance.on('removeComponent', (/**
         * @param {?} component
         * @param {?} parent
         * @param {?} path
         * @param {?} index
         * @return {?}
         */
        function (component, parent, path, index) {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.change.emit({
                    type: 'deleteComponent',
                    builder: instance,
                    form: instance.schema,
                    component: component,
                    parent: parent,
                    path: path,
                    index: index
                });
            }));
        }));
        this.ngZone.run((/**
         * @return {?}
         */
        function () {
            _this.readyResolve(instance);
        }));
        return instance;
    };
    /**
     * @param {?} display
     * @return {?}
     */
    FormBuilderComponent.prototype.setDisplay = /**
     * @param {?} display
     * @return {?}
     */
    function (display) {
        var _this = this;
        return this.builder.setDisplay(display).then((/**
         * @param {?} instance
         * @return {?}
         */
        function (instance) { return _this.setInstance(instance); }));
    };
    /**
     * @param {?} form
     * @return {?}
     */
    FormBuilderComponent.prototype.buildForm = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        if (!form || !this.builderElement || !this.builderElement.nativeElement) {
            return;
        }
        if (this.builder) {
            return this.setDisplay(form.display).then((/**
             * @return {?}
             */
            function () {
                _this.builder.form = form;
                _this.builder.instance.form = form;
                return _this.builder.instance;
            }));
        }
        return this.rebuildForm(form);
    };
    /**
     * @param {?} form
     * @param {?=} options
     * @return {?}
     */
    FormBuilderComponent.prototype.rebuildForm = /**
     * @param {?} form
     * @param {?=} options
     * @return {?}
     */
    function (form, options) {
        var _this = this;
        /** @type {?} */
        var Builder = this.formbuilder || FormBuilder;
        /** @type {?} */
        var extraTags = this.customTags ? this.customTags.tags : [];
        this.builder = new Builder(this.builderElement.nativeElement, form, assign({
            icons: 'fontawesome',
            sanitizeConfig: {
                addTags: extraTags
            }
        }, options || this.options || {}));
        return this.builder.ready.then((/**
         * @param {?} instance
         * @return {?}
         */
        function (instance) { return _this.setInstance(instance); }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FormBuilderComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        Utils.Evaluator.noeval = this.noeval;
        if (changes.form && changes.form.currentValue) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.buildForm(changes.form.currentValue || { components: [] });
            }));
        }
    };
    /**
     * @return {?}
     */
    FormBuilderComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
        if (this.formio) {
            this.formio.destroy();
        }
    };
    FormBuilderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'form-builder',
                    template: "<div #builder></div> ",
                    styles: ["@charset \"UTF-8\";.choices{position:relative;margin-bottom:24px;font-size:16px}.choices:focus{outline:0}.choices:last-child{margin-bottom:0}.choices.is-disabled .choices__inner,.choices.is-disabled .choices__input{background-color:#eaeaea;cursor:not-allowed;-webkit-user-select:none;-ms-user-select:none;user-select:none}.choices.is-disabled .choices__item{cursor:not-allowed}.choices [hidden]{display:none!important}.choices[data-type*=select-one]{cursor:pointer}.choices[data-type*=select-one] .choices__inner{padding-bottom:7.5px}.choices[data-type*=select-one] .choices__input{display:block;width:100%;padding:10px;border-bottom:1px solid #ddd;background-color:#fff;margin:0}.choices[data-type*=select-one] .choices__button{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);padding:0;background-size:8px;position:absolute;top:50%;right:0;margin-top:-10px;margin-right:25px;height:20px;width:20px;border-radius:10em;opacity:.5}.choices[data-type*=select-one] .choices__button:focus,.choices[data-type*=select-one] .choices__button:hover{opacity:1}.choices[data-type*=select-one] .choices__button:focus{box-shadow:0 0 0 2px #00bcd4}.choices[data-type*=select-one] .choices__item[data-value=''] .choices__button{display:none}.choices[data-type*=select-one]:after{content:'';height:0;width:0;border-style:solid;border-color:#333 transparent transparent;border-width:5px;position:absolute;right:11.5px;top:50%;margin-top:-2.5px;pointer-events:none}.choices[data-type*=select-one].is-open:after{border-color:transparent transparent #333;margin-top:-7.5px}.choices[data-type*=select-one][dir=rtl]:after{left:11.5px;right:auto}.choices[data-type*=select-one][dir=rtl] .choices__button{right:auto;left:0;margin-left:25px;margin-right:0}.choices[data-type*=select-multiple] .choices__inner,.choices[data-type*=text] .choices__inner{cursor:text}.choices[data-type*=select-multiple] .choices__button,.choices[data-type*=text] .choices__button{position:relative;display:inline-block;margin:0 -4px 0 8px;padding-left:16px;border-left:1px solid #008fa1;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);background-size:8px;width:8px;line-height:1;opacity:.75;border-radius:0}.choices[data-type*=select-multiple] .choices__button:focus,.choices[data-type*=select-multiple] .choices__button:hover,.choices[data-type*=text] .choices__button:focus,.choices[data-type*=text] .choices__button:hover{opacity:1}.choices__inner{display:inline-block;vertical-align:top;width:100%;background-color:#f9f9f9;padding:7.5px 7.5px 3.75px;border:1px solid #ddd;border-radius:2.5px;font-size:14px;min-height:44px;overflow:hidden}.is-focused .choices__inner,.is-open .choices__inner{border-color:#b7b7b7}.is-open .choices__inner{border-radius:2.5px 2.5px 0 0}.is-flipped.is-open .choices__inner{border-radius:0 0 2.5px 2.5px}.choices__list{margin:0;padding-left:0;list-style:none}.choices__list--single{display:inline-block;padding:4px 16px 4px 4px;width:100%}[dir=rtl] .choices__list--single{padding-right:4px;padding-left:16px}.choices__list--single .choices__item{width:100%}.choices__list--multiple{display:inline}.choices__list--multiple .choices__item{display:inline-block;vertical-align:middle;border-radius:20px;padding:4px 10px;font-size:12px;font-weight:500;margin-right:3.75px;margin-bottom:3.75px;background-color:#00bcd4;border:1px solid #00a5bb;color:#fff;word-break:break-all;box-sizing:border-box}.choices__list--multiple .choices__item[data-deletable]{padding-right:5px}[dir=rtl] .choices__list--multiple .choices__item{margin-right:0;margin-left:3.75px}.choices__list--multiple .choices__item.is-highlighted{background-color:#00a5bb;border:1px solid #008fa1}.is-disabled .choices__list--multiple .choices__item{background-color:#aaa;border:1px solid #919191}.choices__list--dropdown{visibility:hidden;z-index:1;position:absolute;width:100%;background-color:#fff;border:1px solid #ddd;top:100%;margin-top:-1px;border-bottom-left-radius:2.5px;border-bottom-right-radius:2.5px;overflow:hidden;word-break:break-all;will-change:visibility}.choices__list--dropdown.is-active{visibility:visible}.is-open .choices__list--dropdown{border-color:#b7b7b7}.is-flipped .choices__list--dropdown{top:auto;bottom:100%;margin-top:0;margin-bottom:-1px;border-radius:.25rem .25rem 0 0}.choices__list--dropdown .choices__list{position:relative;max-height:300px;overflow:auto;-webkit-overflow-scrolling:touch;will-change:scroll-position}.choices__list--dropdown .choices__item{position:relative;padding:10px;font-size:14px}[dir=rtl] .choices__list--dropdown .choices__item{text-align:right}@media (min-width:640px){.choices__list--dropdown .choices__item--selectable{padding-right:100px}.choices__list--dropdown .choices__item--selectable:after{content:attr(data-select-text);font-size:12px;opacity:0;position:absolute;right:10px;top:50%;transform:translateY(-50%)}[dir=rtl] .choices__list--dropdown .choices__item--selectable{text-align:right;padding-left:100px;padding-right:10px}[dir=rtl] .choices__list--dropdown .choices__item--selectable:after{right:auto;left:10px}}.choices__list--dropdown .choices__item--selectable.is-highlighted{background-color:#f2f2f2}.choices__list--dropdown .choices__item--selectable.is-highlighted:after{opacity:.5}.choices__item{cursor:default}.choices__item--selectable{cursor:pointer}.choices__item--disabled{cursor:not-allowed;-webkit-user-select:none;-ms-user-select:none;user-select:none;opacity:.5}.choices__heading{font-weight:600;font-size:12px;padding:10px;border-bottom:1px solid #f7f7f7;color:gray}.choices__button{text-indent:-9999px;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0;background-color:transparent;background-repeat:no-repeat;background-position:center;cursor:pointer}.choices__button:focus,.choices__input:focus{outline:0}.choices__input{display:inline-block;vertical-align:baseline;background-color:#f9f9f9;font-size:14px;margin-bottom:5px;border:0;border-radius:0;max-width:100%;padding:4px 0 4px 2px}[dir=rtl] .choices__input{padding-right:2px;padding-left:0}.choices__placeholder{opacity:.5}dialog{position:absolute;left:0;right:0;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto;border:solid;padding:1em;background:#fff;color:#000;display:block}dialog:not([open]){display:none}dialog+.backdrop{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.1)}._dialog_overlay{position:fixed;top:0;right:0;bottom:0;left:0}dialog.fixed{position:fixed;top:50%;transform:translate(0,-50%)}.gu-mirror{position:fixed!important;margin:0!important;z-index:9999!important;opacity:.8;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)\";filter:alpha(opacity=80)}.gu-hide{display:none!important}.gu-unselectable{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.gu-transit{opacity:.2;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)\";filter:alpha(opacity=20)}.formio-form{position:relative;min-height:80px}.formio-error-wrapper,.formio-warning-wrapper{padding:1em}.formio-error-wrapper{color:#721c24;background-color:#f8d7da;border-color:#f5c6cb}.formio-warning-wrapper{color:#856404;background-color:#fff3cd;border-color:#ffeeba}.formio-disabled-input .form-control.flatpickr-input{background-color:#eee}.builder-component.has-error .invalid-feedback,.formio-component.alert-danger .invalid-feedback,.formio-component.has-error .invalid-feedback,.formio-component.has-message .invalid-feedback{display:block;color:inherit;margin-top:4px}.formio-errors .error{color:#dc3545}.formio-errors .warning{color:#856404}.formio-errors .info{color:#004085}.formio-wysiwyg-editor{min-height:200px;background-color:#fff}.has-feedback .form-control{padding-right:10px}.has-feedback .form-control[type=hidden]{padding-right:0}.has-error.bg-danger{padding:4px}.ql-source:after{content:\"[source]\";white-space:nowrap}.quill-source-code{width:100%;margin:0;background:#1d1d1d;box-sizing:border-box;color:#ccc;font-size:15px;outline:0;padding:20px;line-height:24px;font-family:Consolas,Menlo,Monaco,\"Courier New\",monospace;position:absolute;top:0;bottom:0;border:none;display:none}.formio-component-tags tags{background-color:#fff}.field-required:after{content:\" *\";color:red}.glyphicon-spin{-webkit-animation:formio-spin 1s infinite linear;-moz-animation:formio-spin 1s infinite linear;-o-animation:formio-spin 1s infinite linear;animation:formio-spin 1s infinite linear}@-moz-keyframes formio-spin{from{-moz-transform:rotate(0)}to{-moz-transform:rotate(360deg)}}@-webkit-keyframes formio-spin{from{-webkit-transform:rotate(0)}to{-webkit-transform:rotate(360deg)}}@keyframes formio-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}.button-icon-right{margin-left:5px}.formio-component-submit .submit-success::after{content:'\\2713';position:relative;right:-4px;top:1px;line-height:1}.formio-component-submit .submit-fail::after{content:'\\2717';position:relative;right:-4px;top:1px;line-height:1}.formio-component-submit .submit-fail[disabled]{opacity:1}.form-control.flatpickr-input{background-color:#fff}td>.form-group{margin-bottom:0}.signature-pad-body{overflow:hidden;position:relative}.signature-pad-canvas{border-radius:4px;box-shadow:0 0 5px rgba(0,0,0,.02) inset;border:1px solid #f4f4f4}.btn.signature-pad-refresh{position:absolute;left:0;top:0;z-index:1000;padding:3px;line-height:0}[dir=rtl] .btn.signature-pad-refresh{left:unset;right:0}.formio-component-multiple .choices__input{width:100%}.choices__list--dropdown .choices__item--selectable{padding-right:0}.signature-pad-refresh img{height:1.2em}.signature-pad-footer{text-align:center;color:#c3c3c3}.formio-loader{position:relative;min-height:60px}.loader-wrapper{z-index:1000;position:absolute;top:0;left:0;bottom:0;right:0;background-color:rgba(0,0,0,.1)}.loader{position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;z-index:10000;display:inline-block;border:6px solid #f3f3f3;border-top:6px solid #3498db;border-radius:50%;width:60px;height:60px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.choices__list--dropdown{z-index:100}.choices__list--multiple .choices__item{border-radius:0;padding:2px 8px;line-height:1em;margin-bottom:6px}.choices__list--single{padding:0}.choices__item.choices__item--selectable{white-space:nowrap;overflow:hidden;padding-right:25px;text-overflow:ellipsis}.choices__input{padding:2px}.choices[dir=rtl]>*{text-align:right}.choices[dir=rtl] .choices__list--multiple .choices__item[data-deletable]{padding-left:5px;float:right}.choices[dir=rtl] .choices__list--multiple .choices__item[data-deletable] .choices__button{float:left;margin:0 8px 0 -4px;padding-left:unset;padding-right:16px;border-left:unset;border-right:1px solid #008fa1;overflow:hidden}.formio-component-file .fileSelector{padding:15px;border:2px dashed #ddd;text-align:center}.formio-component-file .fileSelector.fileDragOver{border-color:#127abe}.formio-component-file .fileSelector .fa,.formio-component-file .fileSelector .glyphicon{font-size:20px;margin-right:5px}[dir=rtl] .formio-component-file .fileSelector .fa,[dir=rtl] .formio-component-file .fileSelector .glyphicon{margin-right:unset;margin-left:5px}.formio-component-file .fileSelector .browse{cursor:pointer}@-webkit-keyframes formio-dialog-fadeout{0%{opacity:1}100%{opacity:0}}@keyframes formio-dialog-fadeout{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes formio-dialog-fadein{0%{opacity:0}100%{opacity:1}}@keyframes formio-dialog-fadein{0%{opacity:0}100%{opacity:1}}.formio-dialog{box-sizing:border-box;font-size:.8em;color:#666}.formio-dialog.formio-modaledit-dialog{font-size:inherit}.formio-dialog *,.formio-dialog :after,.formio-dialog :before{box-sizing:inherit}.formio-dialog{position:fixed;overflow:auto;-webkit-overflow-scrolling:touch;z-index:10000;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.4);animation:formio-dialog-fadein .5s}.formio-dialog.formio-dialog-disabled-animation,.formio-dialog.formio-dialog-disabled-animation .formio-dialog-content,.formio-dialog.formio-dialog-disabled-animation .formio-dialog-overlay{-webkit-animation:none!important;animation:none!important}.formio-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0;-webkit-backface-visibility:hidden;-webkit-animation:formio-dialog-fadein .5s;animation:formio-dialog-fadein .5s;margin-right:15px;background:0 0}.formio-dialog-no-overlay{pointer-events:none}.formio-dialog.formio-dialog-closing .formio-dialog-overlay{-webkit-backface-visibility:hidden;-webkit-animation:formio-dialog-fadeout .5s;animation:formio-dialog-fadeout .5s}.formio-dialog-content{background:#fff;-webkit-backface-visibility:hidden;-webkit-animation:formio-dialog-fadein .5s;animation:formio-dialog-fadein .5s;pointer-events:all;overflow:auto}.formio-dialog.formio-dialog-closing .formio-dialog-content{-webkit-backface-visibility:hidden;-webkit-animation:formio-dialog-fadeout .5s;animation:formio-dialog-fadeout .5s}.formio-dialog-close:before{font-family:Helvetica,Arial,sans-serif;content:'×';cursor:pointer}body.formio-dialog-open,html.formio-dialog-open{overflow:hidden}.formio-dialog .tab-content{padding-top:12px}.formio-dialog-close{z-index:1000}@-webkit-keyframes formio-dialog-flyin{0%{opacity:0;-webkit-transform:translateY(-40px);transform:translateY(-40px)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes formio-dialog-flyin{0%{opacity:0;-webkit-transform:translateY(-40px);transform:translateY(-40px)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes formio-dialog-flyout{0%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}100%{opacity:0;-webkit-transform:translateY(-40px);transform:translateY(-40px)}}@keyframes formio-dialog-flyout{0%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}100%{opacity:0;-webkit-transform:translateY(-40px);transform:translateY(-40px)}}.formio-dialog.formio-dialog-theme-default{padding-bottom:160px;padding-top:160px}.formio-dialog.formio-dialog-theme-default.formio-dialog-closing .formio-dialog-content{-webkit-animation:formio-dialog-flyout .5s;animation:formio-dialog-flyout .5s}.formio-dialog.formio-dialog-theme-default .formio-dialog-content{-webkit-animation:formio-dialog-flyin .5s;animation:formio-dialog-flyin .5s;background:#f0f0f0;border-radius:5px;font-family:Helvetica,sans-serif;font-size:1.1em;line-height:1.5em;margin:0 auto;max-width:100%;padding:1em;position:relative;width:80%}.formio-dialog.formio-dialog-theme-default .formio-dialog-close{border:none;background:0 0;cursor:pointer;position:absolute;right:0;top:0;z-index:100}.formio-clickable{cursor:pointer}.component-settings .nav>li>a{padding:8px 10px}.formio-dialog.formio-dialog-theme-default .formio-dialog-close:before{display:block;padding:3px;background:0 0;color:#bbb;content:'×';font-size:26px;font-weight:400;line-height:26px;text-align:center}.formio-dialog.formio-dialog-theme-default .formio-dialog-close:active:before,.formio-dialog.formio-dialog-theme-default .formio-dialog-close:hover:before{color:#777}.formio-dialog.formio-dialog-theme-default .formio-dialog-message{margin-bottom:.5em}.formio-dialog.formio-dialog-theme-default .formio-dialog-input{margin-bottom:1em}.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=email],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=password],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=text],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=url],.formio-dialog.formio-dialog-theme-default .formio-dialog-input textarea{background:#fff;border:0;border-radius:3px;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0 0 .25em;min-height:2.5em;padding:.25em .67em;width:100%}.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=email]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=password]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=text]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=url]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input textarea:focus{box-shadow:inset 0 0 0 2px #8dbdf1;outline:0}.formio-dialog.formio-dialog-theme-default .formio-dialog-buttons{*zoom:1}.formio-dialog.formio-dialog-theme-default .formio-dialog-buttons:after{content:'';display:table;clear:both}.formio-dialog.formio-dialog-theme-default .formio-dialog-button{border:0;border-radius:3px;cursor:pointer;float:right;font-family:inherit;font-size:.8em;letter-spacing:.1em;line-height:1em;margin:0 0 0 .5em;padding:.75em 2em;text-transform:uppercase}.formio-dialog.formio-dialog-theme-default .formio-dialog-button:focus{-webkit-animation:formio-dialog-pulse 1.1s infinite;animation:formio-dialog-pulse 1.1s infinite;outline:0}@media (max-width:568px){.formio-dialog.formio-dialog-theme-default .formio-dialog-button:focus{-webkit-animation:none;animation:none}}.formio-dialog.formio-dialog-theme-default .formio-dialog-button.formio-dialog-button-primary{background:#3288e6;color:#fff}.formio-dialog.formio-dialog-theme-default .formio-dialog-button.formio-dialog-button-secondary{background:#e0e0e0;color:#777}.formio-dialog-content .panel{margin:0}.formio-placeholder{position:absolute;color:#999}.formio-dialog .formio-dialog-close{cursor:pointer}.formio-iframe{border:none;width:100%;height:1000px}.inline-form-button{margin-right:10px}.tooltip{opacity:1}.tooltip[x-placement=right] .tooltip-arrow{border-right:5px solid #000}.tooltip[x-placement=right] .tooltip-inner{margin-left:8px}.control-label--bottom{margin-bottom:0;margin-top:5px}.formio-component-label-hidden{position:relative}.formio-hidden{margin:0}.control-label--hidden{position:absolute;top:6px;right:5px;font-size:1.5em}.formio-component-datetime .control-label--hidden.field-required{right:45px;z-index:3}.formio-component-selectboxes .control-label--hidden.field-required,.formio-component-survey .control-label--hidden.field-required{top:0}.formio-component-resource .control-label--hidden.field-required,.formio-component-select .control-label--hidden.field-required{right:40px;z-index:2}.formio-component-datasource,.formio-component-hidden:not(.formio-component-checkbox){margin-bottom:0}.checkbox-inline label,.radio-inline label{font-weight:400;cursor:pointer}.editgrid-listgroup{margin-bottom:10px}.tree-listgroup{flex-direction:row}.formio-component-submit button[disabled]+.has-error{display:block}.formio-choices.form-group{min-width:200px;margin-bottom:0}.formio-choices[data-type=select-multiple] .form-control{height:auto}.form-control.formio-multiple-mask-select{width:15%;z-index:4}.form-control.formio-multiple-mask-input{width:85%}.input-group.formio-multiple-mask-container{width:100%}.formio-component .table{margin-bottom:0}.formio-hide-label-panel-tooltip{margin-top:-10px;margin-left:-10px}.is-disabled .choices__list--multiple .choices__item{padding:5px 10px}.is-disabled .choices__list--multiple .choices__item .choices__button{display:none}.formio-collapse-icon{cursor:pointer;margin-right:4px}[dir=rtl] .formio-collapse-icon{margin-right:unset;margin-left:4px}.formio-component-dateTime .form-control[type=datetime-local]~.input-group-addon,.formio-component-datetime .form-control[type=datetime-local]~.input-group-addon{width:auto}.formio-component-datagrid .formio-datagrid-remove{position:absolute;top:0;right:0;visibility:hidden;opacity:0;transition:opacity .2s linear,visibility 0s .2s}.formio-component-datagrid .datagrid-table>tbody>tr>td:last-child{position:relative}.formio-component-datagrid .datagrid-table>tbody>tr:hover>td:last-child .formio-datagrid-remove{visibility:visible;opacity:1;transition:visibility 0s,opacity .2s linear}.formio-component-modaledit .formio-modaledit-view-container{position:relative;border:1px solid #ddd;min-height:34px;padding:6px 12px;cursor:text}td .formio-component-modaledit .formio-modaledit-view-container{padding:0;border-style:none}.formio-component-modaledit .formio-modaledit-edit{position:absolute;top:0;left:0;visibility:hidden;opacity:0;transition:opacity .2s linear,visibility 0s .2s}.formio-component-modaledit .formio-modaledit-view-container:hover .formio-modaledit-edit{visibility:visible;opacity:1;transition:visibility 0s,opacity .2s linear}.formio-modaledit-dialog .formio-modaledit-close{position:absolute;top:100%;right:0;border-radius:0}.reset-margins a,.reset-margins abbr,.reset-margins acronym,.reset-margins address,.reset-margins applet,.reset-margins article,.reset-margins aside,.reset-margins audio,.reset-margins b,.reset-margins big,.reset-margins blockquote,.reset-margins body,.reset-margins canvas,.reset-margins caption,.reset-margins center,.reset-margins cite,.reset-margins code,.reset-margins dd,.reset-margins del,.reset-margins details,.reset-margins dfn,.reset-margins div,.reset-margins dl,.reset-margins dt,.reset-margins em,.reset-margins embed,.reset-margins fieldset,.reset-margins figcaption,.reset-margins figure,.reset-margins footer,.reset-margins form,.reset-margins h1,.reset-margins h2,.reset-margins h3,.reset-margins h4,.reset-margins h5,.reset-margins h6,.reset-margins header,.reset-margins hgroup,.reset-margins html,.reset-margins i,.reset-margins iframe,.reset-margins img,.reset-margins ins,.reset-margins kbd,.reset-margins label,.reset-margins legend,.reset-margins li,.reset-margins mark,.reset-margins menu,.reset-margins nav,.reset-margins object,.reset-margins ol,.reset-margins output,.reset-margins p,.reset-margins pre,.reset-margins q,.reset-margins ruby,.reset-margins s,.reset-margins samp,.reset-margins section,.reset-margins small,.reset-margins span,.reset-margins strike,.reset-margins strong,.reset-margins sub,.reset-margins summary,.reset-margins sup,.reset-margins table,.reset-margins tbody,.reset-margins td,.reset-margins tfoot,.reset-margins th,.reset-margins thead,.reset-margins time,.reset-margins tr,.reset-margins tt,.reset-margins u,.reset-margins ul,.reset-margins var,.reset-margins video{margin:0}.ck-body .ck.ck-balloon-panel{z-index:101000}.formio-component-select select[disabled=disabled]{-webkit-appearance:none;-moz-appearance:none;text-indent:1px;text-overflow:''}.formio-component-select .choices.is-disabled[data-type*=select-one]:after,.formio-component-select div[disabled=disabled] button{display:none}.datagrid-group-label.collapsed>td{display:none}.datagrid-group-header.clickable{cursor:pointer}.datagrid-group-header.clickable .datagrid-group-label:before{display:inline-block;vertical-align:middle;content:'▾';margin:0 5px}.datagrid-group-header.clickable.collapsed .datagrid-group-label:before{content:'▸'}.formio-component.alert-danger .help-block,.formio-component.alert-warning .help-block{color:inherit}.tree__level_even{background-color:#f6f6f6}.tree__node-content{margin-bottom:10px}.tree__node-children{margin:0}.formio-select-autocomplete-input{opacity:0;position:absolute;z-index:-1}.has-error>.help-block{margin-top:5px;margin-bottom:10px}.no-top-border-table>.table>tbody>tr:first-child>td{border-top:none}.table>tbody>tr>td.cell-align-left{text-align:left}.table>tbody>tr>td.cell-align-center{text-align:center}.table>tbody>tr>td.cell-align-center>div{margin-left:auto;margin-right:auto}.table>tbody>tr>td.cell-align-right{text-align:right}.table>tbody>tr>td.cell-align-right>div{margin-left:auto}.formio-component-textarea .alert .ck-editor__editable{color:inherit}div[data-oembed-url]{width:100%}.checkbox label.label-position-bottom,.checkbox label.label-position-left,.checkbox label.label-position-top,.radio label.label-position-bottom,.radio label.label-position-left,.radio label.label-position-top{padding-left:0}.checkbox label.label-position-bottom span,.checkbox label.label-position-top span,.radio label.label-position-bottom span,.radio label.label-position-top span{display:block}.checkbox label.label-position-bottom input[type=checkbox],.checkbox label.label-position-top input[type=checkbox],.radio label.label-position-bottom input[type=radio],.radio label.label-position-top input[type=radio]{position:relative;margin-left:0}.checkbox label.label-position-top input[type=checkbox],.radio label.label-position-top input[type=radio]{margin-top:4px}.checkbox label.label-position-bottom input[type=checkbox],.radio label.label-position-bottom input[type=radio]{margin-bottom:8px}.checkbox label.label-position-left input[type=checkbox],.radio label.label-position-left input[type=radio]{margin-left:10px}.open-modal-button{width:100%;text-align:left;white-space:normal}.formio-component-modal-wrapper-signature .open-modal-button{text-align:center;height:100%;font-size:1.4em;padding:0;margin:0}.formio-component-content .image{display:table;clear:both;text-align:center;margin:1em auto}.formio-component-content .image>img{display:block;margin:0 auto;max-width:100%;min-width:50px}.formio-component-content .image>figcaption{display:table-caption;caption-side:bottom;word-break:break-word;color:#333;background-color:#f7f7f7;padding:.6em;font-size:.75em;outline-offset:-1px}.formio-component-content .image.image_resized{max-width:100%;display:block;box-sizing:border-box}.formio-component-content .image.image_resized img{width:100%}.formio-component-content .image.image_resized>figcaption{display:block}.formio-component-content .media{clear:both;margin:1em 0;display:block;min-width:15em}.formio-component-content .image-style-align-center:not(.image_resized),.formio-component-content .image-style-align-left:not(.image_resized),.formio-component-content .image-style-align-right:not(.image_resized),.formio-component-content .image-style-side:not(.image_resized){max-width:50%}.formio-component-content .image-style-align-center:not(.image_resized),.formio-component-content .image-style-align-left:not(.image_resized),.formio-component-content .image-style-align-right:not(.image_resized),.formio-component-content .image-style-side:not(.image_resized){max-width:50%}.formio-component-content .image-style-align-center:not(.image_resized),.formio-component-content .image-style-align-left:not(.image_resized),.formio-component-content .image-style-align-right:not(.image_resized),.formio-component-content .image-style-side:not(.image_resized){max-width:50%}.formio-component-content .image-style-align-center:not(.image_resized),.formio-component-content .image-style-align-left:not(.image_resized),.formio-component-content .image-style-align-right:not(.image_resized),.formio-component-content .image-style-side:not(.image_resized){max-width:50%}.formio-component-content .image-style-side{float:right;margin-left:var(--ck-image-style-spacing)}.formio-component-content .image-style-align-left{float:left;margin-right:var(--ck-image-style-spacing)}.formio-component-content .image-style-align-center{margin-left:auto;margin-right:auto}.formio-component-content .image-style-align-right{float:right;margin-left:var(--ck-image-style-spacing)}.formio-component-content blockquote{overflow:hidden;padding-right:1.5em;padding-left:1.5em;margin-left:0;margin-right:0;font-style:italic;border-left:solid 5px #ccc}.formio-component-content[dir=rtl] blockquote{border-left:0;border-right:solid 5px #ccc}.formio-component-content .text-tiny{font-size:.7em}.formio-component-content .text-small{font-size:.85em}.formio-component-content .text-big{font-size:1.4em}.formio-component-content .text-huge{font-size:1.8em}.formio-component-address.formio-component-label-hidden>label.field-required{z-index:1}.formio-component-address.formio-component-label-hidden>label.field-required~.address-autocomplete-container .address-autocomplete-remove-value-icon{right:20px}.address-autocomplete-container{position:relative}.address-autocomplete-container .address-autocomplete-remove-value-icon{cursor:pointer;position:absolute;margin-top:-9px;right:10px;top:50%}.address-autocomplete-container .address-autocomplete-remove-value-icon--hidden{display:none}.autocomplete{background:#fff;font:14px/22px \"-apple-system\",BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif;overflow:auto;box-sizing:border-box;border:1px solid rgba(50,50,50,.6);z-index:11000}.autocomplete>div{cursor:pointer;padding:6px 10px}.autocomplete>div.selected,.autocomplete>div:hover:not(.group){background:#1e90ff;color:#fff}.field-wrapper{display:flex}.field-wrapper--reverse{flex-direction:row-reverse}.field-wrapper .field-label--right{text-align:right}.formio-component-modal-wrapper{margin-bottom:10px}.formio-component-modal-wrapper .component-rendering-hidden{visibility:hidden}div[read-only=true] .formio-component-textarea div[ref=input]{white-space:pre-wrap}.formio-editor-read-only-content img{max-width:100%}.formio-component-password .pull-right:not(:last-child),.formio-component-textarea .pull-right:not(:last-child),.formio-component-textfield .pull-right:not(:last-child){padding-left:12px}.formio-form>div>nav>ul.pagination{flex-flow:wrap row}.formbuilder{position:relative}.drag-container{padding:10px;border:dotted 2px #e8e8e8}.drag-container:hover{cursor:move;border:dotted 2px #ccc}.drag-container.formio-builder-form,.drag-container.formio-builder-form:hover,.panel-body>.drag-container.formio-builder-components,.panel-body>.drag-container.formio-builder-components:hover,.tab-pane>.drag-container.formio-builder-components,.tab-pane>.drag-container.formio-builder-components:hover{padding:0 0 1rem 0;border:none}.component-btn-group{position:absolute;right:0;z-index:1000;margin-top:-2px}.builder-component{position:relative;min-height:15px}.builder-component .formio-component-htmlelement{border:dotted 2px #e8e8e8}.builder-component .formio-component-htmlelement [ref=html]:empty:before{content:'HTML Content';color:#aaa}.builder-component:not(:hover) .component-btn-group{display:none}.builder-group-button{background-color:transparent;white-space:normal;text-align:left}.form-builder-group-header{padding:0}.component-btn-group .component-settings-button{float:right;z-index:1001;margin:4px 4px 0 0;z-index:1001;-webkit-box-shadow:0 0 10px 1px rgba(48,113,169,.6);-moz-box-shadow:0 0 10px 1px rgba(48,113,169,.6);box-shadow:0 0 10px 1px rgba(48,113,169,.6)}.formbuilder .formio-component-content,.formbuilder .formio-component-datasource,.formbuilder .formio-component-form,.formbuilder .formio-component-hidden{border:2px dashed #ddd}.formbuilder .formio-component-datasource,.formbuilder .formio-component-form,.formbuilder .formio-component-hidden{height:3em;text-align:center;color:#aaa;padding-top:.5em}.btn-group-xxs>.btn,.btn-xxs,.component-btn-group .component-settings-button{padding:2px 2px;font-size:10px;line-height:1.2em;border-radius:0;width:18px;height:18px}.formcomponents .formcomponent{text-align:left;padding:5px 5px 5px 8px;margin-top:.2rem;font-size:.8em;line-height:1.2;border-radius:.3em}.form-builder-panel .panel-body{padding:5px}.formio-component-tabs .ui.tabular.menu .item{padding:.8em}.formio-pdf-builder{position:relative}.formio-drop-zone{display:none;position:absolute;z-index:10;background-color:#0d87e9;opacity:.1}.formio-drop-zone.enabled{display:inherit}.component-settings-button-paste{display:none}.builder-paste-mode .component-settings-button-paste{display:inherit}.wizard-page-label{cursor:pointer;border-radius:0}.panel-body .drag-and-drop-alert{margin-bottom:0}.builder-sidebar_scroll{position:sticky;top:15px}.builder-sidebar_search{margin-bottom:10px;appearance:auto}.formio-wizard-builder-component-title{color:#6c757d;text-align:center;padding:.5rem}.formio-wizard-position{position:relative}.formio-settings-help{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc;margin-top:10px}.help-block{margin:0}.builder-sidebar .btn{white-space:normal}.component-settings{padding-top:20px!important;padding-bottom:20px!important}.component-settings .formio-dialog-content{max-height:100%}.component-edit-container{height:auto;overflow:hidden}.component-edit-content{height:calc(100% - 4em)}.component-edit-tabs.col-sm-6{height:100%;overflow-y:auto}.component-edit-tabs.col-sm-12{height:calc(100% - 4em);overflow-y:auto}.component-edit-tabs.col-sm-12 .editForm{height:calc(100% - 4em);overflow-y:auto}.progress.pdf-progress{height:2rem}.progress.pdf-progress .progress-bar{font-size:1rem;line-height:2rem}"],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    FormBuilderComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: FormioAppConfig, decorators: [{ type: Optional }] },
        { type: CustomTagsService, decorators: [{ type: Optional }] }
    ]; };
    FormBuilderComponent.propDecorators = {
        form: [{ type: Input }],
        options: [{ type: Input }],
        formbuilder: [{ type: Input }],
        noeval: [{ type: Input }],
        refresh: [{ type: Input }],
        rebuild: [{ type: Input }],
        change: [{ type: Output }],
        builderElement: [{ type: ViewChild, args: ['builder', { static: true },] }]
    };
    return FormBuilderComponent;
}());
export { FormBuilderComponent };
if (false) {
    /** @type {?} */
    FormBuilderComponent.prototype.ready;
    /** @type {?} */
    FormBuilderComponent.prototype.readyResolve;
    /** @type {?} */
    FormBuilderComponent.prototype.formio;
    /** @type {?} */
    FormBuilderComponent.prototype.builder;
    /** @type {?} */
    FormBuilderComponent.prototype.componentAdding;
    /**
     * @type {?}
     * @private
     */
    FormBuilderComponent.prototype.refreshSubscription;
    /** @type {?} */
    FormBuilderComponent.prototype.form;
    /** @type {?} */
    FormBuilderComponent.prototype.options;
    /** @type {?} */
    FormBuilderComponent.prototype.formbuilder;
    /** @type {?} */
    FormBuilderComponent.prototype.noeval;
    /** @type {?} */
    FormBuilderComponent.prototype.refresh;
    /** @type {?} */
    FormBuilderComponent.prototype.rebuild;
    /** @type {?} */
    FormBuilderComponent.prototype.change;
    /** @type {?} */
    FormBuilderComponent.prototype.builderElement;
    /**
     * @type {?}
     * @private
     */
    FormBuilderComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    FormBuilderComponent.prototype.config;
    /**
     * @type {?}
     * @private
     */
    FormBuilderComponent.prototype.customTags;
}
