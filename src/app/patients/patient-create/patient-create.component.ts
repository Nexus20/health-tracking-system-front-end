import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {ProfileState} from "../../profile/state/profile.state";
import {AddPatient} from "../state/patient.actions";
import {AuthState} from "../../users/states/auth.state";

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.scss']
})
export class PatientCreateComponent implements OnInit {

    addPatientForm!: FormGroup;
    private hospitalId!: string;
    private doctorId: string | null = null;

    constructor(private store: Store, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        const adminHospitalId = this.store.selectSnapshot(ProfileState.selectAdministratorHospitalId);
        if(adminHospitalId === undefined) {
            this.hospitalId = this.store.selectSnapshot(ProfileState.selectDoctorHospitalId)!;
        } else {
            this.hospitalId = adminHospitalId;
        }

        this.doctorId = this.store.selectSnapshot(AuthState.doctorId) ?? null;
        console.log(this.hospitalId);
        this.initForm();
    }

    submitForm() {
        if(!this.addPatientForm.valid)
            return;

        console.log(this.addPatientForm.value);

        this.store.dispatch(new AddPatient(this.addPatientForm.value))
            .subscribe(() => {
                this.addPatientForm.reset();
                this.router.navigate([`/patients`]);
            })
    }

    initForm(): void {
        this.addPatientForm = this.formBuilder.group({
            firstname: new FormControl("", Validators.required),
            lastname: new FormControl("", Validators.required),
            patronymic: new FormControl("", Validators.required),
            phone: new FormControl("", Validators.required),
            email: new FormControl("", [Validators.required, Validators.email]),
            birthDate: new FormControl(""),
            password: new FormControl("", Validators.required),
            hospitalId: new FormControl(this.hospitalId, Validators.required),
            doctorId: new FormControl(this.doctorId)
        });
    }
}
