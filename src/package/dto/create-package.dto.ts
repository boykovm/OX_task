import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Transform } from 'class-transformer';

@ValidatorConstraint({ name: 'isPackageVersion', async: false })
export class IsPackageVersionConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (typeof text !== 'string') {
      return false;
    }

    if (text === 'latest') {
      return true;
    }

    return text.split('.').length === 3;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'version is incorrect format should be: [undefined, "0.0.0", "latest"]';
  }
}

export function IsPackageVersion(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPackageVersionConstraint,
    });
  };
}

export class CreatePackageDto {
  @ApiProperty({
    example: 'package-name',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : (value as unknown),
  )
  name: string;

  @ApiProperty({
    example: 'package-version',
    description: 'Package version, if not provided, will be set to latest',
  })
  @IsString()
  @IsPackageVersion()
  version: string = 'latest';
}
