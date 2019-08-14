# DFLCUDA-X
基于最新版的[windows编译版本](https://github.com/iperov/DeepFaceLab/blob/master/doc/doc_prebuilt_windows_app.md)的[DeepFaceLab](https://github.com/iperov/DeepFaceLab)
- DeepFaceLabCUDA9.2SSE - for NVIDIA cards up to GTX1080 and any 64-bit CPU
- DeepFaceLabCUDA10.1AVX - for NVIDIA cards up to RTX and CPU with AVX instructions support
- DeepFaceLabOpenCLSSE - for AMD/IntelHD cards and any 64-bit CPU

启动`dev`:
```shell
cd DFL-X
yarn install
yarn dev
```
打包:
```shell
yarn electron-pack
```