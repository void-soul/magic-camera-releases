# Changelog

All notable releases are listed here. The APK for each version is attached to the matching
GitHub Release.

格式参考 [Keep a Changelog](https://keepachangelog.com/)；版本号对应 `static/version.json`
里的 `versionName` / `versionCode`。

## [1.0] — 2026-09-29

首次公开发布。

**Added**
- VRM 角色相机：虚拟角色与实时相机画面合成，直接在取景器里拖动/缩放/旋转。
- 角色库：内置角色 + 导入自己的 `.vrm`（支持 VRM 0.x 与 1.0）。
- 表情：20+ 表情元件，可叠加并调强度。
- 姿势：内置 `.vroidpose` 姿势，支持用户导入。
- 动作：`.vrma` 直放动作，支持导入与定格播放。
- 拍照：三档画质、视频录制、定时与延时。
- 相机面板：构图、美颜、降噪、滤镜、变焦、网格、闪光灯、前后摄。
- 8 种界面语言，首次启动跟随系统语言。

**Notes**
- 安装包体积 103.5 MB（已按 ABI 收口：只出 arm64-v8a）。
- 无账号、无云上传、不收集任何数据。
