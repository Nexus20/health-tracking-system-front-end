import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {IHospitalResult} from "../models/hospital.result";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {

    hospitals!: IHospitalResult[];

    constructor(private store: Store, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({hospitals}) => {
            this.hospitals = hospitals;
            console.log(hospitals);
        })
        // this.store.dispatch(new GetHospitals()).subscribe(() => {
        //     this.hospitalsSelector.subscribe(returnData => {
        //         this.hospitals = returnData;
        //         console.log(returnData);
        //     });
        // });
    }
}
