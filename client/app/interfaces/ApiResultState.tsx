export interface IApiResultState {
    isloading: boolean;
    isloaded: boolean;
    succeeded: boolean;
    value: any;
    setIsloading: () => void;
    setIsSucceededloaded: (value: any) => void;
    setIsFailedloaded: () => void;
}

export class ApiResultState implements IApiResultState {
    constructor() {
        this.isloading = false;
        this.isloaded = false;
        this.succeeded = false;
        this.value = null;
    }

    isloading: boolean;
    isloaded: boolean;
    succeeded: boolean;
    value: any;

    setIsloading() {
        this.isloading = true;
    }

    setIsSucceededloaded(value: any) {
        this.isloading = false;
        this.isloaded = true;
        this.succeeded = true;
        this.value = value;
    }

    setIsFailedloaded() {
        this.isloading = false;
        this.isloaded = true;
        this.succeeded = false;
    }
}