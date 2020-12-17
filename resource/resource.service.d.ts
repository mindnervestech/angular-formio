import { ApplicationRef, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormioResourceConfig } from './resource.config';
import { FormioResources } from './resources.service';
import { FormioPromiseService } from '../formio-promise.service';
import { FormioAlerts } from '../components/alerts/formio.alerts';
import { FormioAppConfig } from '../formio.config';
import { FormioRefreshValue } from '../formio.common';
import Promise from 'native-promise-only';
export declare class FormioResourceService {
    appConfig: FormioAppConfig;
    config: FormioResourceConfig;
    resourcesService: FormioResources;
    appRef: ApplicationRef;
    initialized: boolean;
    form: any;
    alerts: FormioAlerts;
    resource: any;
    resourceUrl?: string;
    formUrl: string;
    formFormio: FormioPromiseService;
    formio: FormioPromiseService;
    refresh: EventEmitter<FormioRefreshValue>;
    resourceLoading?: Promise<any>;
    resourceLoaded?: Promise<any>;
    resourceId?: string;
    resources: any;
    formLoading?: Promise<any>;
    formLoaded: Promise<any>;
    formResolve: any;
    formReject: any;
    isLoading: boolean;
    constructor(appConfig: FormioAppConfig, config: FormioResourceConfig, resourcesService: FormioResources, appRef: ApplicationRef);
    initialize(): void;
    init(): any;
    onError(error: any): void;
    onFormError(err: any): void;
    setContext(route: ActivatedRoute): void;
    loadForm(): any;
    loadParents(): any;
    onSubmissionError(err: any): void;
    loadResource(route: ActivatedRoute): any;
    save(resource: any): Promise<any>;
    remove(): Promise<void>;
}