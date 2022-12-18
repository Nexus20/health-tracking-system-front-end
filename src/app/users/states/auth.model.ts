export interface IAuthState {
    token: string,
    email: string,
    doctorId?: string,
    patientId?: string,
    hospitalAdministratorId?: string,
    patientCaretakerId?: string,
    roles?: [] | string,
    language: string
}
