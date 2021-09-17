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
        console.log('individual is: ', value);
        console.log('args are: ', args.constraints);
        const relatedProperties = args.constraints;
        let relatedValues = [];
        relatedProperties.forEach((value) =>
            relatedValues.push((args.object as any)[value]),
        );
        relatedValues = relatedValues.filter(Boolean);
        return value === undefined
            ? relatedValues.length > 0
            : relatedValues.length == 0 && value !== undefined;
    }

    defaultMessage(args: ValidationArguments) {
        const relatedProperties = args.constraints;
        const property = args.property;
        return `${property} is required when ${relatedProperties.join(
            ' and ',
        )} are not set`;
    }
}

/**
 * Makes the annotated field required only when all of the other specified fields are empty or not present.
 *
 * @param {Array} properties - An array of fields to check for presence
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
