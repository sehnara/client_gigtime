import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom"
import renderer from 'react-test-renderer'
import LoginPage from '../view'

describe('Login page Snapshot Test', () => {
    it('render', () => {
        const component = renderer.create(<LoginPage/>)
        expect(component).toMatchSnapshot()
    })
} )