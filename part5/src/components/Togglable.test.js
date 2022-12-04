import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let container

  //called before each test
  //renders Togglable component and saves the return value
  //in the container variable
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </Togglable>
    ).container
  })

  //verify that togglable component renders its child component
  test('renders its children', () => {
    screen.findAllByText('togglable content')
  })

  //check that at teh begining, the child component is not visible (see note on 5b and
  //see togglable component)
  //by checking that teh div element has display:none
  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  //test that after clickign the button, children are displayed
  test('after clicking the button, children are displayed', () => {
    const button = screen.getByText('show...')
    userEvent.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = screen.getByText('show...')
    userEvent.click(button)

    const closeButton = screen.getByText('cancel')
    userEvent.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})