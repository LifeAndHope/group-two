// TODO: Create interfaces for various data types :)

/** Interface for promises returned by asynchronous calls */
export interface PromiseType {
    /** A successful request will run the callback function defined in this function
     *
     * @param callback A function with the response as the first parameter
     */
    then(callback: Function): PromiseType;

    /** An unsuccessful request will run the callback function defined in this function
     *
     * @param callback A function with the response as the first parameter
     */
    catch(callback: Function): PromiseType;
}

/** Interface for UUID generators */
export interface UUIDGenerator {
    /** Unique, but not secure */
    v1(): string;

    /** Quite unique, but deterministic */
    v3(): string;

    /** Unique and secure */
    v4(): string;

    /** Unique, but deterministic */
    v5(): string;
}


export interface Axios {
    post(url: string, data?: Object, configuration?: Object): PromiseType;
    get(url: string, data?: Object, configuration?: Object): PromiseType;
    put(url: string, data?: Object, configuration?: Object): PromiseType;
    delete(url: string, data?: Object, configuration?: Object): PromiseType;
}

export interface Object {}
export interface Function {}