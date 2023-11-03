import { Injectable } from '@angular/core';
import * as ss from 'simple-statistics';


export interface SimpleStatistic {
  mean: number,
  geometricMean: number,
  median: number
  mode: number,
  variance: number,
  standardDeviation: number,
  min: number,
  max: number,
  sum: number,
}

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor() { }

  public getStatistic(data: []): SimpleStatistic {
    const simpleStatistic: SimpleStatistic = {
      mean: ss.mean(data),
      geometricMean: ss.geometricMean(data),
      median: ss.median(data),
      mode: ss.mode(data),
      standardDeviation: ss.standardDeviation(data),
      variance: ss.variance(data),
      min: ss.min(data),
      max: ss.max(data),
      sum: ss.sum(data)
    }
    
    return simpleStatistic;
  }
}
