import * as React from 'react';
import { Layout } from 'antd';
const { Header } = Layout;
export interface Props {
}

export interface State {
}

class WorkSpaceHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Header style={{ background: '#fff', padding: 0, height: '70px', overflow: 'hidden' }} >
        总进度
      </Header>
    );
  }
}

export default WorkSpaceHeader;