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

import { SortingField } from '../components/Explore/SortingDropDown';
import { SORT_ORDER } from '../enums/common.enum';
import i18n from '../utils/i18next/LocalUtil';

export const INITIAL_SORT_FIELD = 'totalVotes';
export const TAGS_INITIAL_SORT_FIELD = 'name.keyword';
export const INITIAL_SORT_ORDER = SORT_ORDER.DESC;
export const TAGS_INITIAL_SORT_ORDER = SORT_ORDER.ASC;
export const TIER_FQN_KEY = 'tier.tagFQN';
export const TAG_FQN_KEY = 'tags.tagFQN';

export const initialFilterQS = 'initialFilter';
export const searchFilterQS = 'searchFilter';
export const MAX_RESULT_HITS = 10000;

// as it is used only in unit tests it's not needed for translation
export const tableSortingFields: SortingField[] = [
  {
    name: i18n.t('label.popularity'),
    value: 'totalVotes',
  },
  {
    name: i18n.t('label.name'),
    value: 'name.keyword',
  },
  {
    name: i18n.t('label.weekly-usage'),
    value: 'usageSummary.weeklyStats.count',
  },
  { name: i18n.t('label.relevance'), value: '_score' },
  {
    name: i18n.t('label.last-updated'),
    value: 'updatedAt',
  },
];

export const entitySortingFields = [
  {
    name: i18n.t('label.popularity'),
    value: 'totalVotes',
  },
  {
    name: i18n.t('label.name'),
    value: 'name.keyword',
  },
  { name: i18n.t('label.relevance'), value: '_score' },
  {
    name: i18n.t('label.last-updated'),
    value: 'updatedAt',
  },
];

export const tagSortingFields = [
  {
    name: i18n.t('label.name'),
    value: 'name.keyword',
  },
  { name: i18n.t('label.relevance'), value: '_score' },
  {
    name: i18n.t('label.last-updated'),
    value: 'updatedAt',
  },
];

export interface ExploreTabInfo {
  label: string;
  sortingFields: SortingField[];
  sortField: string;
  path: string;
  icon?: string;
  selectedIcon?: string;
}

export const COMMON_FILTERS_FOR_DIFFERENT_TABS = [
  'owner.displayName',
  'tags.tagFQN',
];

export const FAILED_TO_FIND_INDEX_ERROR = 'Failed to to find index';

export const ES_EXCEPTION_SHARDS_FAILED = 'reason=all shards failed';

export const SEARCH_INDEXING_APPLICATION = 'SearchIndexingApplication';
