import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min';
import {RequestsService} from '../requests/requests.service';
import {UserInformationService} from '../services/user-information.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {

  @Input('data') data;
  constructor(
    private userInfo: UserInformationService,
    private request: RequestsService
  ) { }

  ngAfterViewInit() {
    let dataPoints = [];
    let monthCount = {};
    for(let user of this.data) {
      for(let outfit of user.outfits) {
        if(monthCount[this.toMonthStr(outfit.dateWorn)]) {
          monthCount[this.toMonthStr(outfit.dateWorn)] += 1;
        } else {
          monthCount[this.toMonthStr(outfit.dateWorn)] = 1;
        }
      }
    }
    for(let month in monthCount) {
      dataPoints.push({y: monthCount[month], label: month});
    }
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Outfits Worn Vs Month"
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }]
    });

    chart.render();
    console.log(dataPoints);
    console.log(this.data);
  }

  public deleteUser(index: number) {
    this.request.deleteUser(this.userInfo.authenticationToken, this.data[index]._id).subscribe((data:any) => {
      if(data.success) {
        this.data.splice(index, 1);
      }
    });
  }

  public toMonthStr(dateStr): string {
    return new Intl.DateTimeFormat('en-US', {month: 'long'}).format(new Date(dateStr));
  }

  public toReadableStr(dateStr): string {
    return (new Date(dateStr)).toDateString();
  }
}
