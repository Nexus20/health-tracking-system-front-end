//Read
export class GetHospitals {
    static readonly type = '[Hospitals] Fetch';

    constructor(public queryParams?: {}) {
    }
}

export class GetHospitalById {
    static readonly type = '[Hospitals] GetById';

    constructor(public id: string) {
    }
}

//Create
export class AddHospital {
    static readonly type = '[Hospitals] Add';

    constructor(public payload: any) {
    }
}

//Update
export class UpdateHospital {
    static readonly type = '[Hospitals] Update';

    constructor(public payload: any, public id: string, public i: number) {
    }
}

//Delete
export class DeleteHospital {
    static readonly type = '[Hospitals] Delete';

    constructor(public id: string) {
    }
}
