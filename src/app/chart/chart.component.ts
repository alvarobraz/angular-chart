import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { ChartService } from '../services/chart.service';
import { ICoins, IData } from '../types';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  title = 'ng-chart';
  chart: Chart<'line'> | null = null;
  result!: Partial<IData>;
  coinPrice!: number[];
  coinName!: string[];

  constructor(private service: ChartService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.service.cryptoData().subscribe((res) => {

      this.result = res;
      if(this?.result?.data?.coins.length) {
        this.coinPrice = this.result.data.coins.map((coins: ICoins) => coins.price);
        this.coinName = this.result.data.coins.map((coins: ICoins) => coins.name);
      }

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.coinName,
          datasets: [
            {
              data: this.coinPrice,
              borderColor: '#3e95cd',
              label: 'Coin Price',
              backgroundColor: 'rgba(93, 175, 89, 0.1)',
              borderWidth: 3,
            },
          ],
        },
      });
    });
  }
}
