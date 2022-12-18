import {Component, OnInit} from '@angular/core';
import {IPatientResult} from "../../hospitals/models/IPatientResult";
import {Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {IDoctorResult} from "../../hospitals/models/IDoctorResult";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddDoctorToPatient} from "../state/patient.actions";

@Component({
  selector: 'app-patient-add-doctor',
  templateUrl: './patient-add-doctor.component.html',
  styleUrls: ['./patient-add-doctor.component.scss']
})
export class PatientAddDoctorComponent implements OnInit {

    patient!: IPatientResult;
    doctors!: IDoctorResult[];

    addDoctorForm!: FormGroup;

    constructor(private store: Store, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({patient}) => {
            this.patient = patient;
        });

        this.activatedRoute.data.subscribe(({doctors}) => {
            this.doctors = doctors;
            this.createForm();
        });
    }

    private createForm(): void {

        this.addDoctorForm = this.formBuilder.group({
            doctorId: new FormControl('', Validators.required),
        });
    }

    submitForm() {

        if(!this.addDoctorForm.valid)
            return;

        console.log(this.addDoctorForm.value);

        this.store.dispatch(new AddDoctorToPatient(this.patient.id, this.addDoctorForm.value)).subscribe(() => {
            this.router.navigate(['/patients/' + this.patient.id]);
        });
    }
}
