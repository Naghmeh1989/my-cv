import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService){}
  getHello(): string {
    return 'Hello World!';
  }

  sendMail():void {
    this.mailerService.sendMail({
      to:"n.abdolkarim@gmail.com",
      from:"'No Reply' <noreply@example.com>",
      subject:"",
      text:"",
      html:""
    });
  }
}
