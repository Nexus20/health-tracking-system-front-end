//Read
export class GetPatientCaretakers {
    static readonly type = '[PatientCaretakers] Fetch';

    constructor(public queryParams?: {}) {
    }
}

export class GetPatientCaretakerById {
    static readonly type = '[PatientCaretakers] GetById';

    constructor(public id: string) {
    }
}

export class GetPatientCaretakerByPatientId {
    static readonly type = '[PatientCaretakers] GetByPatientId';

    constructor(public patientId: string) {
    }
}

// Create
export class AddCaretakerToPatient {

    static readonly type = '[PatientCaretakers] Add to patient';

    constructor(public id: string, public payload: any) {
    }
}
