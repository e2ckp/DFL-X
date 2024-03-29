import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown, Empty, Button, Popover, Modal, Input } from 'antd';
import { connect } from 'react-redux'
import styles from './Main.module.less';
import { createProject, toggleProject, renameProject, removeProject } from '@/src/store/actionCreators';
const { Sider } = Layout;

export interface Props {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  projects: { name: string, active: boolean }[];
  createProject: () => void;
  toggleProject: (val: { key: string }) => void;
  handleClickCtxMenu: (index: number, val?: { key: string }, str?: string) => void;
}
export interface State {
  ctxIndex: number;
  visible: boolean;
  inputVal: string;
}

class Explorer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ctxIndex: 0,
      visible: false,
      inputVal: '',
    };
    this.handleCtxMenu = this.handleCtxMenu.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }
  handleCtxMenu(ctxIndex: number) {
    this.setState({
      ctxIndex
    });
  }
  handleOk() {
    this.props.handleClickCtxMenu(this.state.ctxIndex, { key: 'rename' }, this.state.inputVal);
    this.setState({
      visible: false,
    });
  }
  handleCancel() {
    this.setState({
      visible: false,
    });
  }
  handleClickCtxMenu(index: number, e: { key: string }) {
    switch (e.key) {
      case 'remove':
        this.props.handleClickCtxMenu(index, e);
        break;
      case 'rename':
        this.setState({
          visible: true
        });
        break;
      default:
        break;
    }
  }
  handleChangeInput(e: any) {
    e.persist();
    this.setState({
      inputVal: e.target.value
    });
  }
  render() {
    const { collapsed, projects, onCollapse, toggleProject, createProject } = this.props;
    const { ctxIndex } = this.state;
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
          <Menu onClick={this.handleClickCtxMenu.bind(this, ctxIndex)}>
            <Menu.Item key="rename"><Icon type="edit" />重命名</Menu.Item>
            <Menu.Item key="remove"><Icon type="delete" />删除项目</Menu.Item>
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

        <Modal
          title={`重命名项目：${projects[ctxIndex] ? projects[ctxIndex].name : ''}`}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <Input placeholder="输入项目名称" onChange={this.handleChangeInput} defaultValue={projects[ctxIndex] ? projects[ctxIndex].name : ''} />
        </Modal>
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
    },
    handleClickCtxMenu(index: number, val: { key?: string } = {}, str: string = '') {
      switch (val.key) {
        case 'rename':
          dispatch(renameProject({ index: index, val: str }))
          break;
        case 'remove':
          dispatch(removeProject(index))
          break;
        default:
          break;
      }
    }
  }
})(Explorer);