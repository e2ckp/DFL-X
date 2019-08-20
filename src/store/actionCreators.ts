import { CREATE_PROJECT } from './actionTypes';
import { Project } from './class';

export const createProject = () => ({
  type: CREATE_PROJECT,
  value: new Project()
});