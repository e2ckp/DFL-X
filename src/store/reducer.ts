import update from 'immutability-helper';
import { CREATE_PROJECT, TOGGLE_PROJECT } from './actionTypes';

const defaultState: {
  projects: {}[];
  choiceItem: number
} = {
  projects: [],
  choiceItem: -1
};
export default (state = defaultState, action: { type: string, value: any }) => {
  if (action.type === CREATE_PROJECT) {
    return update(state, {
      projects: {
        $apply: (val: { active: boolean }[]) => {
          let newVal = val.map(v => {
            v.active = false;
            return v;
          });
          newVal.push(action.value);
          return newVal;
        }
      }
    })
  }
  if (action.type === TOGGLE_PROJECT) {
    return update(state, {
      choiceItem: {
        $set: action.value
      },
      projects: {
        $apply: (val: { active: boolean }[]) => {
          return val.map((v, index) => {
            if (index === action.value) {
              v.active = true;
            } else {
              v.active = false;
            }
            return v;
          });
        }
      }
    });
  }
  return state
}