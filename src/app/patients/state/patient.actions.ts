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

export class GetPatientsByHospitalId {
    static readonly type = '[Patients] GetByHospitalId';

    constructor(public hospitalId: string, public queryParams?: {}) {
    }
}

export class GetPatientsByDoctorId {
    static readonly type = '[Patients] GetPatientsByDoctorId';

    constructor(public doctorId: string, public queryParams?: {}) {
    }
}

export class GetPatientsByCaretakerId {
    static readonly type = '[Patients] GetPatientsByCaretakerId';

    constructor(public caretakerId: string, public queryParams?: {}) {
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

export class AddDoctorToPatient {

    static readonly type = '[Patients] Add doctor';

    constructor(public id: string, public payload: any) {
    }
}

//Delete
export class DeletePatient {
    static readonly type = '[Patients] Delete';

    constructor(public id: string) {
    }
}
