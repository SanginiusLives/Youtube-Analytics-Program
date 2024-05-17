import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Item from './Item';

describe('Item Component', () => {
    test('renders label and value correctly', () => {
        const label = 'Likes';
        const value = 100;

        render(<Item label={label} value={value} />);

        expect(screen.getByText('Likes')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
    });

    test('renders correct value with complex data', () => {
        const label = 'Statistics';
        const value = { likes: 100, comments: 50 };

        render(<Item label={label} value={JSON.stringify(value)} />);

        expect(screen.getByText('Statistics')).toBeInTheDocument();
        expect(screen.getByText('{"likes":100,"comments":50}')).toBeInTheDocument();
    });
});
