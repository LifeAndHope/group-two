import {UUIDGenerator} from "./interfaces";

export interface Sponsor {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    join_date: Date;
    address: string;
}

export interface Child {
    id: string;
    first_name: string;
    last_name: string;
    sex: string;
    date_of_birth: Date;
    account_number: string;
    school_id: string;
    description: string;
}

export interface Note {
    table_name: string;
    instance_id: string;
    text: string;
    date: Date;
}

export interface Transaction {
    id: string;
    date: Date;
    amount: string;
    child: string;
    sponsor: string;
    receipt: string;
}

export declare function axios(configuration: Object):Promise<any>;
export declare class Axios {
    post(url: string, data?: Object, configuration?: Object): Promise<any>;
    put(url: string, data?: Object, configuration?: Object): Promise<any>;
    get(url: string, configuration?: Object): Promise<any>;
    delete(url: string, configuration?: Object): Promise<any>;
}


interface Thenable<T> {
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Thenable<U>;
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): Thenable<U>;
    catch<U>(onRejected?: (error: any) => U | Thenable<U>): Thenable<U>;
}

export declare class Promise<T> implements Thenable<T> {
    /**
     * If you call resolve in the body of the callback passed to the constructor,
     * your promise is fulfilled with result object passed to resolve.
     * If you call reject your promise is rejected with the object passed to reject.
     * For consistency and debugging (eg stack traces), obj should be an instanceof Error.
     * Any errors thrown in the constructor callback will be implicitly passed to reject().
     */
    constructor(callback: (resolve : (value?: T | Thenable<T>) => void, reject: (error?: any) => void) => void);

    /**
     * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
     * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
     * Both callbacks have a single parameter , the fulfillment value or rejection reason.
     * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
     * If an error is thrown in the callback, the returned promise rejects with that error.
     *
     * @param onFulfilled called when/if "promise" resolves
     * @param onRejected called when/if "promise" rejects
     */
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Promise<U>;
    then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): Promise<U>;

    /**
     * Sugar for promise.then(undefined, onRejected)
     *
     * @param onRejected called when/if "promise" rejects
     */
    catch<U>(onRejected?: (error: any) => U | Thenable<U>): Promise<U>;
}

export declare namespace Promise {
    /**
     * Make a new promise from the thenable.
     * A thenable is promise-like in as far as it has a "then" method.
     */
    function resolve<T>(value?: T | Thenable<T>): Promise<T>;

    /**
     * Make a promise that rejects to obj. For consistency and debugging (eg stack traces), obj should be an instanceof Error
     */
    function reject(error: any): Promise<any>;
    function reject<T>(error: T): Promise<T>;

    /**
     * Make a promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects.
     * the array passed to all can be a mixture of promise-like objects and other objects.
     * The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value.
     */
    function all<T>(promises: (T | Thenable<T>)[]): Promise<T[]>;

    /**
     * Make a Promise that fulfills when any item fulfills, and rejects if any item rejects.
     */
    function race<T>(promises: (T | Thenable<T>)[]): Promise<T>;
}