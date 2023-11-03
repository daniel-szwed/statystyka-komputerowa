import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../services/statistic.service';
import { DataService } from '../services/data.service';
import { MatTableDataSource } from '@angular/material/table';

interface Stats {
  name: string;
  mean: number;
  geometricMean: number;
  median: number;
  mode: number;
  standardDeviation: number;
  variance: number;
  min: number;
  max: number;
  sum: number;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit{
  matTableData: Stats[];
  displayedColumns: string[] = [
    'name', 
    'mean', 
    'geometricMean', 
    'median', 
    'mode', 
    'standardDeviation', 
    'variance', 
    'min',
    'max',
    'sum'];
  dataSource: MatTableDataSource<Stats>;

  constructor(
    private readonly statistic: StatisticService,
    private readonly dataExtractor: DataService) { 
      this.matTableData = [];
      this.dataSource = new MatTableDataSource<Stats>(this.matTableData);
    }

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('data')!);
    const attributes = this.dataExtractor.getAttributes(data);
    const attributeNames = this.dataExtractor.getAttributeNamesExceptDate(data);
    for (let attributeName of attributeNames) {
      console.log(attributeName);
      const attributeValues = this.dataExtractor.getAttributeValuesByName(attributes, attributeName);
      const statistic = this.statistic.getStatistic(attributeValues);
      this.matTableData.push({ name: attributeName, ...statistic })
    }
  }
}
