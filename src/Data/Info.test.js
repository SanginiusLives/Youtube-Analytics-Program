import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Info from './Info';
import Api from '../Api';
import { useParams } from 'react-router-dom';

// Mock the necessary modules
jest.mock('../Api');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

// Mock data to use in the tests
const mockData = {
    data: {
        items: [{
            snippet: {
                tags: ['tag1', 'tag2'],
                title: 'Test Video Title',
                publishedAt: '2023-01-01T00:00:00Z',
                channelTitle: 'Test Channel'
            },
            statistics: {
                viewCount: 1000,
                likeCount: 100,
                commentCount: 10
            }
        }]
    }
};

describe('Info Component', () => {
    beforeEach(() => {
        useParams.mockReturnValue({ id: 'test-id' });
        Api.get.mockResolvedValue(mockData);
    });

    test('renders loading spinner initially', () => {
        render(<Router><Info /></Router>);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('fetches and displays video information', async () => {
        render(<Router><Info /></Router>);

        // Wait for the component to finish loading
        await waitFor(() => {
            expect(Api.get).toHaveBeenCalledWith('test-id');
        });

        expect(screen.getByText('Video Title')).toBeInTheDocument();
        expect(screen.getByText('Test Video Title')).toBeInTheDocument();
        expect(screen.getByText('By Test Channel')).toBeInTheDocument();
        expect(screen.getByText('Likes')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('Views')).toBeInTheDocument();
        expect(screen.getByText('1000')).toBeInTheDocument();
        expect(screen.getByText('Comments')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
    });

    test('displays tags if available', async () => {
        render(<Router><Info /></Router>);

        await waitFor(() => {
            expect(Api.get).toHaveBeenCalledWith('test-id');
        });

        expect(screen.getByText('Tags')).toBeInTheDocument();
        expect(screen.getByText('tag1')).toBeInTheDocument();
        expect(screen.getByText('tag2')).toBeInTheDocument();
    });

    test('does not display tags section if tags are null', async () => {
        const modifiedMockData = { ...mockData };
        modifiedMockData.data.items[0].snippet.tags = null;
        Api.get.mockResolvedValueOnce(modifiedMockData);

        render(<Router><Info /></Router>);

        await waitFor(() => {
            expect(Api.get).toHaveBeenCalledWith('test-id');
        });

        expect(screen.queryByText('Tags')).not.toBeInTheDocument();
    });
});
