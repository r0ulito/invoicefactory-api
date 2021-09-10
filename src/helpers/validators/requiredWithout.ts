import {
    registerDecorator,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsRequiredWithoutConstraint
    implements ValidatorConstraintInterface
{
    validate(value: any, args: ValidationArguments) {
        const relatedProperties = args.constraints;
        let relatedValues = [];
        relatedProperties.forEach((value) =>
            relatedValues.push((args.object as any)[value]),
        );
        relatedValues = relatedValues.filter(Boolean);
        return relatedValues.length == 0 && value !== undefined;
    }

    defaultMessage(args: ValidationArguments) {
        const relatedProperties = args.constraints;
        const property = args.property;
        console.log(args);
        return `${property} is required when ${relatedProperties.join(
            ' and ',
        )} are not set`;
    }
}

/**
 * Makes the annotated field required if all the fields in the array are not set
 *
 * @param {Array} properties - An array of fields to check if they have a value
 *
 */

export function RequiredWithout(properties: Array<string>) {
    return function (object, propertyName: string) {
        registerDecorator({
            name: 'isRequiredWithoutAll',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [...properties],
            validator: IsRequiredWithoutConstraint,
        });
    };
}
