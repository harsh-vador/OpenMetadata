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
import { interceptURL, verifyResponseStatusCode } from '../../common/common';
import { GlobalSettingOptions } from '../../constants/settings.constant';

const visitSearchApplicationPage = () => {
  interceptURL(
    'GET',
    '/api/v1/apps/name/SearchIndexingApplication?fields=*',
    'getSearchIndexingApplication'
  );
  cy.get(
    '[data-testid="search-indexing-application-card"] [data-testid="config-btn"]'
  ).click();
  verifyResponseStatusCode('@getSearchIndexingApplication', 200);
};

describe('Search Index Application', () => {
  beforeEach(() => {
    cy.login();

    interceptURL('GET', '/api/v1/apps?limit=*', 'getApplications');

    cy.settingClick(GlobalSettingOptions.APPLICATIONS);

    verifyResponseStatusCode('@getApplications', 200);
  });

  it('Edit application', () => {
    interceptURL('PATCH', '/api/v1/apps/*', 'updateApplication');
    visitSearchApplicationPage();
    cy.get('[data-testid="edit-button"]').click();
    cy.get('[data-testid="cron-type"]').click();
    cy.get('[title="Day"]').click();
    cy.get('[data-testid="hour-options"]').click();
    cy.get('[title="01"]').click();
    cy.get('.ant-modal-body [data-testid="deploy-button"]').click();
    verifyResponseStatusCode('@updateApplication', 200);
    cy.get('[data-testid="cron-string"]').should('contain', 'At 01:00 AM');

    cy.get('[data-testid="configuration"]').click();

    cy.get('#root\\/batchSize').type('0');
    cy.get('form [title="Chart"] [role="img"]').click();

    cy.get('[data-testid="submit-btn"]').click();
    verifyResponseStatusCode('@updateApplication', 200);
  });

  it('Uninstall application', () => {
    interceptURL('GET', '/api/v1/apps?limit=*', 'getApplications');
    interceptURL(
      'DELETE',
      '/api/v1/apps/name/SearchIndexingApplication?hardDelete=true',
      'deleteApplication'
    );
    visitSearchApplicationPage();
    cy.get('[data-testid="manage-button"]').click();
    cy.get('[data-testid="uninstall-button-title"]').click();
    cy.get('[data-testid="save-button"]').click();
    verifyResponseStatusCode('@deleteApplication', 200);
    verifyResponseStatusCode('@getApplications', 200);
    cy.get('[data-testid="search-indexing-application-card"]').should(
      'not.exist'
    );
  });

  it('Install application', () => {
    interceptURL('GET', '/api/v1/apps/marketplace?limit=*', 'getMarketPlace');
    interceptURL('POST', '/api/v1/apps', 'installApplication');
    cy.get('[data-testid="add-application"]').click();
    verifyResponseStatusCode('@getMarketPlace', 200);
    cy.get(
      '[data-testid="search-indexing-application-card"] [data-testid="config-btn"]'
    ).click();
    cy.get('[data-testid="install-application"]').click();
    cy.get('[data-testid="save-button"]').scrollIntoView().click();
    cy.get('[data-testid="submit-btn"]').scrollIntoView().click();
    cy.get('[data-testid="cron-type"]').click();
    cy.get('.rc-virtual-list [title="Day"]').click();
    cy.get('[data-testid="cron-type"]').should('contain', 'Day');
    cy.get('[data-testid="deploy-button"]').click();
    verifyResponseStatusCode('@installApplication', 201);
    verifyResponseStatusCode('@getApplications', 200);
    cy.get('[data-testid="search-indexing-application-card"]').should(
      'be.visible'
    );
  });

  it('Run application', () => {
    interceptURL(
      'GET',
      '/api/v1/apps/name/SearchIndexingApplication?fields=*',
      'getSearchIndexingApplication'
    );
    interceptURL(
      'POST',
      '/api/v1/apps/trigger/SearchIndexingApplication',
      'triggerPipeline'
    );
    cy.get(
      '[data-testid="search-indexing-application-card"] [data-testid="config-btn"]'
    ).click();
    verifyResponseStatusCode('@getSearchIndexingApplication', 200);
    cy.get('[data-testid="run-now-button"]').click();
    verifyResponseStatusCode('@triggerPipeline', 200);
  });
});
