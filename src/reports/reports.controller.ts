import { Controller, Post, Body, Param, Patch, UseGuards} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { User } from 'src/users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interseptor';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService:ReportsService){}
  @Post()
  @Serialize(ReportDto)
  @UseGuards(AuthGuard)
  createReport(@Body() body:CreateReportDto,@CurrentUser() user:User){
    return this.reportsService.create(body,user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id:string,@Body() body:ApproveReportDto){
    return this.reportsService.changeApproval(id,body.approved);
  }
}
