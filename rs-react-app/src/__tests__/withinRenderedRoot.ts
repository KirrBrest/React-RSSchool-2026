import { within, type RenderResult } from '@testing-library/react';

export function withinRenderedRoot(view: RenderResult) {
  return within(view.container);
}
