import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ECElementEvent, EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart-with-filter',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective,],
  templateUrl: './chart-with-filter.component.html',
  styleUrl: './chart-with-filter.component.css'
})
export class ChartWithFilterComponent implements OnInit {

  color1!: string;
  color2!: string;
  color3!: string;
  widgetKey!: string;
  legendList = ["2021", "2022", "2023"];
  selectedyears : { [key: number]: boolean } = { "2021": true, "2022": true, "2023": true };
  storedSettings = {
    "years": [
      {
        "year": "2021",
        "selected": true
      },
      {
        "year": "2022",
        "selected": true
      },
      {
        "year": "2023",
        "selected": true
      }
    ]
  }

  options!: EChartsOption

  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.widgetKey = params['id'];
      if (this.widgetKey)
        this.selectedyears = this.readLocalStorage(this.widgetKey)

      this.color1 = this.isHexColor(params['color1']) ? `#${params['color1']}` : "#5470C6"
      this.color2 = this.isHexColor(params['color2']) ? `#${params['color2']}` : "#91CC75";
      this.color3 = this.isHexColor(params['color3']) ? `#${params['color3']}` : "#FAC858";

      this.prepareChartsOptions();
    });
  }

  prepareChartsOptions() {
    this.options = {
      legend: {
        data: this.legendList,
        selected: this.selectedyears
      },
      color: [this.color1, this.color2, this.color3],
      tooltip: {},
      dataset: {
        source: [
          ['features', '2021', '2022', '2023'],
          ['XMS40', 43.3, 85.8, 93.7],
          ['PS', 83.1, 73.4, 55.1],
          ['FCS', 86.4, 65.2, 82.5],
          ['FRS', 72.4, 53.9, 39.1],
        ],
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
    };
  }

  onFilterChanged($event: any) {
    this.selectedyears = $event.selected;
    this.storedSettings.years.forEach(element => {
      element.selected = this.selectedyears[parseInt(element.year)];
    });
    localStorage.setItem(this.widgetKey,JSON.stringify(this.storedSettings))
  }

  mergeOptions!: EChartsOption;


  RandomDataset() {
    this.mergeOptions = {
      dataset: {
        source: [
          ['features', '2021', '2022', '2023'],
          ['XMS40', ...this.getRandomValues()],
          ['PS', ...this.getRandomValues()],
          ['FCS', ...this.getRandomValues()],
          ['FRS', ...this.getRandomValues()],
        ],
      },
    };
  }

  private getRandomValues() {
    const res: number[] = [];
    for (let i = 0; i < 3; i++) {
      res.push(Math.random() * 100);
    }
    return res;
  }

  isHexColor(color: string) {
    return /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(color);
  }

  readLocalStorage(widgetKey: string): any {
    let storedSettings = localStorage.getItem(widgetKey)
    if (storedSettings) {
      let settings = JSON.parse(storedSettings);
      console.log(settings)
      settings = Object.fromEntries(settings.years?.map((item: any) => [item.year, item.selected]));
      return settings;
    }
    return this.selectedyears;
  }

  //not used currently
  updateChart(selectedyears: any) {
    console.log(selectedyears)
    this.mergeOptions = {
      legend: {
        data: this.legendList,
        selected: selectedyears
      }
    }
  }
}
