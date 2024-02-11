/*
 *  Copyright 2024 Collate.
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
import { MemoryRouter } from 'react-router-dom';
import { postThread } from '../../../rest/feedsAPI';
import RequestTag from './RequestTagPage';

const mockUseHistory = {
  push: jest.fn(),
  goBack: jest.fn(),
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ entityType: 'table' }),
  useLocation: jest
    .fn()
    .mockReturnValue({ search: 'field=columns&value="address.street_name"' }),
  useHistory: jest.fn().mockImplementation(() => mockUseHistory),
}));
jest.mock('../../../components/common/ResizablePanels/ResizablePanels', () =>
  jest.fn().mockImplementation(({ firstPanel, secondPanel }) => (
    <>
      <div>{firstPanel.children}</div>
      <div>{secondPanel.children}</div>
    </>
  ))
);
jest.mock('../../../utils/TasksUtils', () => ({
  fetchEntityDetail: jest
    .fn()
    .mockImplementation((_entityType, _decodedEntityFQN, setEntityData) => {
      setEntityData({
        id: 'id1',
        name: 'dim_location',
        fullyQualifiedName: 'sample_data.ecommerce_db.shopify.dim_location',
        tableType: 'Regular',
        owner: {
          id: 'id1',
          name: 'sample_data',
          type: 'User',
        },
      });
    }),
  fetchOptions: jest.fn(),
  getBreadCrumbList: jest.fn().mockReturnValue([]),
  getTaskMessage: jest.fn().mockReturnValue('Task message'),
}));
jest.mock('../shared/Assignees', () =>
  jest.fn().mockImplementation(() => <div>Assignees.component</div>)
);
jest.mock(
  '../../../components/common/TitleBreadcrumb/TitleBreadcrumb.component',
  () => jest.fn().mockImplementation(() => <div>TitleBreadcrumb.component</div>)
);
jest.mock('../../../rest/feedsAPI', () => ({
  postThread: jest.fn().mockResolvedValue({}),
}));
jest.mock(
  '../../../components/ExploreV1/ExploreSearchCard/ExploreSearchCard',
  () =>
    jest.fn().mockImplementation(() => <div>ExploreSearchCard.component</div>)
);
jest.mock('../shared/TagSuggestion', () =>
  jest.fn().mockImplementation(() => <div>TagSuggestion.component</div>)
);
jest.mock('../../../hooks/useFqn', () => ({
  useFqn: jest
    .fn()
    .mockReturnValue({ fqn: 'sample_data.ecommerce_db.shopify.dim_location' }),
}));

describe('RequestTagPage', () => {
  it('should render component', async () => {
    render(<RequestTag />, { wrapper: MemoryRouter });

    expect(
      await screen.findByText('TitleBreadcrumb.component')
    ).toBeInTheDocument();
    expect(await screen.findByText('Assignees.component')).toBeInTheDocument();
    expect(
      await screen.findByText('TagSuggestion.component')
    ).toBeInTheDocument();
    expect(await screen.findByTestId('form-title')).toBeInTheDocument();
    expect(await screen.findByTestId('form-container')).toBeInTheDocument();
    expect(await screen.findByTestId('title')).toBeInTheDocument();
    expect(await screen.findByTestId('cancel-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('submit-tag-request')).toBeInTheDocument();
  });

  it("should go back to previous page when 'Cancel' button is clicked", async () => {
    render(<RequestTag />, { wrapper: MemoryRouter });
    const cancelBtn = await screen.findByTestId('cancel-btn');

    act(() => {
      fireEvent.click(cancelBtn);
    });

    expect(mockUseHistory.goBack).toHaveBeenCalled();
  });

  it('should submit form when submit button is clicked', async () => {
    const mockPostThread = postThread as jest.Mock;
    render(<RequestTag />, { wrapper: MemoryRouter });

    const submitBtn = await screen.findByTestId('submit-tag-request');

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(mockPostThread).toHaveBeenCalledWith({
      about:
        '<#E::table::sample_data.ecommerce_db.shopify.dim_location::columns::"address.street_name"::tags>',
      from: undefined,
      message: 'Task message',
      taskDetails: {
        assignees: [
          {
            id: 'id1',
            type: 'User',
          },
        ],
        oldValue: '[]',
        suggestion: '[]',
        type: 'RequestTag',
      },
      type: 'Task',
    });
  });
});
