import { Component, OnInit } from '@angular/core';
import { GuitarService } from 'src/app/services/guitar.service';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {
  guitars: any[] = [];

  constructor(private guitarService: GuitarService) {}

  ngOnInit(): void {
    this.guitarService.getAllGuitars().subscribe({
      next: (data) => {
        this.guitars = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
