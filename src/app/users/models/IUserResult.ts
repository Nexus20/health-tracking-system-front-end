import {IBaseResult} from "../../core/models/IBaseResult";

export interface IUserResult extends IBaseResult {
    phone: string;
    email: string;
}
