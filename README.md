# house

## 场景

是所有不同对象的容器

- add 添加对象
- remove 移除对象
- children 获取所有子对象列表
- getObjectByName 根据名字获取对象
- traverse 遍历
- fog 雾化
- overrideMaterial 材质覆盖

## 相机

决定屏幕上哪些东西需要渲染

## 渲染器

基于摄像机和场景提供的信息，调用底层图形 API 执行真正的场景绘制工作

## 对象(几何体)

它们是摄像机透视图里主要的渲染对象，如方块、球体。除了 Three.js 提供的几何体，还可以自定义几何体。通过自定义顶点(vertices)和面(faces)。

## 光源

决定材质如何显示以及用于产生阴影

PointLight 点光源 AmbientLight 环境光 SpotLight 聚光灯光源 DirectionalLight 平行光 HemisphereLight 半球光 （很少用） AreaLight 面光源（很少用） RectAreaLight 区域光（刚出）

## 材质

MeshBasicMaterial 网格基础材质，不会对光有反应，只使用指定颜色渲染物体或显示线框 MeshDepthMaterial 网格深度材质，对象距摄像机的距离决定其颜色（很少用） MeshNormalMaterial 网格法向材质，根据法向量决定其颜色 MeshFaceMaterial 网格面材质，可以为各个面指定不同颜色 MeshLambertMaterial 网格朗伯材质，考虑光照影响，适合创建颜色暗淡的物体（表面粗糙物体，如树木、岩石、山体） MeshPhongMaterial 网格 Phong 材质，考虑光照影响，适合创建颜色明亮的物体 ShaderMaterial 着色器材质，允许使用自定义着色程序，直接控制顶点的放置方式及像素的着色方式

## 纹理

## 坐标系

## 阴影

castShadow 投射阴影  
receiveShadow 接受显示阴影

## 模型加载

有的模型文件只包含顶点信息，有的除了顶点之外还包含材质信息

## 其他

