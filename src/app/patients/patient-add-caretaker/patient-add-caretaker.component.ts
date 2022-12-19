import {Component, OnInit} from '@angular/core';
import {IPatientResult} from "../../hospitals/models/IPatientResult";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {AddCaretakerToPatient} from "../../patient-caretakers/state/patient-caretaker.actions";

@Component({
  selector: 'app-patient-add-caretaker',
  templateUrl: './patient-add-caretaker.component.html',
  styleUrls: ['./patient-add-caretaker.component.scss']
})
export class PatientAddCaretakerComponent implements OnInit {

    patient!: IPatientResult;
    addCaretakerForm!: FormGroup;

    constructor(private store: Store, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({patient}) => {
            this.patient = patient;
            this.createForm();
        });
    }

    private createForm() {
        this.addCaretakerForm = this.formBuilder.group({
            firstname: new FormControl("", Validators.required),
            lastname: new FormControl("", Validators.required),
            patronymic: new FormControl("", Validators.required),
            phone: new FormControl("", Validators.required),
            email: new FormControl("", [Validators.required, Validators.email]),
            birthDate: new FormControl(""),
            password: new FormControl("", Validators.required),
            patientsIds: new FormControl([this.patient.id], Validators.required)
        });
    }

    submitForm() {

        if(!this.addCaretakerForm.valid)
            return;

        console.log(this.addCaretakerForm.value);

        this.store.dispatch(new AddCaretakerToPatient(this.patient.id, this.addCaretakerForm.value)).subscribe(() => {
            this.router.navigate(['/patients/' + this.patient.id]);
        });
    }
}
