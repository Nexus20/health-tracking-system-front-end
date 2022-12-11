import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {IDoctorResult} from "../../hospitals/models/IDoctorResult";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

    doctors!: IDoctorResult[];

    constructor(private store: Store, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({doctors}) => {
            this.doctors = doctors;
            console.log(doctors);
        })
    }
}
