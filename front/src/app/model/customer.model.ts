import { Privilege } from "./privilege.model";

export class Customer {
    _id: string;
    name: string;
    privileges: [Privilege];
}