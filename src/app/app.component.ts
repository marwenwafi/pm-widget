import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartWithFilterComponent } from './chart-with-filter/chart-with-filter.component';
import { provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChartWithFilterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    provideEcharts(),
  ]
})
export class AppComponent implements OnInit {


  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      console.log('You are on the browser,You are good to go')
      } else {
      console.log('You are on the server,Cannot execute')
     }
  }
  title = 'pm-widget';
}
