import {
    registerDecorator,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'sequelize/types';

@ValidatorConstraint()
export class IsRequiredConstraint implements ValidatorConstraintInterface {
    validate(value: any) {
        if (value !== '') {
            return true;
        }
        if (value === undefined || value === '') {
            return false;
        }
        // return value !== undefined || value !== '';
    }
    defaultMessage(args: ValidationArguments) {
        const property = args.property.split('_').join('');
        return `${property} is required`;
    }
}

/**
 * 
 * Makes the annotated field required
 *
 
 */

export function Required() {
    return function (object: Model, propertyName: string) {
        registerDecorator({
            name: 'isRequired',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [propertyName],
            validator: IsRequiredConstraint,
        });
    };
}
