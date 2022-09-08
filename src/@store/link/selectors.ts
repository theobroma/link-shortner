import type { RootState } from '../configureStore';

export const linksSelector = (state: RootState) => {
  return state.links;
};
