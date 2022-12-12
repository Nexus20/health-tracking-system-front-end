//Read
export class GetPatients {
    static readonly type = '[Patients] Fetch';

    constructor(public queryParams?: {}) {
    }
}

export class GetPatientById {
    static readonly type = '[Patients] GetById';

    constructor(public id: string) {
    }
}

//Create
export class AddPatient {
    static readonly type = '[Patients] Add';

    constructor(public payload: any) {
    }
}

//Update
export class UpdatePatient {
    static readonly type = '[Patients] Update';

    constructor(public id: string, public payload: any) {
    }
}

//Delete
export class DeletePatient {
    static readonly type = '[Patients] Delete';

    constructor(public id: string) {
    }
}
