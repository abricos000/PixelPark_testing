import { render, screen } from '@testing-library/react';
import React from 'react';
// import { render, screen } from '@testing-library/react';
import NewsItem from './NewsItem';

interface INewsItemPropos {
    by: string
    descendants: number
    id: number
    kids: []
    score: number
    time: number
    title: string
    type: string
  }
  

const data = {
    by: 'chrbutler',
    descendants: 0,
    id: 0,
    kids: [],
    score: 0,
    time: 0,
    title: 'text',
    type: 'string',
 
}

describe('NewsItem component', () => {
    it('NewsItem renders', () => {
        render (<NewsItem  story={data as INewsItemPropos} />)
        const linkElement = screen.getByText('chrbutler');
        expect(linkElement).toBeInTheDocument();
    });
})