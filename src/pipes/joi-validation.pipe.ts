import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

const JoiConfig = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, JoiConfig);

    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      throw new BadRequestException({ message }, 'Validation failed');
    }
    return value;
  }
}