1. 使用 Three.js 渲染场景时，首先需要做的是创建 THREE.Scene 对象，添加摄像机、光源和需要渲染的物体；如何给场景添加阴影和动画效果；添加辅助库 dat.GUI 和 stats.js 创建用户控制界面和快速获取场景渲染时的帧数。
2. 可以为对象命名 xxx.name = 'xxx1' 然后通过 Three.getObjectByName('xxx1') 来获取场景中对应名字的对象。
3. THREE.SmoothShading 顶点法向量、THREE.FlatShading 平面法向量
4. 使用[gltf-pipeline](https://www.npmjs.com/package/gltf-pipeline) 压缩 gltf 模型

## 参考

Cracking the three.js object fitting (to camera) nut  
https://wejn.org/2020/12/cracking-the-threejs-object-fitting-nut/

Three.js 包围盒 Box3  
http://www.yanhuangxueyuan.com/doc/Three.js/Bxo3.html

Three.js 模型几何体自动全屏  
http://www.yanhuangxueyuan.com/doc/Three.js/ModelFullScreen.html

使用 three.js 搭建室内场景  
https://blog.csdn.net/u014529917/article/details/82801737

首个 threejs 项目-前端填坑指南【转】  
https://www.cnblogs.com/mazhenyu/p/8692835.html

ThreeJs 做智慧城市项目后记  
https://blog.csdn.net/qq_37540004/article/details/102862348

https://wow.techbrood.com/static/20210123/60783.html  
https://www.techbrood.com/?q=%E6%A5%BC  
https://www.bilibili.com/s/video/BV1ob4y1y7o4 https://blog.csdn.net/qq_29814417/article/details/117598186  
https://juejin.cn/post/6844903957416902669  
https://github.com/funky-tiger/shanghai-bund

从零开始初尝 Three.js【大量案例、简单入手】  
https://juejin.cn/post/6844904177345232903

我是如何用 Three.js 在三维世界建房子的（详细教程）  
https://juejin.cn/post/7038824515404562463  
https://github.com/QuarkGluonPlasma/threejs-exercize

https://juejin.cn/post/6844904014845313038

https://www.jb51.net/article/153778.htm

http://www.360doc.com/content/20/0809/11/65097895_929317137.shtml

ThreeJs 做智慧城市项目后记  
https://www.daimajiaoliu.com/daima/4797a15af1003f8

三维文件格式知多少(.gltf .glb .fbx .obj)  
http://www.bgteach.com/article/132

three.js 怎么点击加载完成的 gltf 模型  
https://segmentfault.com/q/1010000015893234

**gltf 模型详解** 内存占用分析，性能优化  
https://www.jianshu.com/p/905671909b25

**Three.js 模型加载速度(模型太大)** 减面和导出法线贴图、颜色贴图、金属粗糙贴图  
http://www.yanhuangxueyuan.com/doc/Three.js/ModelTooBig.html

**Three.js 边界线框 EdgesGeometry**  
http://www.yanhuangxueyuan.com/doc/Three.js/EdgesGeometry.html

**Three.js 教程**  
http://www.yanhuangxueyuan.com/Three.js_course.html

**如何在页面极速渲染 3D 模型**  
https://cloud.tencent.com/developer/article/1552903

Threejs 大型 obj 文件的秒加载实现  
https://www.jianshu.com/p/5c2cafcea26c

ThreeJS 性能优化 - 减面（THREE.SimplifyModifier）  
https://zhuanlan.zhihu.com/p/360260878  
https://github.com/mrdoob/three.js/blob/master/examples/webgl_modifier_simplifier.html

Threejs 效果调参在调什么？  
https://zhuanlan.zhihu.com/p/142773940

专栏：threejs 知多少  
https://www.zhihu.com/column/c_1246830299226718208

**也聊 webgl 中的大场景性能优化**  
https://zhuanlan.zhihu.com/p/154425898

**ThreeJS 与建模人员的合作方式**  
https://zhuanlan.zhihu.com/p/25400458

**适用于 WEB 端的 3D 模型及贴图压缩研究** https://zhuanlan.zhihu.com/p/98507074

**threejs 官方编辑器** https://threejs.org/editor/

使用**UV 映射**将一张纹理贴图映射到不同面或不同位置。对于复杂对象，可以在建模时建立好模型贴图。

**压缩 gltf 模型**可以使用 `gltf-pipeline`，最好把模型拆分为`.bin`、`textures`、`.gltf`，可以单独对纹理图片做压缩。

Three.js 透明物体不能正常显示/渲染顺序的控制问题 
https://www.jianshu.com/p/5807b5f69480
https://www.webglstudy.com/article/1002845.html

## 例子

教你用 three.js 写一个炫酷的 3D 登陆页面  
https://juejin.cn/post/7020571868314730532

**用 Three.js 写了一个涵盖了大部分基础 3D 功能的综合场景**  
https://juejin.cn/post/7016920595623313416

2 天赚了 4 个 W，手把手教你用 Threejs 搭建一个 Web3D 汽车展厅！  
https://juejin.cn/post/6981249521258856456

可视化大屏-用 threejs 撸一个 3d 中国地图  
https://juejin.cn/post/7057808453263163422

RayClass 丨智慧园区可视化设计解析  
https://mp.weixin.qq.com/s/s85ek98GaNK9bnhJy8mVTw

**大屏适配解决方案**  
https://juejin.cn/post/6972416642600927246

基于等比缩放的大屏自适应方案  
https://juejin.cn/post/6966103143402700837

Vue+Echarts 企业级大屏项目适配方案  
https://juejin.cn/post/7009081081760579591

**threejs 3D 特效**
http://47.110.129.207/me-smart-ui/
https://gitee.com/superzay/threejs-animate

**shadertoy shader demo**
https://www.zhihu.com/question/22514128  shadertoy 这个网站如何玩？
https://www.shadertoy.com/

threejs 特效
https://github.com/stonerao/three-effect
https://www.sucaim.com/yuanma/datav/4557.html
https://github.com/Thinkia/three-Effect

掠过特效
https://github.com/stonerao/three-city-pass 
https://blog.csdn.net/qq_29814417/article/details/102840178

飞线特效
https://blog.csdn.net/weixin_40856652/article/details/125184863
https://juejin.cn/post/7064908871688519710
https://blog.csdn.net/towrabbit/article/details/103117002

Three.js地球开发—7.three.js波动光圈特效
https://blog.csdn.net/weixin_43787178/article/details/115070764

使用Three.js实现炫酷的赛博朋克风格3D数字地球大屏
https://www.cnblogs.com/dragonir/p/16516254.html

**Three.js通过不规则路径生成墙体(围栏)**
https://blog.csdn.net/qq_44375977/article/details/122102337

**shader**
https://github.com/csdjk/ThreeJS-Shader
## 大屏适配

1. 媒体查询太麻烦，成本高
2. scale 等比缩放等比例缩放时，如果实际屏幕比例和设计比例不一致，页面左右或者上下可能会有留白（背景可以 vw/vh 全屏，主体内容等比缩放）图表库等 canvas 实现方案，像素值固定，放大后可能会失真，显示模糊（渲染前动态获取放大缩小比例）阿里 datav https://datav.aliyuncs.com/share/aed87e5918e568aa927b230d3a23cade 网易有数 BI https://maxmeng.youdata.163.com/dash/caseView?pid=700250160&rid=334940&cToken=1646651872719646b2d0a64ab0b5d7b2b683b&tab=report
3. rem 更适合移动端自适应
4. vw 不能使用第三方 UI 库，尺寸会出错。最小字体问题，在小屏幕下，字体可能过大，破坏页面整体样式。
