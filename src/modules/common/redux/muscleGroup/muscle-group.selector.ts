import { State } from '@app/app';
import { createSelector } from '@reduxjs/toolkit';

export const selectLogin = createSelector(
  (state: State) => state,
  (state) => state.muscleGroups,
);

export const selectFetchedMuscleGroups = createSelector(selectLogin, (muscleGroup) => muscleGroup.muscleGroups);
