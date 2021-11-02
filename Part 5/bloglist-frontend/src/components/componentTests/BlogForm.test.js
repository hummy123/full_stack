import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../BlogForm'

describe('<BlogForm />', () => {
    //form component and mock eventHandler
    let component
    let mockSubmitter = jest.fn()

    beforeAll(() => {
        component = render(
            <BlogForm
                mockSubmitter={mockSubmitter}
                setNotification={jest.fn}
            />
        )
    })

    test('form sends title, author and url on submission', () => {
        //get input components and form component
        const titleInput = component.container.querySelector('#title')
        const authorInput = component.container.querySelector('#author')
        const urlInput = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(titleInput, {
            target: { value: 'testTitle' }
        })
        fireEvent.change(authorInput, {
            target: { value: 'testAuthor' }
        })
        fireEvent.change(urlInput, {
            target: { value: 'testUrl.com' }
        })

        //submit form
        fireEvent.submit(form)


        expect(mockSubmitter.mock.calls).toHaveLength(1)
    })
})
