import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EcgPointModel} from "../../core/models/EcgPointModel";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {environment} from "../../../environments/environment";
import {SignalrClient, SignalrConnection} from "ngx-signalr-websocket";
import {Store} from "@ngxs/store";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile-health-measurements',
  templateUrl: './profile-health-measurements.component.html',
  styleUrls: ['./profile-health-measurements.component.scss']
})
export class ProfileHealthMeasurementsComponent implements OnInit {

    @Input() patientId!: string;

    public ecgData: EcgPointModel[] = [];
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

    private api = environment.api;
    private signalRClient: SignalrClient;
    private signalRConnection!: SignalrConnection;

    constructor(private store: Store, private httpClient: HttpClient) {
        this.signalRClient = SignalrClient.create(httpClient);
    }

    ngOnInit(): void {
        this.connectToSignalRHub();
    }

    private connectToSignalRHub() : void {
        this.signalRClient.connect('https://localhost:7088/health-measurements').subscribe(data => {
            console.log("Connected to signalR client");
            this.signalRConnection = data;

            this.startHttpRequest();

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

    private startHttpRequest = () => {
        this.httpClient.get(`${this.api}chart/getEcg`)
            .subscribe(res => {
                console.log(res);
            })
    }
}
