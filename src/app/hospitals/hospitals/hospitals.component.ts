import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {GetHospitals} from "../states/hospital.actions";
import {HospitalState} from "../states/hospital.state";
import {Observable} from "rxjs";
import {IHospitalResult} from "../models/hospital.result";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {

    hospitals!: IHospitalResult[];
    @Select(HospitalState.selectHospitalsFromState) hospitalsSelector!: Observable<IHospitalResult[]>

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
