import * as React from 'react';
import { Modal, Button } from 'antd';
import styles from './About.module.less';
const { ipcRenderer } = require('electron');
export interface Props {
}
export interface State {
  openAbout: boolean;
  supportMe: boolean;
}
console.log(styles.big);

class About extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openAbout: false,
      supportMe: false
    };
    this.handleSupportMe = this.handleSupportMe.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  };
  handleSupportMe() {
    this.setState({
      supportMe: true
    });
  };
  handleCancel(type: string) {
    if (type === 'openAbout') {
      this.setState({
        openAbout: false
      });
    } else {
      this.setState({
        supportMe: false
      });
    }
  };
  componentDidMount() {
    const that = this;
    ipcRenderer.on('open-about', (sender: object, openAbout: boolean) => {
      that.setState({
        openAbout
      });
    });
  };
  render() {
    return (
      <div>
        <Modal
          title="关于本软件"
          visible={this.state.openAbout}
          onCancel={() => this.handleCancel('openAbout')}
          footer={[
            <Button key="back" onClick={() => this.handleCancel('openAbout')}>
              关闭
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleSupportMe}>
              赞助我
            </Button>,
          ]}
        >
          <p className={styles.big}>图标</p>
          <p>DFL-X</p>
          <p>版本：0.1(0.1.1)</p>
          <p>Copyright © 2019-2019 liu.</p>
        </Modal>
        <Modal
          title="支持我"
          visible={this.state.supportMe}
          onCancel={() => this.handleCancel('supportMe')}
          footer={[
            <Button key="back" type="primary" onClick={() => this.handleCancel('supportMe')}>
              确定
            </Button>
          ]}
        >
          <p>支持我</p>
        </Modal>
      </div>
    );
  }
}

export default About;