import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown, Empty, Button, Popover } from 'antd';
import { connect } from 'react-redux'
import styles from './Main.module.less';
import { createProject, toggleProject } from '@/src/store/actionCreators';
const { Sider } = Layout;

export interface Props {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  projects: { name: string, active: boolean }[];
  createProject: () => void;
  toggleProject: (val: { key: string }) => void;
}
export interface State {
}

class Explorer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.handleCtxMenu = this.handleCtxMenu.bind(this);
  }
  handleCtxMenu(index: number) {
    console.log(index);
  }
  render() {
    const { collapsed, projects, onCollapse, toggleProject, createProject } = this.props;
    const activeIndex = projects.findIndex(project => project.active);
    const activeProject = projects[activeIndex];
    return (
      <Sider className={styles.sider} collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={styles.explorerHeader} >
          <Popover placement="right" content={<div>{activeProject ? activeProject.name : '暂无项目，点击下方按钮新建'}</div>}>
            {collapsed ? <Icon type="file-protect" /> :
              <span>{activeProject ? activeProject.name : '暂无项目，点击下方按钮新建'}</span>}
          </Popover>
        </div>
        <Dropdown overlay={
          <Menu>
            <Menu.Item key="rename"><Icon type="edit" />重命名</Menu.Item>
            <Menu.Item key="del"><Icon type="delete" />删除项目</Menu.Item>
          </Menu>
        } trigger={['contextMenu']}>
          <Menu className={styles.explorer} selectedKeys={[`${activeIndex}`]} onClick={toggleProject} mode="inline" theme="dark">
            {
              projects.map((project: { name: string }, index: number) => (
                <Menu.Item className={styles.item} key={index} onContextMenu={() => this.handleCtxMenu(index)}>
                  <Icon type="pie-chart" />
                  <span>{project.name}</span>
                </Menu.Item>
              ))
            }
          </Menu>
        </Dropdown>
        {
          collapsed || projects.length ? null : <Empty
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
            collapsed ?
              <Popover placement="right" content={<Button type="primary" onClick={createProject}>新建项目</Button>}>
                <Icon type="file-add" />
              </Popover> :
              <Button type="primary" onClick={createProject}>新建项目</Button>
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
    },
    toggleProject(val: { key: string }) {
      dispatch(toggleProject(Number(val.key)))
    }
  }
})(Explorer);