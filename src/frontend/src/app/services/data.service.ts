import { Injectable } from '@angular/core';
import { parseISO, isValid } from 'date-fns';


interface Attribute {
  name: string,
  type: string,
  value: any
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public getAttributes(data: any[]): Attribute[] {
    if(data.length == 0) {
      return [];
    }
    let attributeNames = this.getAttributeNames(data);
    
    return this.getAttributeByNames(data, attributeNames);
  }

  public getAttributeNames(data: any[]): string[] {
    let attributeNames: string[] = [];
    let first = data[0];

    for (let key in first) {
      if (first.hasOwnProperty(key)) {
        attributeNames.push(key);
      }
    }

    return attributeNames;
  }

  private getAttributeByNames(data: any[], attributeNames: string[]): Attribute[] {
    let result: Attribute[] = [];

    for (let item of data) {
      for (let name of attributeNames) {
        const [type, value] = this.parseItem(item[name]);
        let subresult: Attribute = { name, type, value }
        result.push(subresult);
      }
    }

    return result;
  }

  public getAttributeValuesByName(attributes: Attribute[], attributeName: string): [] {
    return attributes
      .filter(attribute => attribute.name === attributeName)
      .map(attribute => attribute.value) as [];
  } 

  public getAttributeNamesExceptDate(data: any[]): string[] {
    let first = data[0];
    let attributes = this.getAttributes([first]);

    return attributes
      .filter(attribute => attribute.type !== 'date')
      .map(attribute => attribute.name);
  }

  private parseItem(arg0: string): [string, any] {
    if (this.isNumber(arg0)) {
      return ['number', Number(arg0)];
    }
    if (this.isDate(arg0)) {
        return ['date', parseISO(arg0)];
    } 
  
    return ['string', arg0]
  }

  private isNumber(str: string): boolean {
    const pattern = /^[+-]?\d+(\.\d+)?$/;

    return pattern.test(str);
  }
  
  
  private isDate(str: string) {
    const date = parseISO(str);

    return isValid(date);
  }
}
