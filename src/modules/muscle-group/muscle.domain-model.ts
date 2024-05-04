export namespace MuscleGroupModel {
  export type MuscleGroup = {
    id: string;
    name: string;
    description: string;
  };

  export type ArrayMuscleGroup = Array<MuscleGroup>;

  export const nullUser: MuscleGroup = {
    id: '',
    name: '',
    description: '',
  };
}
