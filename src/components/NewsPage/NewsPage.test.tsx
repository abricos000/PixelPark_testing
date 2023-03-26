import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsPage from './NewsPage';


    it('NewsPage renders', () => {        
        render( <NewsPage /> )
        const linkElement = screen.getByText('zzxxcc');
        expect(linkElement).toBeInTheDocument();
    });
