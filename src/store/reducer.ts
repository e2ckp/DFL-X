import { CREATE_PROJECT } from './actionTypes';

const defaultState = {
  projects: []
};
export default (state = defaultState, action: { type: string, value: any }) => {
  if (action.type === CREATE_PROJECT) {
    let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
    newState.projects.push(action.value);
    return newState
  }
  return state
}