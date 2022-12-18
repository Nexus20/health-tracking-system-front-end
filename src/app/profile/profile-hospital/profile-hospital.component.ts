import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {GetHospitalById} from "../../hospitals/states/hospital.actions";
import {map} from "rxjs";
import {HospitalState} from "../../hospitals/states/hospital.state";
import {IHospitalResult} from "../../hospitals/models/hospital.result";

@Component({
  selector: 'app-profile-hospital',
  templateUrl: './profile-hospital.component.html',
  styleUrls: ['./profile-hospital.component.scss']
})
export class ProfileHospitalComponent implements OnInit {

    @Input() hospitalId!: string;
    hospitalInfo!: IHospitalResult;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.store.dispatch(new GetHospitalById(this.hospitalId!)).pipe(
            map(() => this.store.selectSnapshot(HospitalState.selectHospitalById(this.hospitalId!)))
        ).subscribe(returnData => {
            this.hospitalInfo = returnData;
        })
    }
}
