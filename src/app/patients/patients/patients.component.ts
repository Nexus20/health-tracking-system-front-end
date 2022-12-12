import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {IPatientResult} from "../../hospitals/models/IPatientResult";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

    patients!: IPatientResult[];

    constructor(private store: Store, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({patients}) => {
            this.patients = patients;
            console.log(patients);
        })
    }
}
