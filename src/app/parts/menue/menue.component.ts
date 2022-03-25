import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from "@angular/router"
import { CoreService } from "../../services/core.service"
@Component({
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.scss']
})
export class MenueComponent implements OnInit {

  constructor(
    private router: Router,
    public coreService : CoreService
  ) { }

  ngOnInit() {
  }
}
