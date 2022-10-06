import { Subject } from 'rxjs';

import { Exercise } from './exercise.model';

export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 300, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 1800, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 1200, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 600, calories: 8 },
  ];

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  // Added private keyword and helper method. for security?

  getAvailableExercises() {
      return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
      const selectedExercise = this.availableExercises.find(ex => ex.id === selectedId);
      this.exerciseChanged.next({ ...this.runningExercise });
  }

  completedExercise() {
      this.exercises.push({
          ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
      this.runningExercise = null;
      this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
        ...this.runningExercise,
          duration: this.runningExercise.duration * (progress / 100),
          calories: this.runningExercise.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled'
      });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }


  getRunningExercise() {
      return { ...this.runningExercise };
  }

  getCompletedOrCancelledExercises() {
      return this.exercises.slice();
  }
}
