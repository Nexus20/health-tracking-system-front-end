import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {IPatientResult} from "../../hospitals/models/IPatientResult";

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {

    patient!: IPatientResult;

    constructor(private store: Store, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({patient}) => {
            this.patient = patient;
            console.log(patient);
        })
    }
}
