import { EventEmitter, OnInit } from '@angular/core';
import { FormioAlerts } from './formio.alerts';
import * as ɵngcc0 from '@angular/core';
export declare class FormioAlertsComponent implements OnInit {
    alerts: FormioAlerts;
    focusComponent: EventEmitter<object>;
    ngOnInit(): void;
    getComponent(event: any, alert: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FormioAlertsComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FormioAlertsComponent, "formio-alerts", never, { "alerts": "alerts"; }, { "focusComponent": "focusComponent"; }, never, never>;
}

//# sourceMappingURL=formio.alerts.component.d.ts.map