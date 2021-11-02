import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../Blog'

describe('<Blog />', () => {
    //blog dummy data to test
    const blog = {
        id: '1234567890',
        author: 'myAuthor',
        likes: 0,
        title: 'myTitle',
        url: 'myUrl.com'
    }

    jest.setTimeout(10000)

    describe('simple', () => {

        //variable for rendered component
        let component

        beforeAll(() => {
            //store a copy of the blog component before all tests
            component = render(
                <Blog blog={blog} setNotification={jest.fn} />
            )
        })

        test('displays title and author by default', () => {
            const element = component.getByText('myTitle myAuthor')
            expect(element).toBeDefined()
        })

        test('shows no likes', () => {
            expect(component.container).not.toHaveTextContent(
                '0'
            )
        })

        test('shows no url', () => {
            expect(component.container).not.toHaveTextContent(
                'myUrl.com'
            )
        })
    })

    describe('detailed', () => {

        let component
        let mockHandler = jest.fn()

        //switch to detailed view before detailed tess
        beforeEach(() => {
            component = render(
                <Blog blog={blog} setNotification={jest.fn} mockHandler={mockHandler} />
            )
            const button = component.container.querySelector('button')
            fireEvent.click(button)
        })

        test('likes are shown', () => {
            const element = component.getByText('likes: 0')
            expect(element).toBeDefined()
        })

        test('url is shown', () => {
            const element = component.container.querySelector('.url')
            expect(element).toBeDefined()
        })

        test('if mock button clicked twice, event handler called twice', async () => {
            //get button handler is attached to
            const button = component.getByText('mock button')

            //call handler twice
            fireEvent.click(button)
            fireEvent.click(button)

            //does handler have two clicks?
            expect(mockHandler.mock.calls).toHaveLength(2)
        })
    })
})

