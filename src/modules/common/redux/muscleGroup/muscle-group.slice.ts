import { createSlice } from '@reduxjs/toolkit';

import { MuscleGroupModel } from '@app/modules/muscle-group/muscle.domain-model';
import { muscleGroupApi } from './muscle-group.api';

type State = {
  muscleGroups: MuscleGroupModel.ArrayMuscleGroup;
};

const initialState: State = {
  muscleGroups: [MuscleGroupModel.nullUser],
};

export const muscleGroupSlice = createSlice({
  name: 'muscleGroups',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    /* Muscle Group API */
    builder.addMatcher(muscleGroupApi.endpoints.getMuscleGroups.matchFulfilled, (_state, action) => {
      return { muscleGroups: action.payload };
    });
    builder.addMatcher(muscleGroupApi.endpoints.createMuscleGroup.matchFulfilled, (state, action) => ({
      muscleGroups: [...state.muscleGroups, action.payload],
    }));
  },
});

export const { reset } = muscleGroupSlice.actions;
