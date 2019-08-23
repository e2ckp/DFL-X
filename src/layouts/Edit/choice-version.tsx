import * as React from 'react';
import { Modal, Button, Select, Collapse } from 'antd';
import { _static } from '@/src/path';
const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs-extra');
const [{ Option }, { Panel }] = [Select, Collapse];

export interface Props {
}
export interface State {
  choiceVisible: boolean;
  dflVersions: [];
  directions: {};
  directionActiveKey: string;
  dflVersion: string;
  oldDflVersion: string;
}

class Edit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      choiceVisible: false,
      dflVersions: [],
      directions: {
        'DeepFaceLabCUDA9.2SSE': `官方解释：for NVIDIA cards up to GTX1080 and any 64-bit CPU。可以理解为低级版，适用于等于或低于GTX1080的NVIDIA ,64位CPU。CUDA版本9.2。`,
        'DeepFaceLabCUDA10.1AVX': `官方解释：for NVIDIA cards up to RTX and CPU with AVX instructions support。可以理解为高级版，适用于支持AVX指令的CPU，NVIDIA RTX，CUDA版本10.1。如果你有不错的N卡，毫不犹豫的选择DeepFaceLabCUDA10.1AVX，记得把CUDA更新10.1版本。`,
        'DeepFaceLabOpenCLSSE': `官方解释：for AMD/IntelHD cards and any 64-bit CPU。可以理解为兼容版，支持AMD/IntelHD 显卡和所有64位CPU。如果你是AMD显卡，你只能选择该版本，因为你根本没有其他选择。如果你没有独立显卡，只能用CPU运行，那么同样也只能选择该版本。`,
      },
      dflVersion: '',
      oldDflVersion: '',
      directionActiveKey: '',
    }
    this.loadAllVersions = this.loadAllVersions.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDirections = this.handleChangeDirections.bind(this);
  };
  loadAllVersions() {
    const dflPath = path.join(_static, 'DFL');
    this.setState({
      dflVersions: fs.readdirSync(dflPath).filter((file: string) => {
        if (fs.statSync(path.join(dflPath, file)).isDirectory()) {
          return true;
        }
        return false;
      })
    });
  }
  handleChoice() {
    localStorage.setItem('dflVersion', this.state.dflVersion);
    this.handleCancel();
  }
  handleCancel() {
    this.setState({
      choiceVisible: false,
      dflVersion: this.state.oldDflVersion
    });
  }
  handleChange(dflVersion: string) {
    this.setState({
      dflVersion,
      directionActiveKey: dflVersion,
      oldDflVersion: (localStorage.getItem('dflVersion') + '') === 'null' ? '未选择' : localStorage.getItem('dflVersion') + ''
    });
  }
  handleChangeDirections(directionActiveKey: any) {
    this.setState({
      directionActiveKey
    });
  }
  componentDidMount() {
    const that = this;
    this.loadAllVersions();
    const dflVersion = localStorage.getItem('dflVersion');
    if (dflVersion === null) {
      this.setState({
        choiceVisible: true
      });
    } else {
      this.setState({
        dflVersion
      });
    }
    ipcRenderer.on('choiceDFL', (sender: object, choiceVisible: boolean) => {
      that.setState({
        choiceVisible
      });
    });
  };
  render() {
    return (
      <Modal
        title="选择DeepFaceLab版本"
        visible={this.state.choiceVisible}
        onCancel={this.handleCancel}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            取消
            </Button>,
          <Button key="submit" type="primary" onClick={this.handleChoice}>
            确认选择
            </Button>,
        ]}
      >
        <Select value={this.state.dflVersion} onChange={this.handleChange} style={{ width: '100%' }}>
          {
            this.state.dflVersions.map((dfl: string, index: number) => <Option key={index} value={dfl}>{dfl}</Option>)
          }
        </Select>
        <Collapse onChange={(e) => this.handleChangeDirections(e)} accordion activeKey={this.state.directionActiveKey}>
          {
            Object.entries(this.state.directions).map((val: any[]) =>
              (<Panel header={val[0]} key={val[0]}>
                <p>{val[1]}</p>
              </Panel>))
          }
        </Collapse>
      </Modal>
    );
  }
}

export default Edit;