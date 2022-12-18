import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {AuthState} from "../../users/states/auth.state";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        console.log(this.store.selectSnapshot(AuthState.isRoot));
    }
}
