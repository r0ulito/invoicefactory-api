import {
    registerDecorator,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsRequiredIfConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value !== undefined && relatedValue !== undefined;
    }
    defaultMessage(args: ValidationArguments) {
        let property = args.property;
        let propertyGlue = ' ';
        let relatedProperty = args.constraints[0];
        let relatedPropertyGlue = ' ';
        if (property === 'first_name' || property === 'last_name') {
            propertyGlue = '';
        }
        if (
            relatedProperty === 'first_name' ||
            relatedProperty === 'last_name'
        ) {
            relatedPropertyGlue = ' ';
        }
        property = property.split('_').join(propertyGlue);
        relatedProperty = relatedProperty.split('_').join(relatedPropertyGlue);
        return `${property} is required if ${relatedProperty} is set`;
    }
}

/**
 * Makes the annotated field required if param property has a value
 *
 * @param property the property which have to be present to make the annotated field required
 
 */

export function RequiredIf(property: string) {
    return function (object, propertyName: string) {
        registerDecorator({
            name: 'isRequiredIf',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            validator: IsRequiredIfConstraint,
        });
    };
}
