import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { Restaurant } from "../../interfaces/interfaces";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: "root"
})

export class RestaurantService {
  private http = inject(HttpClient)

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('/api/restaurants')
  }

  getRestaurantByID(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`/api/restaurants/${id}`)
  }
}
