import {Component, OnInit} from '@angular/core';
import {IDoctorResult} from "../../hospitals/models/IDoctorResult";
import {Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UpdateDoctor} from "../state/doctor.actions";

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss']
})
export class DoctorEditComponent implements OnInit {

    doctor!: IDoctorResult;
    editDoctorForm!: FormGroup;

    constructor(private store: Store, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({doctor}) => {
            this.doctor = doctor;
            console.log(doctor);
            this.initForm();
        })
    }

    initForm(): void {
        this.editDoctorForm = this.formBuilder.group({
            firstname: new FormControl(this.doctor.firstName, Validators.required),
            lastname: new FormControl(this.doctor.lastName, Validators.required),
            patronymic: new FormControl(this.doctor.patronymic, Validators.required),
            phone: new FormControl(this.doctor.phone, Validators.required),
            email: new FormControl(this.doctor.email, [Validators.required, Validators.email]),
            birthDate: new FormControl(this.doctor.birthDate, Validators.required),
            hospitalId: new FormControl(this.doctor.hospitalId, Validators.required)
        });
    }

    submitForm() {
        if (!this.editDoctorForm.valid)
            return;

        console.log(this.editDoctorForm.value);

        this.store.dispatch(new UpdateDoctor(this.doctor.id, this.editDoctorForm.value))
            .subscribe(() => {
                console.log("doctor updated");
                this.router.navigate(['/doctors']);
            });
    }
}
