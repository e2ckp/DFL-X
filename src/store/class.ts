const uuidV4 = require('uuid/v4');

export class Project {
  uuid: string = uuidV4();
  name: string = `Project-${new Date().toISOString()}`;
  description: string = '';
  active: boolean = true;
  timeStamp: number = new Date().getTime();
  step: number = 0;
  constructor(parameters: {
    uuid?: string,
    name?: string,
    description?: string,
    active?: boolean,
    timeStamp?: number,
    step?: number
  } = {}) {
    this.uuid = parameters.uuid || this.uuid;
    this.name = parameters.name || this.name;
    this.description = parameters.description || this.description;
    this.active = parameters.active || this.active;
    this.timeStamp = parameters.timeStamp || this.timeStamp;
    this.step = parameters.step || this.step;
  }
};