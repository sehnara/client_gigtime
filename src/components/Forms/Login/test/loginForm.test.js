import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom"
import LoginForm from '../view.tsx'
import renderer from 'react-test-renderer'

describe('LoginForm', () => {
    it("render", () => {
        const component = renderer.create(<LoginForm/>)
        expect(component).toMatchSnapshot();
    })
    
    describe('login form', () => {
        it('test', () => {
            expect(1+1).toBe(2)
        })
        
    })
})


