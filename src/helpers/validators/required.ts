import {
    registerDecorator,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsRequiredConstraint implements ValidatorConstraintInterface {
    validate(value: any) {
        return value !== null;
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

export function Required(property: string) {
    return function (object, propertyName: string) {
        registerDecorator({
            name: 'isRequired',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            validator: IsRequiredConstraint,
        });
    };
}
