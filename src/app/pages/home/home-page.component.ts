import { Component } from '@angular/core';
import { BasketWidgetComponent } from '../../shared/widgets/basket-widget/basket-widget.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports:[BasketWidgetComponent]
})
export class HomePageComponent {

}
