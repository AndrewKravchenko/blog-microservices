import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;

  constructor() {
    super('Error connecting to db');
  }

  serializeErrors() {
    return [{ message: 'Error connecting to database' }];
  }
}
