import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  //render with the render function
  render(<Note note={note} />)

  //use screen's method to to access the rendered component
  const element = screen.getByText('Component testing is done with react-testing-library')

  //ensure that the element exists
  expect(element).toBeDefined()

  //other way to test as well; check the section "Searching for content in a component"
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  //event handler; a mock functoin
  const mockHandler = jest.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  //find the button
  const button = screen.getByText('make not important')
  //click the button
  userEvent.click(button)

  //verify that mock fucntion has been called exactly once
  expect(mockHandler.mock.calls).toHaveLength(1)
})