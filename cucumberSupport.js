const { Before } = require('@badeball/cypress-cucumber-preprocessor');
const consts = require('./lib/consts');

/**
 * Store the Cucumber source in the context for later usage
 */
Before(({ pickle, gherkinDocument }) => {
    const gherkinDocumentWithSingleScenario = {
        ...gherkinDocument,
        feature: {
            ...gherkinDocument.feature,
            children: gherkinDocument.feature.children.filter(f => f.scenario?.id === pickle.astNodeIds[0]),
        },
    };

    const scenario = gherkinDocumentWithSingleScenario.feature.children[0].scenario;
    if (scenario.examples.length) {
        const example = scenario.examples[0];
        example.tableBody = example.tableBody.filter(row => row.id === pickle.astNodeIds[1]);
    }

    cy.addTestContext({
        title: consts.cucumberStepsContextKey,
        value: gherkinDocumentWithSingleScenario,
    });
});
