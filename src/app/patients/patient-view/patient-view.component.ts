import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {IPatientResult} from "../../hospitals/models/IPatientResult";
import {environment} from "../../../environments/environment";
import {SignalrClient, SignalrConnection} from "ngx-signalr-websocket";
import {HttpClient} from "@angular/common/http";
import {EcgPointModel, HeartRateModel} from "../../core/models/EcgPointModel";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {AuthState} from "../../users/states/auth.state";
import {IDoctorResult} from "../../hospitals/models/IDoctorResult";
import {GetDoctorById} from "../../doctors/state/doctor.actions";
import {map} from "rxjs";
import {DoctorState} from "../../doctors/state/doctor.state";

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {

    patient!: IPatientResult;
    patientDoctor!: IDoctorResult;
    isUserHospitalDoctor: boolean = false;
    isUserHospitalAdmin: boolean = false;

    private api = environment.api;
    private signalRClient: SignalrClient;
    private signalRConnection!: SignalrConnection;

    public ecgData: EcgPointModel[] = [];
    public currentHeartRate: number = 0;
    chartLegend: boolean = true;

    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
    public lineChartData: ChartConfiguration<'line'>['data'] = {
        labels: [],
        datasets: [
            {
                data: [],
                label: 'ECG',
                fill: false,
                tension: 0.5,
                borderColor: 'black',
            },
        ],
    };
    public lineChartOptions: ChartOptions<'line'> = {
        responsive: true,
        scales: {
            y: {
                min: -40,
                max: 120
            }
        }
    };

    constructor(private store: Store, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
        this.signalRClient = SignalrClient.create(httpClient);
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({patient}) => {
            this.patient = patient;
            console.log(patient);

            this.isUserHospitalDoctor = this.store.selectSnapshot(AuthState.doctorId) !== undefined;

            if(this.isUserHospitalDoctor) {
                this.connectToSignalRHub();
            }

            this.isUserHospitalAdmin = this.store.selectSnapshot(AuthState.hospitalAdministratorId) !== undefined;

            if(this.patient.doctorId !== null) {
                this.store.dispatch(new GetDoctorById(this.patient.doctorId!)).pipe(
                    map(() => this.store.selectSnapshot(DoctorState.selectDoctorById(this.patient.doctorId!)))
                ).subscribe(data => {
                   this.patientDoctor = data;
                });
            }
        })
    }

    private connectToSignalRHub() : void {
        this.signalRClient.connect('https://localhost:7088/health-measurements').subscribe(data => {
            console.log("Connected to signalR client");
            this.signalRConnection = data;

            this.startHeartRateHttpRequest();
            this.signalRConnection.on<HeartRateModel[]>('TransferHeartRateData').subscribe(data => {
                this.currentHeartRate = data[0].heartRate;
            });

            this.startEcgHttpRequest();
            this.signalRConnection.on<EcgPointModel[]>('TransferEcgData').subscribe({
                next: data => {
                    const pointModel: EcgPointModel = {
                        x: data[0]['x'], y: data[0]['y']
                    };

                    if (this.ecgData.length > 100) {
                        this.ecgData.shift();
                        this.lineChartData.labels?.shift();
                        this.lineChartData.datasets[0].data.shift();
                    }

                    this.ecgData.push(pointModel);
                    this.lineChartData.labels?.push(pointModel.x);
                    this.lineChartData.datasets[0].data.push(pointModel.y);

                    this.chart?.update();
                },
                error: err => {
                    console.log("Received error");
                    console.log(err);
                }
            });
        });
    }

    private startEcgHttpRequest = () => {
        this.httpClient.get(`${this.api}chart/getEcg`)
            .subscribe(res => {
                console.log(res);
            })
    }

    private startHeartRateHttpRequest = () => {
        this.httpClient.get(`${this.api}chart/GetHeartRate`)
            .subscribe(res => {
                console.log(res);
            })
    }
}
