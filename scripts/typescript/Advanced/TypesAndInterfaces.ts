namespace TypesAndInterfaces {
    

    interface PersonInterface {
        firstName: string;
        lastName: string;
        phone: string;
    }

    type PersonType = {
        firstName: string;
        lastName: string;
        phone: string;
    }

    // Notice both defined above generate no JS; they are compile time features of TS

    let personInterface: PersonInterface = {
        firstName: "Allen",
        lastName: "Conway",
        phone: "555-555-5555"
    }

    let personType: PersonType = {
        firstName: "Allen",
        lastName: "Conway",
        phone: "555-555-5555"
    }

    //these are runtime statements and as expected log identical values
    console.log(JSON.stringify(personInterface));
    console.log(JSON.stringify(personType));
    
    //Interfaces can extend Types
    interface EmployeeInterface extends PersonType {

    }
    
    interface EmployeeInterface {
        department: number;
    }
    //Types cannot use the 'extends' keyword, but can use an intersection type
    type EmployeeType = PersonType & EmployeeInterface;
    let employeeType: EmployeeType = {
        firstName: "Allen",
        lastName: "Conway",
        phone: "555-555-5555",
        department: 100
    }

    //classes can implement an Interface or a Type
    class PersonClassUsingInterface implements PersonInterface {
        firstName: string;        
        lastName: string;
        phone: string;
    }

    //Interesting if you remove the implementation, IDE will prompt to implement 'Interface'
    class PersonClassUsingType implements PersonType {
        firstName: string;        
        lastName: string;
        phone: string;
    }    


    //Use implements for both interfaces and types
    class Employee implements PersonType, EmployeeInterface {        
        firstName: string;        
        lastName: string;
        phone: string;  
        department: number;      
    }

    
    //Use mapped types like Partial on types
    type ContractEmployeeType = Partial<PersonType & EmployeeType>;
    //Notice with use of Partial, not required from the point of definition to supply required fields
    let contractEmployee: ContractEmployeeType = {
        lastName: "Jones",
        firstName: "Mary",
        department: 500
    }
    
    //Types using Unions are more limited for implementing on classes and extending on interfaces
    type TemporaryEmployeeType = (PersonType | Employee);
    
    // Below will not work because the members aren't statically known:
    // "A class can only implement an object type or intersection of object types with statically known members"
    // uncomment to see issue
    // class TemporaryEmployeeClass implements TemporaryEmployeeType {

    // }

    //Same for the interface example below using a type with a Union operator; same error
    // uncomment to see issue
    // interface TemporaryEmployeeInterface extends TemporaryEmployeeType {

    // }

    //Types can't use Declaration Merging like Interfaces can leverage:
    // uncomment to see issue
    // type FullTimeEmployee = {
    //     id: number;
    //     yearsTenure: number,
    // }

    // type FullTimeEmployee = {
    //     managerId: number;
    //     daysPTO: number,
    // }  

    // Interfaces as we've seen can use declaration merging and this will appear as a single interface
    interface FullTimeEmployee {
        id: number;
        yearsTenure: number,
    }

    interface FullTimeEmployee {
        managerId: number;
        daysPTO: number,
    }  

    let fullTimeEmployee: FullTimeEmployee = {
        id: 123,
        yearsTenure: 12,
        managerId: 456,
        daysPTO :25
    }

    // Take note of the JavaScript transpiled from this file that is void of all the interface and type definitions
    // It's basically a bunch of object literals and the class examples
}