// TODO: Create interfaces for various data types :)


/** Interface for promises returned by asynchronous calls */
export interface PromiseType<T> {

    /** A successful request will run the callback function defined in this function
     *
     * @param callback A function with the response as the first parameter
     */
    then(callback: (T) => void): PromiseType<T>;

    /** An unsuccessful request will run the callback function defined in this function
     *
     * @param callback A function with the response as the first parameter
     */
    catch(callback: (any) => void): PromiseType<T>;
}


/** Interface representing the node-uuid library */
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


/** Interface representing the axios library */
export interface Axios {
    post(url: string, data?: Object, configuration?: Object): PromiseType<any>;
    put(url: string, data?: Object, configuration?: Object): PromiseType<any>;
    get(url: string, configuration?: Object): PromiseType<any>;
    delete(url: string, configuration?: Object): PromiseType<any>;
}


export interface AccountBasic {
    ab_id: string;
    address?: string;
    city?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phonenum?: string;
    state?: string;
    zip?: string;
}

export interface AccountCredentials {
    a_tfa_type: number;
    a_uuid: string;
    attemptsRemaining: number;
    isLocked: boolean;
    password: string;
    userName: string;
}

export interface AccountRole {
    ar_uuid: string;
    roleName: string;
}

export interface Account {
    accountBasic: AccountBasic;
    accountCredentials: AccountCredentials;
    accountRole: AccountRole;
}

export interface Container {
    container_name: string;
    enfaas_files: Array<SecureDBFileDescription>
}

export interface SecureDBFileDescription {
    file_len: number;
    file_ext: string;
    file_name: string;
    file_type: string;
    file_desc: string;
    file_uuid: string;
    file_lastmodified: string;
}

/** A file is a blob with a name and last modified date */
export interface SecureDBFile extends File {
    uuid: string;
}

/** Data with an uuid from SecureDB */
export interface SecureDBBlob extends Blob {
    uuid: string;
}