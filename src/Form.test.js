import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form';

describe('Form Component', () => {
    test('renders input and submit button', () => {
        render(<Form handleFormSubmit={jest.fn()} />);
        
        expect(screen.getByPlaceholderText('Video ID')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    test('updates input value on change', () => {
        render(<Form handleFormSubmit={jest.fn()} />);
        
        const input = screen.getByPlaceholderText('Video ID');
        fireEvent.change(input, { target: { value: 'https://www.youtube.com/watch?v=testVideoId' } });
        
        expect(input.value).toBe('https://www.youtube.com/watch?v=testVideoId');
    });

    test('calls handleFormSubmit with video id on submit', () => {
        const handleFormSubmit = jest.fn();
        render(<Form handleFormSubmit={handleFormSubmit} />);
        
        const input = screen.getByPlaceholderText('Video ID');
        const form = screen.getByRole('form');
        
        fireEvent.change(input, { target: { value: 'https://www.youtube.com/watch?v=testVideoId' } });
        fireEvent.submit(form);
        
        expect(handleFormSubmit).toHaveBeenCalledWith('testVideoId');
    });
});
