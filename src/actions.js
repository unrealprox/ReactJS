/*
    action types
 */

 export const SET_FIELD = 'SET_FIELD';

 /*
    action creators
  */

 export const setField = (row, col) => ({ type: SET_FIELD, data: { row, col } });