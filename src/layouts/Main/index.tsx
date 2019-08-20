import * as React from 'react';
import { Layout } from 'antd';
import Explorer from './Explorer';
import WorkSpace from './WorkSpace';

export interface Props {
}
export interface State {
  collapsed: boolean;
  ctxIndex: number;
}

class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      collapsed: false,
      ctxIndex: 0
    };
    this.onCollapse = this.onCollapse.bind(this);
  }
  onCollapse = (collapsed: boolean) => {
    console.log(111, collapsed);

    this.setState({ collapsed });
  };
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Explorer collapsed={this.state.collapsed} onCollapse={this.onCollapse} />
        <WorkSpace />
      </Layout>
    );
  }
}

export default Main;