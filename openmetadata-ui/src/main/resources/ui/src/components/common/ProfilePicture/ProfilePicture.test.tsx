/*
 *  Copyright 2022 Collate.
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

import { findByTestId, findByText, render } from '@testing-library/react';
import React from 'react';
import ProfilePicture from './ProfilePicture';

jest.mock('../avatar/Avatar', () => {
  return jest.fn().mockImplementation(() => <div>Avatar</div>);
});

jest.mock('../../../utils/UserDataUtils', () => {
  return {
    fetchAllUsers: jest.fn(),
    fetchUserProfilePic: jest.fn(),
    getUserDataFromOidc: jest.fn(),
    matchUserDetails: jest.fn(),
  };
});

const mockData = {
  name: 'test-name',
};

describe('Test ProfilePicture component', () => {
  it('ProfilePicture component should render with Avatar', async () => {
    const { container } = render(
      <ProfilePicture
        {...mockData}
        className=""
        textClass=""
        type="square"
        width="36"
      />
    );

    const avatar = await findByText(container, 'Avatar');

    expect(avatar).toBeInTheDocument();
  });

  it('Profile Avatar should be loading', async () => {
    const { container } = render(<ProfilePicture {...mockData} />);

    const loader = await findByTestId(container, 'loader-cntnr');

    expect(loader).toBeInTheDocument();
  });
});
