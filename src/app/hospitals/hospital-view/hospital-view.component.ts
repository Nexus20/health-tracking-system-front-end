import {Component, OnInit} from '@angular/core';
import {IHospitalResult} from "../models/hospital.result";
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {HospitalState} from "../states/hospital.state";
import {map} from "rxjs";

@Component({
  selector: 'app-hospital-view',
  templateUrl: './hospital-view.component.html',
  styleUrls: ['./hospital-view.component.scss']
})
export class HospitalViewComponent implements OnInit {

    hospitalInfo!: IHospitalResult;
    hospitalId!: string;

    constructor(private store: Store, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.hospitalId = this.activatedRoute.snapshot.params['id'];
        this.store.select(HospitalState.selectHospitalById)
            .pipe(map(filter => filter(this.hospitalId)))
            .subscribe(data => {
                this.hospitalInfo = data;
                console.log(data);
            })
    }
}
