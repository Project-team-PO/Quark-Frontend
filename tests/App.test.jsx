import { render, screen } from '@testing-library/react';
import { before, describe } from 'node:test';
// import HomeLayout from '../src/layouts/HomeLayout';
// import { reducer } from './test-utils'

import App from '../src/App';


describe('App', () => {
    it('renders App', () => {
        render(<App />);

        screen.debug();

        // check if App components renders headline
    });
});

// describe('home layout', () => {

//     before(() => {
//         reducer(<HomeLayout />);
//     });

// });

