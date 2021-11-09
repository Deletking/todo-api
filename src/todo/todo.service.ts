import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity, todoStatus } from 'src/Entity/todo.entity';
import { CreateTodoDto } from 'src/DTO/create-todo.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}
  async getAllTodos() {
    return await this.repo.find();
  }
  async createTodo(createTodoDTO: CreateTodoDto) {
    const todo: TodoEntity = new TodoEntity();
    const { title, description } = createTodoDTO;
    todo.title = title;
    todo.description = description;
    todo.status = todoStatus.OPEN;

    this.repo.create(todo);
    await this.repo.save(todo);
  }
}
