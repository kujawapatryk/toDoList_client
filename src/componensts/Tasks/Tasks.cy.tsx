import { SnackbarProvider } from "notistack";
import { message } from "../../utils/message";
import { API_URL } from "../../config/api";
import { Tasks } from "./Tasks";

describe('AddTask component', () => {

    beforeEach(() => {
        const data = [{
            id:21,
            content: 'Another new task',
            done: false,
        },{
            id:22,
            content: 'New task',
            done: true,
        }];
        cy.mount(
            <SnackbarProvider maxSnack={3}>
                <Tasks tasks={data} setTasks={cy.stub()}/>
            </SnackbarProvider>
        );

    });

    it('#1 should render the component', () => {
        cy.get('.task-list').should('exist');
    });

    it('#2 should update the task state upon successful PATCH', () => {
        cy.intercept('PATCH', `${API_URL}/tasks/*`, {
            statusCode: 200,
            body: { message: 'taskConfirmation', status: 'success' }
        }).as('updateTask');
        cy.get('.task-checkbox').first()
            .should('not.be.checked')
            .click();
        cy.wait('@updateTask').its('response.statusCode').should('eq', 200);

        cy.contains(message.taskConfirmation.value).should('exist');
        cy.get('.task-checkbox').should('be.checked');

    });

    it('#3 should give an error message after a failed PATCH', () => {
        cy.intercept('PATCH', `${API_URL}/tasks/*`, {
            statusCode: 200,
            body: { message: 'tryLater', status: 'fail' }
        }).as('updateTask');

        cy.get('.task-checkbox').first()
            .should('not.be.checked')
            .click();
        cy.wait('@updateTask').its('response.statusCode').should('eq', 200);

        cy.contains(message.tryLater.value).should('exist');
        cy.get('.task-checkbox').first().should('not.be.checked')

    });

    it('#4 It should about unknown server error PATCH', () => {
        cy.intercept('PATCH', `${API_URL}/tasks/*`, {
            statusCode: 400,
            body: { message: 'tryLater', status: 'fail' }
        }).as('updateTask');

        cy.get('.task-checkbox').first()
            .should('not.be.checked')
            .click();
        cy.wait('@updateTask');

        cy.contains(message.error.value).should('exist');
        cy.get('.task-checkbox').first().should('not.be.checked')

    });

    it('#5 should return an error message if there is no task to delete', () => {

        cy.intercept('DELETE', `${API_URL}/tasks/*`, {
            statusCode: 200,
            body: { message: 'tryLater', status: 'fail' }
        }).as('deleteTask');

        cy.contains('Another new task').should('exist');

        cy.get('.Button__input').first().click();
        cy.wait('@deleteTask');
        cy.contains(message.tryLater.value).should('exist');
        cy.contains('Another new task').should('exist');

    });

    it('#6 It should about unknown server error DELETE', () => {

        cy.intercept('DELETE', `${API_URL}/tasks/21`, {
            statusCode: 400,
            body: { message: 'tryLater', status: 'fail' }
        }).as('deleteTask');

        cy.contains('Another new task').should('exist');

        cy.get('.Button__input').first().click();
        cy.wait('@deleteTask');
        cy.contains(message.error.value).should('exist');
        cy.contains('Another new task').should('exist');

    });

    it('#7 should make a DELETE request when delete is clicked', () => {

        cy.intercept('DELETE', `${API_URL}/tasks/21`, {
            statusCode: 200,
            body: { message: 'taskDeleted', status: 'success' }
        }).as('deleteTask');

        cy.contains('Another new task').should('exist');

        cy.get('.Button__input').first().click();
        cy.wait('@deleteTask');
        cy.contains(message.taskDeleted.value).should('exist');

    });




})

