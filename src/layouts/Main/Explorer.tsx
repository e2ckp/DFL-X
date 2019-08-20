import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown, Empty, Button, Popover, Divider } from 'antd';
import { connect } from 'react-redux'
import styles from './Main.module.less';
import { createProject } from '@/src/store/actionCreators';
import QueueAnim from 'rc-queue-anim';
const { Sider } = Layout;

export interface Props {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  projects: [],
  createProject: () => void
}
export interface State {
}

class Explorer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.handleCtxMenu = this.handleCtxMenu.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
  }
  handleCtxMenu(index: number) {
    console.log(index);
  }
  handleClickMenu(e: {}) {
    console.log(e);

  }
  render() {
    return (
      <Sider className={styles.sider} collapsible collapsed={this.props.collapsed} onCollapse={this.props.onCollapse}>
        <div className={styles.explorerHeader} >
          {
            this.props.collapsed ?
              <Popover placement="right" content={<div>项目名称</div>}>
                <Icon type="file-protect" />
              </Popover> :
              <span>项目名称</span>
          }
        </div>
        <Dropdown overlay={
          <Menu>
            <Menu.Item key="rename"><Icon type="edit" />重命名</Menu.Item>
          </Menu>
        } trigger={['contextMenu']}>
          <Menu className={styles.explorer} defaultSelectedKeys={['0']} onClick={this.handleClickMenu} mode="inline" theme="dark">
            {
              this.props.projects.map((project: { name: string }, index: number) => (
                <Menu.Item className={styles.item} key={index} onContextMenu={() => this.handleCtxMenu(index)}>
                  <Icon type="pie-chart" />
                  <span>{project.name}</span>
                </Menu.Item>
              ))
            }
          </Menu>
        </Dropdown>
        {
          this.props.collapsed || this.props.projects.length ? null : <Empty
            description={
              <span>
                暂无项目
              </span>
            }
          >
          </Empty>
        }
        <div style={{ textAlign: 'center', color: '#fff' }}>
          {
            this.props.collapsed ?
              <Popover placement="right" content={<Button type="primary" onClick={this.props.createProject}>新建项目</Button>}>
                <Icon type="file-add" />
              </Popover> :
              <Button type="primary" onClick={this.props.createProject}>新建项目</Button>
          }
        </div>

      </Sider>
    );
  }
}

export default connect((state: Props) => {
  return {
    projects: state.projects
  }
}, (dispatch) => {
  return {
    createProject() {
      dispatch(createProject());
    }
  }
})(Explorer);