import * as React from 'react';
import { Modal, Button } from 'antd';
import styles from './About.module.less';
const { ipcRenderer, shell } = require('electron');
export interface Props {
}
export interface State {
  openAbout: boolean;
  supportMe: boolean;
}

class About extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openAbout: false,
      supportMe: false
    };
    this.handleSupportMe = this.handleSupportMe.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOpenLink = this.handleOpenLink.bind(this);
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
  handleOpenLink(link: string) {
    shell.openExternal(link);
  }
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
          <div className={styles.about}>
            <p className={styles.big}>图标</p>
            <p>DFL-X</p>
            <p>版本：0.1(0.1.1)</p>
            <p>Copyright © 2019-2019 liu.</p>
            <p className={styles.warning}>
              <strong>
                <u>
                  <i>
                    本软件基于&nbsp;<img onClick={() => this.handleOpenLink('https://www.gnu.org/licenses/gpl-3.0.en.html')} className={styles['gpl-image']} alt="GPL V3" title="默认浏览器中查看GPL V3开源协议" src='https://img.shields.io/badge/GPL-V3-red' />&nbsp;开源协议，仅供学习交流使用，严禁用于违法用途！严禁用于商业用途！
                </i>
                </u>
              </strong>
            </p>
          </div>
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