import {Component, OnInit} from '@angular/core';
import {IHospitalResult} from "../models/hospital.result";
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {AuthState} from "../../users/states/auth.state";

@Component({
  selector: 'app-hospital-view',
  templateUrl: './hospital-view.component.html',
  styleUrls: ['./hospital-view.component.scss']
})
export class HospitalViewComponent implements OnInit {

    hospitalInfo!: IHospitalResult;
    hospitalId!: string;
    public isUserRoot: boolean = false;

    constructor(private store: Store, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({hospital}) => {
            this.hospitalInfo = hospital;
            this.isUserRoot = this.store.selectSnapshot(AuthState.isRoot);
        })
    }
}
