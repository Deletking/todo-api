/* eslint-disable prettier/prettier */
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { todoStatus } from 'src/Entity/todo.entity';

export class TodoStatusValidationPipe implements PipeTransform {
  readonly allowedStatus: todoStatus[] = [
    todoStatus.OPEN,
    todoStatus.WIP,
    todoStatus.COMPLETED,
  ];

  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status.`);
    }
    
    return value;
  }
  
  private isStatusValid(status: any): boolean {
    const index: number = this.allowedStatus.indexOf(status);
    return index !== -1;
  }
}
