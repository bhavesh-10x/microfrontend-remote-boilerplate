export const actions = {
  INCREASE_LOADING_COUNT: 'INCREASE_LOADING_COUNT',
  DECREASE_LOADING_COUNT: 'DECREASE_LOADING_COUNT'
};

export const increaseLoadingCount = () => ({
  type: actions.INCREASE_LOADING_COUNT
});

export const decreaseLoadingCount = () => ({
  type: actions.DECREASE_LOADING_COUNT
});
