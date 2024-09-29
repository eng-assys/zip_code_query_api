import { BadRequestException } from '@nestjs/common';
import { HttpStatusCode } from 'axios';

export class UserNotFoundException extends BadRequestException {
  constructor(errorData = {}, message = 'User not found') {
    super({
      statusCode: HttpStatusCode.BadRequest,
      type: 'UserNotFoundException',
      message,
      ...errorData,
    });
  }
}
