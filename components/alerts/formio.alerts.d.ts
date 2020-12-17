import * as ɵngcc0 from '@angular/core';
export interface FormioAlert {
    type: string;
    message: string;
    component?: any;
}
export declare class FormioAlerts {
    alerts: FormioAlert[];
    setAlert(alert: FormioAlert): void;
    addAlert(alert: FormioAlert): void;
    setAlerts(alerts: FormioAlert[]): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FormioAlerts, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<FormioAlerts>;
}

//# sourceMappingURL=formio.alerts.d.ts.map