// export interface IndexModelState {
//   name: string;
// }

// export interface IndexModelType {
//   namespace: 'index';
//   state: IndexModelState;
//   effects: {
//     query: Effect;
//   };
//   reducers: {
//     save: ImmerReducer<IndexModelState>;
//   };
// }

// const IndexModel: IndexModelType = {
//   namespace: 'index',

//   state: {
//     name: '',
//   },

//   effects: {
//     *query({ payload }, { call, put }) {},
//   },
//   reducers: {
//       state.name = action.payload;
//     },
//   }
// }

// export default IndexModel;
