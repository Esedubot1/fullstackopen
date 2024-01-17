import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('Blog form updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm newBlog={createBlog}/>)

  const input = container.querySelector('.titleInput')
  const submitButton = container.querySelector('.submitButton')

  await user.type(input, 'testing a form...')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
})