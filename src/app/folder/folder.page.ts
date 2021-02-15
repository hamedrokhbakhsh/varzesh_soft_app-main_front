import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  faCoffee = faCoffee ;
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
