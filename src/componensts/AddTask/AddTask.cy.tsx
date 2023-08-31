import { SnackbarProvider } from 'notistack'
import React from 'react'
import { API_URL } from '../../config/api'
import { message } from '../../utils/message'
import { AddTask } from './AddTask'



describe('<AddTask />', () => {
  it('renders', () => {
    cy.mount(<AddTask tasks={[]} setTasks={cy.stub()} />)
  })
})

describe('AddTask component', () => {

  beforeEach(() => {
    cy.mount(
        <SnackbarProvider maxSnack={3}>
          <AddTask tasks={[]} setTasks={cy.stub()} />
        </SnackbarProvider>
    );
  });

  it('should allow user to type into the task input', () => {

    cy.get('#taskContent')
        .type('This is a new task')
        .should('have.value', 'This is a new task');
  });

  it('should not allow more than 120 characters', () => {
    const longText = 'A'.repeat(121);
    cy.get('#taskContent')
        .type(longText)
        .should('have.value', 'A'.repeat(120));
    cy.contains(message.maxCharacterCount.value).should('exist');
  });


  it('should add a task on "Enter" key press', () => {
    cy.intercept('POST', `${API_URL}/tasks/`, {
      statusCode: 201,
      body: { id: 12345, content: 'This is a new task', done: true }
    }).as('postTask');

    cy.get('#taskContent').type('This is a new task{enter}');
    cy.wait('@postTask');
    cy.contains(message.taskAdded.value).should('exist');
  });


  it('should add a task on "Dodaj zadanie" button click', () => {
    cy.intercept('POST', `${API_URL}/tasks/`, {
      statusCode: 201,
      body: { id: 12345, content: 'Another new task', done: true }
    }).as('postTask');
    cy.get('#taskContent').type('Another new task');
    cy.get('#addTaskButton').click();
    cy.wait('@postTask');
    cy.contains(message.taskAdded.value).should('exist');
  });

  it('should not add an empty task', () => {
    cy.get('#addTaskButton').click();
    cy.contains(message.emptyFieldError.value).should('exist');
  });

});

