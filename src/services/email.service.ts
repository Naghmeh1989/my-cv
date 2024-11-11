import { Injectable } from  '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class EmailService {
  constructor(private readonly mailerService:MailerService){}

  async movieRecommendation(to:string,from:string,subject:string,context:Record<string,any>){
    this.mailerService.sendMail({
      to,
      from,
      subject,
      context
    })
  }
}