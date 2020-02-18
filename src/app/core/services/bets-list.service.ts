import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

const BACKEND_URL = environment.apiUrl + "";

@Injectable({
  providedIn: "root"
})
export class BetsListService {
  constructor(public http: HttpClient) {}

  cargarBets() : any{
    return [
      {id: 1, fechaCreacion: new Date(), fechaCierre: new Date(), firstPrice: 10,
         secondPrice: 9, thirdPrice: 8, fare: 8, open: true},
         {id: 2, fechaCreacion: new Date(), fechaCierre: new Date(), firstPrice: 11,
          secondPrice: 10, thirdPrice: 8, fare: 8, open: false},
          {id: 3, fechaCreacion: new Date(), fechaCierre: new Date(), firstPrice: 10,
            secondPrice: 9, thirdPrice: 8, fare: 8, open: true}
    ];
  }
}


