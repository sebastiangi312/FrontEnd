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
    return this.http.get( BACKEND_URL );
  }

  deleteBets( bet: Bet){
    return this.http.delete(BACKEND_URL + `/${bet.id}`);


  }
}

export interface Bet {
  id: number,
  fechaCreacion: Date,
  fechaCierre: Date,
  firstPrice: number,
  secondPrice: number,
  thirdPrice: number,
  fare: number,
  open: Boolean
}
