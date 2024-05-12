import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResponseController } from './user-response.controller';
import { UserResponseService } from './user-response.service';
import { UserResponse } from './entities/user-response.entity';
import { BooleanResponse } from './entities/boolean-response.entity';
import { DateResponse } from './entities/date-response.entity';
import { NumberResponse } from './entities/number-response.entity';
import { TextResponse } from './entities/text-response.entity';
import { ChoiceResponse } from './entities/choice-response.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserResponse,
      BooleanResponse,
      DateResponse,
      NumberResponse,
      TextResponse,
      ChoiceResponse,
    ]),
  ],
  controllers: [UserResponseController],
  providers: [UserResponseService],
  exports: [UserResponseService],
})
export class UserResponseModule {}
