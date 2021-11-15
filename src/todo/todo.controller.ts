/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { CreateTodoDto } from 'src/DTO/create-todo.dto';
import { todoStatus } from 'src/Entity/todo.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidationPipe.pipe';
import { TodoService } from './todo.service';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('')
  getAllTodos(@User() user: UserEntity) {
    return this.todoService.getAllTodos(user);
  }

  @Post()
  createNewTodo(@Body(ValidationPipe) data: CreateTodoDto,
                @User() user: UserEntity) {
    this.todoService.createTodo(data, user);
  }

  @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: todoStatus,
    @Param('id') id: number,
    @User() user: UserEntity
  ) {
    return this.todoService.update(id, status, user);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number,
             @User() user: UserEntity) {
    return this.todoService.delete(id, user)
  }
}
