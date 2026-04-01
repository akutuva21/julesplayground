
// @vitest-environment jsdom
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import { ExperimentalDataPanel } from '../../components/charts/ExperimentalDataPanel';
import * as experimentalDataUtils from '../../src/utils/experimentalData';

// Mock the util
vi.mock('../../src/utils/experimentalData', () => ({
  readExperimentalCSVFile: vi.fn()
}));

describe('ExperimentalDataPanel', () => {
    const mockOnDataLoaded = vi.fn();

    const mockData = {
        fileName: 'test.csv',
        datasets: [
            { name: 'Obs1', points: [{time: 0, value: 1}, {time: 1, value: 2}] }
        ]
    };

    it('renders empty state correctly', () => {
        render(
            <ExperimentalDataPanel 
                onDataLoaded={mockOnDataLoaded}
                experimentalData={null}
                availableObservables={['Obs1']}
            />
        );
        expect(screen.getByText(/Drag & drop a CSV file here/i)).toBeInTheDocument();
    });

    it('renders loaded state correctly and shows matches', () => {
        render(
            <ExperimentalDataPanel 
                onDataLoaded={mockOnDataLoaded}
                experimentalData={mockData}
                availableObservables={['Obs1']}
            />
        );
        expect(screen.getByText(/test.csv/)).toBeInTheDocument();
        expect(screen.getByText(/Matched columns \(1\)/i)).toBeInTheDocument();
    });

    it('shows unmatched warning', () => {
        const unmatchedData = { ...mockData, datasets: [{ name: 'Unknown', points: [] }] };
        render(
            <ExperimentalDataPanel 
                onDataLoaded={mockOnDataLoaded}
                experimentalData={unmatchedData}
                availableObservables={['Obs1']}
            />
        );
        expect(screen.getByText(/Unmatched columns/i)).toBeInTheDocument();
        expect(screen.getByText('Unknown')).toBeInTheDocument();
    });

    it('calls onDataLoaded when file is uploaded', async () => {
        const file = new File(['time,Obs1\n0,1'], 'test.csv', { type: 'text/csv' });
        
        vi.mocked(experimentalDataUtils.readExperimentalCSVFile).mockResolvedValue(mockData);

        render(
            <ExperimentalDataPanel 
                onDataLoaded={mockOnDataLoaded}
                experimentalData={null}
                availableObservables={['Obs1']}
            />
        );

        const input = screen.getByLabelText(/Browse files/i);
        fireEvent.change(input, { target: { files: [file] } });

        await waitFor(() => {
            expect(experimentalDataUtils.readExperimentalCSVFile).toHaveBeenCalledWith(file);
            expect(mockOnDataLoaded).toHaveBeenCalledWith(mockData);
        });
    });

    it('clears data when remove button clicked', () => {
         render(
            <ExperimentalDataPanel 
                onDataLoaded={mockOnDataLoaded}
                experimentalData={mockData}
                availableObservables={['Obs1']}
            />
        );

        const removeBtn = screen.getByText('Remove');
        fireEvent.click(removeBtn);

        expect(mockOnDataLoaded).toHaveBeenCalledWith(null);
    });
});
