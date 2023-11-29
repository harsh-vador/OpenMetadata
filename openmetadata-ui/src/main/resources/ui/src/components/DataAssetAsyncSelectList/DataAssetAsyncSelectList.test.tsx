/*
 *  Copyright 2023 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { searchQuery } from '../../rest/searchAPI';
import DataAssetAsyncSelectList, {
  DataAssetOption,
} from './DataAssetAsyncSelectList';

jest.mock('../../rest/searchAPI');
jest.mock('../../utils/TableUtils');
jest.mock('../../utils/EntityUtils', () => ({
  getEntityName: jest.fn().mockReturnValue('Test'),
}));

const mockSearchAPIResponse = {
  data: {
    hits: {
      hits: [
        {
          _source: {
            id: '1',
            name: 'test 1',
            fullyQualifiedName: 'test-1',
            entityType: 'table',
          },
        },
        {
          _source: {
            id: '2',
            name: 'test 2',
            fullyQualifiedName: 'test-2',
            entityType: 'table',
          },
        },
      ],
      total: {
        value: 2,
      },
    },
  },
};

describe('DataAssetAsyncSelectList', () => {
  function toggleOpen(container: ReturnType<typeof render>['container']): void {
    fireEvent.mouseDown(container.querySelector('.ant-select-selector'));
    act(() => {
      jest.runAllTimers();
    });
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render without crashing', async () => {
    await act(async () => {
      render(<DataAssetAsyncSelectList />);
    });

    expect(screen.getByTestId('asset-select-list')).toBeInTheDocument();
  });

  it('should call searchQuery when focused', async () => {
    (searchQuery as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSearchAPIResponse.data)
    );

    const { container } = render(<DataAssetAsyncSelectList />);

    await act(async () => {
      toggleOpen(container);
    });

    expect(searchQuery).toHaveBeenCalledTimes(1);
  });

  it('should call onChange when an option is selected', async () => {
    const mockOnChange = jest.fn();

    const mockOptions: DataAssetOption[] = [
      {
        displayName: 'Test',
        label: 'Test',
        reference: { id: '1', type: 'table' },
        value: '1',
      },
    ];

    (searchQuery as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockSearchAPIResponse.data)
    );

    const { container } = render(
      <DataAssetAsyncSelectList mode="multiple" onChange={mockOnChange} />
    );

    await act(async () => {
      toggleOpen(container);
    });

    expect(searchQuery).toHaveBeenCalledTimes(1);

    const inputBox = screen.getByRole('combobox');

    await act(async () => {
      fireEvent.change(inputBox, {
        target: { value: 'test 1' },
      });
    });

    const option = screen.getByTestId('option-1');

    await act(async () => {
      fireEvent.click(option);
    });

    expect(mockOnChange).toHaveBeenCalledWith(mockOptions);
  });

  it("should render the placeholder when there's no value", async () => {
    const placeholder = 'test placeholder';

    await act(async () => {
      render(
        <DataAssetAsyncSelectList mode="multiple" placeholder={placeholder} />
      );
    });

    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  it("should render the default value when there's a value and initial option", async () => {
    const defaultValue = ['1'];
    const initialOptions: DataAssetOption[] = [
      {
        displayName: 'Test',
        label: 'Test',
        reference: { id: '1', type: 'table' },
        value: '1',
      },
    ];

    await act(async () => {
      render(
        <DataAssetAsyncSelectList
          defaultValue={defaultValue}
          initialOptions={initialOptions}
          mode="multiple"
        />
      );
    });

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
