import * as React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
export interface Props {
}
export interface State {
}
class WorkSpaceContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Content>
        <div style={{ padding: 24, background: '#fff', height: 'calc(100vh - 160px)' }}>
          操作区
        </div>
      </Content>
    );
  }
}

export default WorkSpaceContent;