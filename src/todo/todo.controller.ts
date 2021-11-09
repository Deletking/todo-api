import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateTodoDto } from 'src/DTO/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('')
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Post()
  createNewTodo(@Body(ValidationPipe) data: CreateTodoDto) {
    this.todoService.createTodo(data);
  }
}
