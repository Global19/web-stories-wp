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
 * External dependencies
 */
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useLayoutEffect, useState } from 'react';

const DEFAULT_WIDTH = 270;
const MAX_HEIGHT = 370;

const Container = styled.div`
  position: fixed;
  z-index: 2147483646;
  top: ${({ y }) => `${y}px`};
  left: ${({ x }) => `${x}px`};
  width: ${({ width }) => width}px;
  max-height: ${MAX_HEIGHT}px;
`;

function Popup({ anchor, children, width = DEFAULT_WIDTH, open }) {
  const [popupState, setPopupState] = useState(null);

  useLayoutEffect(() => {
    function positionPopup() {
      const anchorRect = anchor.current.getBoundingClientRect();
      const bodyRect = document.body.getBoundingClientRect();

      // Note: This displays the popup right under the node, currently no variations implemented.
      setPopupState({
        width,
        offset: {
          x: anchorRect.left - bodyRect.left - width + anchorRect.width,
          y: anchorRect.top + anchorRect.height,
        },
      });
    }
    positionPopup();

    // Adjust the position when scrolling or resizing.
    window.addEventListener('resize', positionPopup);
    document.addEventListener('scroll', positionPopup, true);
    return () => {
      window.removeEventListener('resize', positionPopup);
      document.removeEventListener('scroll', positionPopup, true);
    };
  }, [anchor, width]);

  return popupState && open
    ? createPortal(
        <Container {...popupState.offset} width={width}>
          {children}
        </Container>,
        document.body
      )
    : null;
}

export default Popup;
