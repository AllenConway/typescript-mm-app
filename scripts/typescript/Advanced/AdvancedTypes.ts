namespace IntersectionTypes {

    interface Employee {
        getHours(): string;
    }

    interface User {
        getLastLogin(): string;
    }

    type Admin = Employee & User;
    let admin: Admin = {
        getHours(): string {
            return 'retreiving hours';
        },
        getLastLogin(): string {
            return `Last Login: ${Date.now()}`;
        }
    }; 
    console.log(admin.getHours());
    console.log(admin.getLastLogin());

    interface Error  {
        errorId?: number;
        status?: number;
        detail?: string;
    }

    type EmployeeResponse = Employee & Error;
    let response: EmployeeResponse = {
        getHours(): string {
            this.errorId = 0;
            return 'retreived hours';
        }
    }
}

namespace UnionTypes {

    function allowUnionTypeParameter(input: string|number|null) {
        return input;
    }

    console.log(allowUnionTypeParameter(123));
    console.log(allowUnionTypeParameter("Hello"));
    console.log(allowUnionTypeParameter(null));
    // Lines below are not allowed    
    // console.log(allowUnionTypeParameter(true));
    // Not allowed if strictNullChecks = true
    // console.log(allowUnionTypeParameter(undefined));

    export interface Engine {
        manufacturer: string;
        size: number;
        horsePower: number;
        showEngineMeta();
    }

    export interface Car {
        color: string;
        model: string;
        manufacturer: string;
        showCarMeta();
    }

    export function getAutoInformation(): Engine | Car {
        // ...logic to determine return type based on some rules
        // Unions are valid but don't work as well as return types in all scenarios
        let myCar: Car = {
            color: "Red",
            model: "Mustang",
            manufacturer: "Ford",
            showCarMeta: () => {return 'Hello from myCar';}
        }
        return myCar;
    }

    let carInformation = getAutoInformation();
    console.log(carInformation.manufacturer);
    // The line below is not valid as using a Union type, we can only see memebers that are in common (i.e. 'manufacturer')
    // This value has the type Engine | Car, so we only know for certain that it has members that are in both Engine and Car
    // console.log(carInformation.model);
}

namespace StringLiteralTypes {

    type stringLiteralColors = "red" | "black" | "green" | "orange";

    enum Colors {
        Red = 1,
        Black = 2,
        Green = 3,
        Orange = 4
    }

    // Notice use of Union types in both input and return values being used :)
    function showColor(color: stringLiteralColors | Colors): string | number {
        return color;
    }

    // String literals will have intellisense on the string literal values
    console.log(showColor("red"));
    console.log(showColor("black"));
    // console.log(showColor("gray")); //not a valid literal

    // Enums will have intellisense on the enum options
    console.log(showColor(Colors.Black));
    console.log(showColor(Colors.Green));

    // Sample using a numeric literal type
    function gallonsOfGasEligableDiscount(gallons: 5 | 10 | 15 | 20): number {
        return gallons;
    }

    console.log(gallonsOfGasEligableDiscount(10));
    // The line below is not a valid numeric literal
    // console.log(gallonsOfGasEligableDiscount(12));

}

namespace TypeGuards {

    // Brut force method checking with type assertions littered everywhere
    let myAuto = UnionTypes.getAutoInformation()
    if((<UnionTypes.Car>myAuto).showCarMeta) {
        console.log((<UnionTypes.Car>myAuto).showCarMeta());
    }
    else{
        console.log((<UnionTypes.Engine>myAuto).showEngineMeta());
    }

    // Instead we can use a custom defined Type Guard functions
    function isCar(autoMeta: UnionTypes.Engine | UnionTypes.Car): autoMeta is UnionTypes.Car {
        return (<UnionTypes.Car>myAuto).showCarMeta !== undefined;
    }

    function isEngine(autoMeta: UnionTypes.Engine | UnionTypes.Car): autoMeta is UnionTypes.Engine {
        return (<UnionTypes.Engine>myAuto).showEngineMeta !== undefined;
    }

    if(isCar(myAuto)) {
        console.log(myAuto.showCarMeta());
    }
    else {
        // Notice with intellisense the compiler knows that in this else branch we are not a Car and so must be an engine
        myAuto.showEngineMeta();
    }
}

namespace NullableTypes {

    // For this demo, make sure that in tsconfig.json --strictNullChecks
    let firstName: string = "Allen";
    // Toggle --strictNullChecks and watch behavior
    firstName = null;
    //This is acceptable when included explicitly as a union type
    let lastName: string | null = "Conway";
    lastName = null;

    // Test removing undefined while strictNullChecks is set to true
    // setting phoneNumber to null/undefined is acceptable even if not provided as a union type, unless strictNullChecks: "true"
    // at that point you must explicitly have it defined as a nullable type
    let phoneNumber: string | number | null | undefined;
    phoneNumber = "4071234567";
    phoneNumber = 4071234567;
    phoneNumber = null;
    phoneNumber = undefined;
}