export default {
  SET_INDICATORS: (state, payload) => {
    state.indicators = payload;
  },
  // ADD_INDICATORS: (state, payload) => {
  //   state.list = payload;
  // },
  // ADD_CATEGORIES: (state, payload) => {
  //   state.categories = payload;
  // },
  ADD_INDICATORS: (state, payload) => {
    const uniqueList = new Set([...payload.map((ind) => ind.name), ...state.list]);
    const list = Array.from(uniqueList);

    list.sort((a, b) => a > b);
    state.list = list;
    state.loadedList = [...payload, ...state.loadedList];
  },
  ADD_CATEGORIES: (state, payload) => {
    const uniqueList = new Set([...payload.map((ind) => ind.category), ...state.categories]);
    const list = Array.from(uniqueList);
    list.sort((a, b) => a > b);
    state.categories = list;
  },
};
