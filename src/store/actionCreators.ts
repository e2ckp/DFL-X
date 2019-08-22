import { CREATE_PROJECT, TOGGLE_PROJECT, RENAME_PROJECT, REMOVE_PROJECT } from './actionTypes';
import { Project } from './class';

export const createProject = () => ({
  type: CREATE_PROJECT,
  value: new Project()
});
export const toggleProject = (val: number) => ({
  type: TOGGLE_PROJECT,
  value: val
});
export const renameProject = (val: { index: number, val: string }) => ({
  type: RENAME_PROJECT,
  value: val
});
export const removeProject = (val: number) => ({
  type: REMOVE_PROJECT,
  value: val
});