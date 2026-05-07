import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { Kitchen } from "../../interfaces/interfaces";

@Injectable({
  providedIn: "root"
})

export class KitchenService {
  private http = inject(HttpClient)

  getKitchens(): Observable<Kitchen[]> {
    return this.http.get<Kitchen[]>('/api/kitchens')
  }

  getKitchenByID(id: string): Observable<Kitchen> {
    return this.http.get<Kitchen>(`/api/kitchens/${id}`)
  }
}
