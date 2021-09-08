import { Injectable } from "@angular/core";

@Injectable()
export class DialogDataService {
  dialogData: any;

  getDialogData() {
    return this.dialogData;
  }
}
