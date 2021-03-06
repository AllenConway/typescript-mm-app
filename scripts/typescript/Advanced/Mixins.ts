namespace MixinsUsingApply {

    // using placeholders on an anemic class method

    class Employee {
        getHours(): string {
            return 'retreiving hours';
        }
    }

    class User {
        getLastLogin(): string {
            return `Last Login: ${Date.now()}`;
        }
    }

    class Management {
        getSalary(): string {
            return 'retreiving slary';
        }
    }

    // Anemic stand-in class to satisfy the compiler at runtime
    // Note the boilerplate overhead in this method
    export class Administrator implements Employee, User, Management {
        // Note! when run these messages are not seen or executed
        getHours(): string {
            throw new Error("Method not implemented.");
        }        
        getLastLogin(): string {
            throw new Error("Method not implemented.");
        }
        getSalary(): string {
            throw new Error("Method not implemented.");
        }
    }

    // Ideally this would be in a static class elsewhere
    function applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }

    // Pass in Administrator mixin class plus array of individual classes to generate new mixin version of Administrator
    applyMixins(Administrator, [Employee, Management, User]);

    const admin = new Administrator();
    console.log(admin.getHours());
    console.log(admin.getSalary());
    console.log(admin.getLastLogin());
}

namespace MixinUsedElsewhere {

    // Notice how I don't need to call applyMixin again, and can create an instance of Administrator
    // If you remove the call to applyMixin above, this will fail, as no mixin has been created
    const administrator = new MixinsUsingApply.Administrator();
    console.log(administrator.getHours());
    console.log(administrator.getSalary());
    console.log(administrator.getLastLogin());

}

namespace MixinsUsingComposer {
    
    // using a function that extends with new functionality
    // The only thing I don't like about this method is having to shape functions ahead of time to be composable mixins
    
    // Utility composer from TypeScript Deep Dive
    // represents constructor of T taking any (rest) parameters
    type mixinComposer<T = {}> = new (...args: any[]) => T;

    // Each mixin function must do the following:
    // take a constructor,
    // create a class that extends that constructor with new functionality
    // return the new class that is a mixin of both classes

    function Employee<TBase extends mixinComposer>(Base: TBase) {
        return class extends Base {
            getHours(): string {
                return 'retreiving hours';
            }
        }
    }

    function User<TBase extends mixinComposer>(Base: TBase) {
        return class extends Base {
            getLastLogin(): string {
                return `Last Login: ${Date.now()}`;
            }
        }
    }

    function Management<TBase extends mixinComposer>(Base: TBase) {
        return class extends Base {
            getSalary(): string {
                return 'retreiving slary';
            }
        }
    }

    export class Administrator {        
    }

    export const Admin = Employee(User(Management(Administrator)));
    const admin = new Admin();
    console.log(admin.getHours());
    console.log(admin.getSalary());
    console.log(admin.getLastLogin());

}

namespace PlainOldJavaScriptMixin {

    class Employee {
        getHours() {
            return 'retreiving hours';
        }
    }

    class User {
        getLastLogin() {
            return `Last Login: ${Date.now()}`;
        }
    }

    class Management {
        getSalary() {
            return 'retreiving slary';
        }
    }

       
    Object.assign(Management.prototype, User.prototype, Employee.prototype);
    let management = new Management(); 

    // Uncomment to run only or TypeScript will not build
    // console.log(management.getLastLogin());
    // console.log(management.getHours());
    // console.log(management.getSalary());
}