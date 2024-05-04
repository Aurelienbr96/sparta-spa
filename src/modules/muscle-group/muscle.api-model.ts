import { MuscleGroupModel } from './muscle.domain-model';

export namespace MuscleGroupApiModel {
  export namespace GetAll {
    export type Input = void;

    export type Output = MuscleGroupModel.ArrayMuscleGroup;
  }
  export namespace Create {
    export type Input = Omit<MuscleGroupModel.MuscleGroup, 'id'>;
    export type Output = MuscleGroupModel.MuscleGroup;
  }
}
