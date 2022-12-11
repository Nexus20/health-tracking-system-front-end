import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IHospitalAdministratorResult} from "../../hospitals/models/IHospitalAdministratorResult";

@Component({
  selector: 'app-hospital-administrator-view',
  templateUrl: './hospital-administrator-view.component.html',
  styleUrls: ['./hospital-administrator-view.component.scss']
})
export class HospitalAdministratorViewComponent implements OnInit {

    hospitalAdministratorInfo!: IHospitalAdministratorResult;

    constructor(private activatedRoute: ActivatedRoute) {
    }


    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({administrator}) => {
            this.hospitalAdministratorInfo = administrator;
            console.log(administrator);
        })
    }
}
