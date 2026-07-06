
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent{

    isLoading=false;

    constructor(private loader:LoaderService){

        this.loader.loading$.subscribe(value=>{

            this.isLoading=value;

        });

    }

}