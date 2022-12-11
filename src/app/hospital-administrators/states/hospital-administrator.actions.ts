export class GetHospitalAdministrators {
    static readonly type = '[HospitalAdministrators] GetHospitalAdministrators'

    constructor(public hospitalId: string, public queryParams?: {}) {
    }
}

export class GetHospitalAdministratorById {

    static readonly type = '[HospitalAdministrators] GetById'

    constructor(public id: string) {
    }
}

//Create
export class AddHospitalAdministrator {
    static readonly type = '[HospitalAdministrators] Add';

    constructor(public payload: any) {
    }
}
