//Read
export class GetDoctors {
    static readonly type = '[Doctors] Fetch';

    constructor(public queryParams?: {}) {
    }
}

export class GetDoctorById {
    static readonly type = '[Doctors] GetById';

    constructor(public id: string) {
    }
}

export class GetDoctorsByHospitalId {
    static readonly type = '[Doctors] GetByHospitalId';

    constructor(public hospitalId: string, public queryParams?: {}) {
    }
}

//Create
export class AddDoctor {
    static readonly type = '[Doctors] Add';

    constructor(public payload: any) {
    }
}

//Update
export class UpdateDoctor {
    static readonly type = '[Doctors] Update';

    constructor(public id: string, public payload: any) {
    }
}

//Delete
export class DeleteDoctor {
    static readonly type = '[Doctors] Delete';

    constructor(public id: string) {
    }
}
