import {Component, OnInit} from '@angular/core';
import {IDoctorResult} from "../../hospitals/models/IDoctorResult";
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.scss']
})
export class DoctorViewComponent implements OnInit {

    doctor!: IDoctorResult;

    constructor(private store: Store, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({doctor}) => {
            this.doctor = doctor;
            console.log(doctor);
        })
    }
}
