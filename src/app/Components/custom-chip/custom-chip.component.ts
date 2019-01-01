import { Component, ViewChild, ElementRef, Input, OnInit, Output,EventEmitter  } from '@angular/core';
import { MatChipInputEvent, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'custom-chip',
  templateUrl: './custom-chip.component.html',
  styleUrls: ['./custom-chip.component.css']
})
export class CustomChipComponent implements OnInit{
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  dataCtrl = new FormControl();

  @ViewChild('dataInput') dataInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Input("dataSource") dataSource:string[]=[];
  @Input("initValues") initValues:string[]=[];

  @Output("change")change=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  add(event: MatChipInputEvent): void {

    if (!this.matAutocomplete.isOpen) {
     this.dataCtrl.setValue(null);
    }
  }

  remove(item: string): void {
    const index = this.initValues.indexOf(item);

    if (index >= 0) {
      this.initValues.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.initValues.push(event.option.viewValue);
    this.dataInput.nativeElement.value = '';
    this.dataCtrl.setValue(null);
    this.change.emit(event.option.viewValue);
  }
}
