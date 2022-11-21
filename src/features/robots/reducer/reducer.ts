import { createReducer } from '@reduxjs/toolkit';
import { Robot } from '../models/robot';
import * as ac from './action.creators';

const initialState: Array<Robot> = [];

export const robotReducer = createReducer(initialState, (builder) => {
    builder.addCase(ac.loadActionCreator, (_state, action) => action.payload);
    builder.addCase(ac.addActionCreator, (state, action) => [
        ...state,
        action.payload,
    ]);
    builder.addCase(ac.updateActionCreator, (state, action) =>
        state.map((item) =>
            item.id_front === action.payload.id_front ? action.payload : item
        )
    );
    builder.addCase(ac.deleteActionCreator, (state, action) =>
        state.filter((item) => item.id_front !== action.payload)
    );
    builder.addDefaultCase((state) => state);
});
