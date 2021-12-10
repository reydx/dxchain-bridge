import { Effect, ImmerReducer } from 'umi';

export interface GlobalModelState {
  user: {
    account?: string;
  };
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    selectTokenEffects: Effect;
  };
  reducers: {
    selectTokenReducers: ImmerReducer<GlobalModelState>;
  };
  subscriptions: {};
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    user: {},
  },

  effects: {
    *selectTokenEffects({ payload }, { call, put }) {},
  },
  reducers: {
    selectTokenReducers(state, actions) {},
  },
  subscriptions: {},
};

export default GlobalModel;
