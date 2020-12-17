/**
 * @fileoverview added by tsickle
 * Generated from: components/alerts/parse-html-content.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
var ParseHtmlContentPipe = /** @class */ (function () {
    function ParseHtmlContentPipe() {
    }
    /*
      Some messages that are come from formiojs have hex codes. So the main aim of this pipe is transform this messages to html.
      And then render in template.
    */
    /*
        Some messages that are come from formiojs have hex codes. So the main aim of this pipe is transform this messages to html.
        And then render in template.
      */
    /**
     * @param {?} content
     * @return {?}
     */
    ParseHtmlContentPipe.prototype.transform = /*
        Some messages that are come from formiojs have hex codes. So the main aim of this pipe is transform this messages to html.
        And then render in template.
      */
    /**
     * @param {?} content
     * @return {?}
     */
    function (content) {
        /** @type {?} */
        var parsedContent = new DOMParser().parseFromString(content, 'text/html').body.childNodes[0];
        return parsedContent.textContent;
    };
ParseHtmlContentPipe.ɵfac = function ParseHtmlContentPipe_Factory(t) { return new (t || ParseHtmlContentPipe)(); };
ParseHtmlContentPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "parseHtmlContent", type: ParseHtmlContentPipe, pure: false });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ParseHtmlContentPipe, [{
        type: Pipe,
        args: [{ name: 'parseHtmlContent', pure: false }]
    }], function () { return []; }, null); })();
    return ParseHtmlContentPipe;
}());
export { ParseHtmlContentPipe };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtaHRtbC1jb250ZW50LnBpcGUuanMiLCJzb3VyY2VzIjpbInBhcnNlLWh0bWwtY29udGVudC5waXBlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O2dEQUdNO0FBQ047QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IGFkZGVkIGJ5IHRzaWNrbGVcbiAqIEdlbmVyYXRlZCBmcm9tOiBjb21wb25lbnRzL2FsZXJ0cy9wYXJzZS1odG1sLWNvbnRlbnQucGlwZS50c1xuICogQHN1cHByZXNzIHtjaGVja1R5cGVzLGNvbnN0YW50UHJvcGVydHksZXh0cmFSZXF1aXJlLG1pc3NpbmdPdmVycmlkZSxtaXNzaW5nUmV0dXJuLHVudXNlZFByaXZhdGVNZW1iZXJzLHVzZWxlc3NDb2RlfSBjaGVja2VkIGJ5IHRzY1xuICovXG5pbXBvcnQgeyBQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG52YXIgUGFyc2VIdG1sQ29udGVudFBpcGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGFyc2VIdG1sQ29udGVudFBpcGUoKSB7XG4gICAgfVxuICAgIC8qXG4gICAgICBTb21lIG1lc3NhZ2VzIHRoYXQgYXJlIGNvbWUgZnJvbSBmb3JtaW9qcyBoYXZlIGhleCBjb2Rlcy4gU28gdGhlIG1haW4gYWltIG9mIHRoaXMgcGlwZSBpcyB0cmFuc2Zvcm0gdGhpcyBtZXNzYWdlcyB0byBodG1sLlxuICAgICAgQW5kIHRoZW4gcmVuZGVyIGluIHRlbXBsYXRlLlxuICAgICovXG4gICAgLypcbiAgICAgICAgU29tZSBtZXNzYWdlcyB0aGF0IGFyZSBjb21lIGZyb20gZm9ybWlvanMgaGF2ZSBoZXggY29kZXMuIFNvIHRoZSBtYWluIGFpbSBvZiB0aGlzIHBpcGUgaXMgdHJhbnNmb3JtIHRoaXMgbWVzc2FnZXMgdG8gaHRtbC5cbiAgICAgICAgQW5kIHRoZW4gcmVuZGVyIGluIHRlbXBsYXRlLlxuICAgICAgKi9cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGNvbnRlbnRcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIFBhcnNlSHRtbENvbnRlbnRQaXBlLnByb3RvdHlwZS50cmFuc2Zvcm0gPSAvKlxuICAgICAgICBTb21lIG1lc3NhZ2VzIHRoYXQgYXJlIGNvbWUgZnJvbSBmb3JtaW9qcyBoYXZlIGhleCBjb2Rlcy4gU28gdGhlIG1haW4gYWltIG9mIHRoaXMgcGlwZSBpcyB0cmFuc2Zvcm0gdGhpcyBtZXNzYWdlcyB0byBodG1sLlxuICAgICAgICBBbmQgdGhlbiByZW5kZXIgaW4gdGVtcGxhdGUuXG4gICAgICAqL1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gY29udGVudFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xuICAgICAgICB2YXIgcGFyc2VkQ29udGVudCA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoY29udGVudCwgJ3RleHQvaHRtbCcpLmJvZHkuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgcmV0dXJuIHBhcnNlZENvbnRlbnQudGV4dENvbnRlbnQ7XG4gICAgfTtcbiAgICBQYXJzZUh0bWxDb250ZW50UGlwZS5kZWNvcmF0b3JzID0gW1xuICAgICAgICB7IHR5cGU6IFBpcGUsIGFyZ3M6IFt7IG5hbWU6ICdwYXJzZUh0bWxDb250ZW50JywgcHVyZTogZmFsc2UgfSxdIH0sXG4gICAgXTtcbiAgICByZXR1cm4gUGFyc2VIdG1sQ29udGVudFBpcGU7XG59KCkpO1xuZXhwb3J0IHsgUGFyc2VIdG1sQ29udGVudFBpcGUgfTtcbiJdfQ==