import { actions } from './actions';

const initialState = {
  isLoading: 0
};

export default (state = initialState, payload = {}) => {
  switch (payload.type) {
    case actions.INCREASE_LOADING_COUNT:
      return {
        ...state,
        isLoading: state.isLoading + 1
      };
    case actions.DECREASE_LOADING_COUNT:
      return {
        ...state,
        isLoading: state.isLoading - 1
      };
    default:
      return state;
  }
};
