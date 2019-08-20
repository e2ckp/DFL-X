const uuidV4 = require('uuid/v4');

export class Project {
  uuid: string = uuidV4();
  name: string = `Project-${new Date().toISOString()}`;
  description: string = '';
  isSelected: boolean = false;
  timeStamp: number = new Date().getTime();
  step: number = 0;
  constructor(parameters: {
    uuid?: string,
    name?: string,
    description?: string,
    isSelected?: boolean,
    timeStamp?: number,
    step?: number
  } = {}) {
    this.uuid = parameters.uuid || this.uuid;
    this.name = parameters.name || this.name;
    this.description = parameters.description || this.description;
    this.isSelected = parameters.isSelected || this.isSelected;
    this.timeStamp = parameters.timeStamp || this.timeStamp;
    this.step = parameters.step || this.step;
  }
};