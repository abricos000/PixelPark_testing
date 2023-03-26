import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
    it('Header renders', () => {
        render( <Header /> )

        const linkElement = screen.getByText('HACKER NEWS');
        expect(linkElement).toBeInTheDocument();
    });
})