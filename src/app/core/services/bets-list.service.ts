import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Lottery } from '../models/lottery.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + "/lottery";

@Injectable({
  providedIn: "root"
})
export class BetsListService {


  lotteries: Lottery[];
  private lotteriesUpdated = new Subject<Lottery[]>();

  constructor(private http: HttpClient) { }

  getLotteries() {
    this.http.get<{ message: string, result: any }>(BACKEND_URL).pipe(
      map(lotteryData => {
        return lotteryData.result.map(lottery => {
          return {
            id: lottery._id,
            fare: lottery.fare,
            closingDate: new Date(lottery.closingDate),
            firstPrize: lottery.firstPrize,
            secondPrize: lottery.secondPrize,
            thirdPrize: lottery.thirdPrize,
            creationDate: new Date(lottery.creationDate),
            open: lottery.open
          };
        });
      })
    ).subscribe(transformedLotteries => {
      this.lotteries = transformedLotteries;
      this.lotteriesUpdated.next([...this.lotteries]);
    });
  }

  getLotteryUpdateListener() {
    return this.lotteriesUpdated.asObservable();
  }
}
