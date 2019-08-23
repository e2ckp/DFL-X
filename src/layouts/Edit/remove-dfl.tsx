import * as React from 'react';
import { Modal, Button, Select, Collapse } from 'antd';

export interface Props {

}

export interface State {
  removeVisible: boolean
}

class RemoveDFL extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      removeVisible: false
    };
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel() {
    this.setState({
      removeVisible: false
    });
  }
  handleOK() {
    this.setState({
      removeVisible: false
    });
  }
  render() {
    return (
      <Modal
        title="删除DeepFaceLab"
        visible={this.state.removeVisible}
        onCancel={this.handleCancel}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleOK}>
            确认删除
          </Button>,
        ]}
      >
        删除DeepFaceLab
      </Modal>
    );
  }
}

export default RemoveDFL;