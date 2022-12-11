import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {IHospitalAdministratorResult} from "../models/IHospitalAdministratorResult";

@Component({
    selector: 'app-hospital-view-administrators',
    templateUrl: './hospital-view-administrators.component.html',
    styleUrls: ['./hospital-view-administrators.component.scss']
})
export class HospitalViewAdministratorsComponent implements OnInit {

    hospitalAdministrators!: IHospitalAdministratorResult[];

    constructor(private store: Store, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({administrators}) => {
            this.hospitalAdministrators = administrators;
            console.log(administrators);
        })
    }
}
