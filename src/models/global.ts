import { Effect, ImmerReducer, Subscription } from 'umi';

export interface GlobalModelState {
  user: {
    account?: string;
  };
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: ImmerReducer<GlobalModelState>;
  };
  subscriptions: {};
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    user: {
      account: '',
    },
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    save(state, action) {
      state.user = action.payload;
    },
  },
  subscriptions: {},
};

export default GlobalModel;
