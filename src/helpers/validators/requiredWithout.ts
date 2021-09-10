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

        // si toutes les related sont pas set on valide
        // sinon on valide pas
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
