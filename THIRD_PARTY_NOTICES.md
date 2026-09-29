# 第三方内容与素材来源说明

> **用途**：把 App 里**随包分发**的每一项第三方内容、它的来源、以及授权依据列清楚。
> 发布前逐项确认；拿不出依据的一律标「待替换」。
> 最后更新：2026-09-29

## 1. 随包的角色模型

| 文件 | 来源 | 授权依据 | 状态 |
|---|---|---|---|
| `Assets/StreamingAssets/Vrm/AvatarSample_A.vrm` | UniVRM 官方示例模型（VRM 0.x，`asset.generator = UniGLTF-1.28`） | 文件内 VRM meta：`author = VRoid`、`allowedUserName = Everyone`、`commercialUssageName = Allow`；但 `licenseName = Other` 且 **`otherLicenseUrl` 为空** | ⚠ **待确认** |
| `Assets/StreamingAssets/Vrm/AvatarSample_C.vrm` | 同上 | 同上 | ⚠ **待确认** |

**为什么要标待确认**：权限标记确实是"人人可用、可商用"，但 `licenseName = Other` 表示"依其他条款"，
而它指向的条款 URL 是空的 —— 也就是"允许"的凭据在文件里是断的。
做商业发布前，建议换成能拿到明确书面/条款许可的模型（自制、委托，或 BOOTH 上写明可商用的并保留购买记录）。

## 2. 随包的动作与姿势

| 文件 | 来源 | 授权依据 | 状态 |
|---|---|---|---|
| `Assets/StreamingAssets/Vrma/Sitting_Talking.vrma` | **Mixamo** 的 Sitting 系列（据 `docs/actions.md` 与 `HANDOFF` §1.95；`asset.generator = UniGLTF-2.64.2`） | Adobe 一般使用条款 + Mixamo 附加条款（快照见 `docs/legal/`） | ⚠ **待替换** |
| `Assets/StreamingAssets/Vrma/VRMA_01.vrma` | 待确认（`asset.generator = THREE.GLTFExporter`，文件内**无任何授权元数据**） | 无 | ⚠ **待确认** |
| `Assets/StreamingAssets/Pose/*.vroidpose` × 10 | 文件内含 `VRoidCustomData.PresetPose = "A-Stance"` 等编辑器字段 → 疑似本项目用 VRoid Studio 自行保存/导出 | 无独立授权声明 | ✓（建议在发布页与本文档补一句"由本项目用 VRoid Studio 制作"） |

**关于 Mixamo 的两条注意（2026-09-29 核实）**

1. 官方 FAQ 写明 **"Mixamo is not available for users who have a country code from China."**
   → 中国区账号不可用；外链到 Mixamo 对中文用户无效。**内容渠道应以 BOOTH 为主。**
2. `Mixamo Additional Terms`（en_US-20210623，见 `docs/legal/`）**全文只有一条**：
   禁止把服务或其内容（含"由服务派生出的信息"）用于创建、训练、测试或改进 AI/ML 模型。
   它**没有**关于"能否再分发"的条款 —— 那部分回到 Adobe 一般使用条款；而 mixamo.com 首页把
   *"film, games, interactive experiences and illustration"* 列为预期用途。

## 3. 第三方代码与引擎

| 组件 | 用途 | 许可 |
|---|---|---|
| Unity 2022.3.62f3 | 3D 引擎（Unity as a Library） | Unity 商业许可（随使用者账号） |
| UniVRM / UniGLTF | VRM 解析与导出 | MIT |
| MediaPipe Tasks Vision 0.10.14 | 皮肤分割（美颜/降噪） | Apache-2.0 |
| AndroidX / Jetpack Compose / Material 3 | 原生 UI 壳 | Apache-2.0 |

> ⚠ **待办**：上架前需要一份**完整**的 OSS 许可清单（逐库版本 + 许可全文），覆盖 Unity 导出的
> 全部 jar/aar。本文档目前只列主要依赖，未附许可全文。

## 4. 条款快照（留档）

| 文件 | 说明 | 来源 |
|---|---|---|
| `docs/legal/Mixamo-Addl-Terms-en_US-20210623.pdf` | Mixamo 附加条款（英文，2021-06-23 生效） | `wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/` |
| `docs/legal/Mixamo-Addl-Terms-zh_CN-20210623.pdf` | 同上（中文） | `wwwimages2.adobe.com/content/dam/cc/cn/legal/servicetou/` |
| （待补）Substance 3D Assets Product Specific Terms en_US-20250422 | 参考：展示了 Adobe 对"3D 素材独立再分发"的严格写法（`3.1(B)`、`3.2`、`3.3`） | 项目外部资料 |

Adobe 条款明确写 *"Replaces all prior versions"* —— 条款会变，留版本快照是为了日后能举证
"当时依据的是哪一版"。

## 5. 发布前检查清单

- [ ] `AvatarSample_A/C.vrm` 换成有明确许可的模型，或补齐 meta 中缺失的条款 URL 指向的条款
- [ ] `Sitting_Talking.vrma`、`VRMA_01.vrma` 换成有明确"可嵌入 App"授权的素材
      （BOOTH 商品说明里写「アプリへの組み込みOK」的，保留购买记录与商品页截图）
- [ ] 确认 App 内**没有**"导出/分享原始素材文件"的入口（成片导出不受影响）
- [ ] 素材库不把随包内容表述为"免费素材库 / 可下载素材"
- [ ] 补齐 OSS 许可清单（见 §3 待办）
