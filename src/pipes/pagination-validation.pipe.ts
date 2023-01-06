import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

export class PaginationValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const pagination = {
      limit: (value) => (value ? value : 5),
      offset: (value) => (value ? value : 0),
    };

    const result = pagination[metadata.data](value);

    return result;
  }
}
