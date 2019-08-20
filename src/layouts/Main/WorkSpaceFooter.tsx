import * as React from 'react';
import { Layout, Icon, Popover, Button } from 'antd';
const { Footer } = Layout;
const { shell } = require('electron');

export interface Props {

}

export interface State {

}

class WorkSpaceFooter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleOpenLink = this.handleOpenLink.bind(this);
  }
  handleOpenLink(link: string) {
    shell.openExternal(link);
  }
  render() {
    return (
      <Footer style={{ textAlign: 'center', height: '90px', overflow: 'hidden' }}>
        <Button type="link" onClick={() => this.handleOpenLink('https://github.com/asdjgfr/DFL-X')}>
          DFL-X
        </Button>©2019 Created by Liu
    <br />
        <Icon type="github" onClick={() => this.handleOpenLink('https://github.com/asdjgfr')} title="GitHub" />
        &emsp;&emsp;
    <a href="tencent://Message/?Uin=1041001122&amp;websiteName=q-zone.qq.com&amp;Menu=yes" title="打开QQ与我联系">
          <Icon type="qq" />
        </a>
        &emsp;&emsp;
    <Popover content={<a href="mailto:liu@123456.plus?subject=DFL-X反馈">发送邮件</a>} title="liu@123456.plus">
          <Icon type="mail" />
        </Popover>
      </Footer>
    );
  }
}

export default WorkSpaceFooter;