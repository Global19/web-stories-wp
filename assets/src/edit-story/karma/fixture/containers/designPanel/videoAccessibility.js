/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Internal dependencies
 */
import { AbstractPanel } from './abstractPanel';

/**
 * The video accessibility panel containing inputs for adding poster and title.
 */
export class VideoAccessibility extends AbstractPanel {
  constructor(node, path) {
    super(node, path);
  }

  get poster() {
    return this.getByRole('region', { name: /poster/i });
  }

  get posterImage() {
    return this.getByRoleIn(this.poster, 'img');
  }

  get posterMenuButton() {
    return this.getByRoleIn(this.poster, 'button', { name: /more/i });
  }

  get posterMenuEdit() {
    return this.getByRoleIn(this.node.ownerDocument, 'menuitem', {
      name: /edit/i,
    });
  }

  get posterMenuReset() {
    return this.getByRoleIn(this.node.ownerDocument, 'menuitem', {
      name: /reset/i,
    });
  }
}
