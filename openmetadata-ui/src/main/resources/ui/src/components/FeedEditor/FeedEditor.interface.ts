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
import { HTMLAttributes } from 'react';

export interface MentionSuggestionsItem {
  id: string | undefined;
  value: string;
  link: string;
  name: string;
  type?: string;
  avatarEle?: string;
  breadcrumbs: Array<{ name: string }>;
}

export interface FeedEditorProp extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  editorClass?: string;
  className?: string;
  placeHolder?: string;
  onChangeHandler?: (value: string) => void;
  onSave?: () => void;
  focused?: boolean;
}
