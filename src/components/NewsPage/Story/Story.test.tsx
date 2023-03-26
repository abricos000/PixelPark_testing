import React from 'react';
import { render, screen } from '@testing-library/react';
import Story from './Story';


const data = {
    by: 'string',
    descendants: 0,
    id: 0,
    kids: [],
    score: 0,
    time: 0,
    title: 'stringggg',
    type: 'string',
    url: 'string'
}

    it('Story renders', () => {
        render( <Story story={data} /> )

        const linkElement = screen.getByText('stringggg');
        expect(linkElement).toBeInTheDocument();
    });
