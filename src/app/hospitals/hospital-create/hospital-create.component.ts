import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {AddHospital} from "../states/hospital.actions";

@Component({
  selector: 'app-hospital-create',
  templateUrl: './hospital-create.component.html',
  styleUrls: ['./hospital-create.component.scss']
})
export class HospitalCreateComponent implements OnInit {
    addHospitalForm!: FormGroup;

    constructor(private store: Store, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.addHospitalForm = this.formBuilder.group({
            name: new FormControl("", Validators.required),
            address: new FormControl("", Validators.required),
        });
    }

    addHospital() {

        if(!this.addHospitalForm.valid)
            return;

        console.log(this.addHospitalForm.value)
        this.store.dispatch(new AddHospital(this.addHospitalForm.value)).subscribe(() => {
            this.addHospitalForm.reset();
            this.router.navigate(['/hospitals'])
        });
    }
}
