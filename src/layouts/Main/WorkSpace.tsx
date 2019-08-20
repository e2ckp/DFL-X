import * as React from 'react';
import { Layout } from 'antd';
import WorkSpaceHeader from './WorkSpaceHeader';
import WorkSpaceContent from './WorkSpaceContent';
import WorkSpaceFooter from './WorkSpaceFooter';


export interface Props {
}

export interface State {
}

class WordSpace extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Layout>
        <WorkSpaceHeader />
        <WorkSpaceContent />
        <WorkSpaceFooter />
      </Layout>
    );
  }
}

export default WordSpace;