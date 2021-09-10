import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsRequiredConstraint implements ValidatorConstraintInterface {
    validate(value: any) {
        return value !== undefined;
    }
    defaultMessage(args: ValidationArguments) {
        const property = args.property.split('_').join('');
        return `${property} is required`;
    }
}

/**
 * 
 * Makes the annotated field required
 * @param property name of the required property
 
 */

export function Required(validationOptions?: ValidationOptions) {
    return function (object, propertyName: string) {
        registerDecorator({
            name: 'isRequired',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [propertyName],
            validator: IsRequiredConstraint,
        });
    };
}
