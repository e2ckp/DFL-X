import update from 'immutability-helper';
import { CREATE_PROJECT, TOGGLE_PROJECT, RENAME_PROJECT, REMOVE_PROJECT } from './actionTypes';


interface State {
  projects: {}[];
  choiceItem: number
}

const defaultState: State = {
  projects: [],
  choiceItem: -1
};
const defaultAction: any = {
  type: '',
  value: ''
};



export default (state = defaultState, action = defaultAction) => {
  switch (action.type) {
    case CREATE_PROJECT:
      // 创建项目
      let createProjects = state.projects.map((v: { active?: boolean }) => {
        v.active = false;
        return v;
      });
      createProjects.push(action.value);
      return update(state, {
        projects: { $set: createProjects },
        choiceItem: { $set: createProjects.length - 1 },
      });
    case TOGGLE_PROJECT:
      // 切换项目
      return update(state, {
        choiceItem: {
          $set: action.value
        },
        projects: {
          $apply: (val: { active: boolean }[]) => {
            // 除了当前选中的项目起于的active全部设置为false
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
    case RENAME_PROJECT:
      // 重命名项目
      let projects: { [index: number]: any } = {};
      projects[action.value.index] = { name: { $set: action.value.val } }
      return update(state, { projects })
    case REMOVE_PROJECT:
      // 删除项目
      let removeChoiceItem = state.choiceItem;
      let removeProjects: any = [...state.projects];
      removeProjects.splice(action.value, 1);
      if (!removeProjects.some((p: any) => p.active) && removeProjects.length) {
        removeChoiceItem = removeProjects.length - 1;
        removeProjects[removeProjects.length - 1].active = true;
      }
      return update(state, { projects: { $set: removeProjects }, choiceItem: { $set: removeChoiceItem } });
    default:
      break;
  }
  return state
}