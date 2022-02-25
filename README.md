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

PointLight 点光源
AmbientLight 环境光 
SpotLight 聚光灯光源 
DirectionalLight 平行光 
HemisphereLight 半球光 （很少用）
AreaLight 面光源（很少用）
RectAreaLight 区域光（刚出）

## 材质

MeshBasicMaterial 网格基础材质，不会对光有反应，只使用指定颜色渲染物体或显示线框
MeshDepthMaterial 网格深度材质，对象距摄像机的距离决定其颜色（很少用）
MeshNormalMaterial 网格法向材质，根据法向量决定其颜色
MeshFaceMaterial 网格面材质，可以为各个面指定不同颜色
MeshLambertMaterial 网格朗伯材质，考虑光照影响，适合创建颜色暗淡的物体（表面粗糙物体，如树木、岩石、山体）
MeshPhongMaterial 网格Phong材质，考虑光照影响，适合创建颜色明亮的物体
ShaderMaterial 着色器材质，允许使用自定义着色程序，直接控制顶点的放置方式及像素的着色方式

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
3. THREE.SmoothShading顶点法向量、THREE.FlatShading平面法向量
4. 使用[gltf-pipeline](https://www.npmjs.com/package/gltf-pipeline) 压缩 gltf 模型

## 参考
使用three.js搭建室内场景
https://blog.csdn.net/u014529917/article/details/82801737

首个threejs项目-前端填坑指南【转】
https://www.cnblogs.com/mazhenyu/p/8692835.html

ThreeJs做智慧城市项目后记
https://blog.csdn.net/qq_37540004/article/details/102862348

https://wow.techbrood.com/static/20210123/60783.html
https://www.techbrood.com/?q=%E6%A5%BC
https://www.bilibili.com/s/video/BV1ob4y1y7o4
https://blog.csdn.net/qq_29814417/article/details/117598186
https://juejin.cn/post/6844903957416902669 https://github.com/funky-tiger/shanghai-bund

从零开始初尝Three.js【大量案例、简单入手】
https://juejin.cn/post/6844904177345232903

我是如何用 Three.js 在三维世界建房子的（详细教程）
https://juejin.cn/post/7038824515404562463
https://github.com/QuarkGluonPlasma/threejs-exercize

https://juejin.cn/post/6844904014845313038

https://www.jb51.net/article/153778.htm

http://www.360doc.com/content/20/0809/11/65097895_929317137.shtml

ThreeJs做智慧城市项目后记
https://www.daimajiaoliu.com/daima/4797a15af1003f8

三维文件格式知多少(.gltf .glb .fbx .obj)
http://www.bgteach.com/article/132

three.js 怎么点击加载完成的gltf模型
https://segmentfault.com/q/1010000015893234

**gltf模型详解**
内存占用分析，性能优化
https://www.jianshu.com/p/905671909b25

**Three.js模型加载速度(模型太大)**
减面和导出法线贴图、颜色贴图、金属粗糙贴图
http://www.yanhuangxueyuan.com/doc/Three.js/ModelTooBig.html

**如何在页面极速渲染3D模型**
https://cloud.tencent.com/developer/article/1552903

Threejs大型obj文件的秒加载实现
https://www.jianshu.com/p/5c2cafcea26c

ThreeJS性能优化 - 减面（THREE.SimplifyModifier）
https://zhuanlan.zhihu.com/p/360260878
https://github.com/mrdoob/three.js/blob/master/examples/webgl_modifier_simplifier.html

Threejs效果调参在调什么？
https://zhuanlan.zhihu.com/p/142773940

专栏：threejs知多少
https://www.zhihu.com/column/c_1246830299226718208

**也聊webgl中的大场景性能优化**
https://zhuanlan.zhihu.com/p/154425898

**ThreeJS与建模人员的合作方式**
https://zhuanlan.zhihu.com/p/25400458

使用**UV映射**将一张纹理贴图映射到不同面或不同位置。对于复杂对象，可以在建模时建立好模型贴图。