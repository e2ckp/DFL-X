import * as React from 'react';
import ChoiceVersion from './choice-version';
import RemoveDFL from './remove-dfl';
export interface Props {
}

export interface State {
}

class Edit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <ChoiceVersion />
        <RemoveDFL />
      </div>
    );
  }
}

export default Edit;