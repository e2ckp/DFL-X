import { CREATE_PROJECT, TOGGLE_PROJECT } from './actionTypes';
import { Project } from './class';

export const createProject = () => ({
  type: CREATE_PROJECT,
  value: new Project()
});
export const toggleProject = (val: number) => ({
  type: TOGGLE_PROJECT,
  value: val
});