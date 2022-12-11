import {Component, OnInit} from '@angular/core';
import {IHospitalResult} from "../models/hospital.result";
import {HospitalState} from "../states/hospital.state";
import {map} from "rxjs";
import {Store} from "@ngxs/store";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UpdateHospital} from "../states/hospital.actions";

@Component({
    selector: 'app-hospital-edit',
    templateUrl: './hospital-edit.component.html',
    styleUrls: ['./hospital-edit.component.scss']
})
export class HospitalEditComponent implements OnInit {

    hospitalInfo!: IHospitalResult;
    hospitalId!: string;
    editHospitalForm!: FormGroup;

    constructor(private store: Store, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.hospitalId = this.activatedRoute.snapshot.params['id'];
        this.store.select(HospitalState.selectHospitalById)
            .pipe(map(filter => filter(this.hospitalId)))
            .subscribe(data => {
                this.hospitalInfo = data;
                console.log(data);
            })

        this.initForm();
    }

    initForm(): void {
        this.editHospitalForm = this.formBuilder.group({
            name: new FormControl(this.hospitalInfo.name, Validators.required),
            address: new FormControl(this.hospitalInfo.address, Validators.required),
        });
    }

    editHospital() {
        if (!this.editHospitalForm.valid)
            return;

        console.log(this.editHospitalForm.value);

        this.store.dispatch(new UpdateHospital(this.hospitalId, this.editHospitalForm.value))
            .subscribe(() => {
                console.log("Hospital updated");
                this.router.navigate(['/hospitals']);
            });
    }
}
