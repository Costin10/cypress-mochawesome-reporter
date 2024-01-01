declare global {
    namespace Cypress {
        interface Chainable {
            addTestContext(context: TestContext): Chainable<void>;
        }
        interface TestContextObject {
            title: string;
            value: any;
        }
        type TestContext = string | TestContextObject;
    }
}

export {}; // Fix "Cannot redeclare block-scoped variable" error
