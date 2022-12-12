import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {IPatientResult} from "../../hospitals/models/IPatientResult";
import {UpdatePatient} from "../state/patient.actions";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {

    patient!: IPatientResult;
    editPatientForm!: FormGroup;

    constructor(private store: Store, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({patient}) => {
            this.patient = patient;
            console.log(patient);
            this.initForm();
        })
    }

    initForm(): void {
        this.editPatientForm = this.formBuilder.group({
            firstname: new FormControl(this.patient.firstName, Validators.required),
            lastname: new FormControl(this.patient.lastName, Validators.required),
            patronymic: new FormControl(this.patient.patronymic, Validators.required),
            phone: new FormControl(this.patient.phone, Validators.required),
            email: new FormControl(this.patient.email, [Validators.required, Validators.email]),
            birthDate: new FormControl(this.patient.birthDate, Validators.required),
            hospitalId: new FormControl(this.patient.hospitalId, Validators.required)
        });
    }

    submitForm() {
        if (!this.editPatientForm.valid)
            return;

        console.log(this.editPatientForm.value);

        this.store.dispatch(new UpdatePatient(this.patient.id, this.editPatientForm.value))
            .subscribe(() => {
                console.log("patient updated");
                this.router.navigate(['/patients']);
            });
    }
}
