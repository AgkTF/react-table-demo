import { ColumnResizeMode, SortingState } from '@tanstack/react-table';
import { useReducer } from 'react';

type MW_STATE = {
  columnResizeMode: ColumnResizeMode;
  sorting: SortingState;
};

type Action = {
  type: string;
  payload?: any;
};

const INITIAL_STATE: MW_STATE = {
  columnResizeMode: 'onChange',
  sorting: [],
};

function reducer(state: MW_STATE, action: Action): MW_STATE {
  switch (action.type) {
    case 'updateSorting': {
      console.log(action.payload);

      return {
        ...state,
        sorting: action.payload,
      };
    }

    default:
      return state;
  }
}

export function useMiddlewareReducer() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return {
    state,
    dispatch,
  };
}
