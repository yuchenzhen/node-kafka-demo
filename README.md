#### 实现
本 Demo 主要实现点对点队列的消费方式：

##### 安装：
本项目使用 typescript ， 首先需要本地安装 ts-node
```
npm i
```

其次需要安装`zookeeper`


##### 启动

Kafka
先启动 Zookeeper


生产者
```
npm run producer
```

启动好生产者后， 新开一个终端，启动消费者
1. 单个消费者
```
npm run consumer
```

2. 关闭单个消费者的终端，尝试在两个终端内分别执行以下命令，启动多个消费者
```
npm run consumerA

npm run consumerB
```




##### 消费方式：

1. 点对点： Work Queue

   ![](http://ww1.sinaimg.cn/large/6026faa6gy1g5hq3v08xvj206002smwx.jpg)



   ![](http://ww1.sinaimg.cn/large/6026faa6gy1g5hq4lzvbij20980330sk.jpg)



2. 发布-订阅：Publish/Subscribe

   ![](http://ww1.sinaimg.cn/large/6026faa6gy1g5hq5ro5dej20980330sj.jpg)


kafka 架构图

![转载自知乎<https://zhuanlan.zhihu.com/p/58836260>](http://ww1.sinaimg.cn/large/6026faa6gy1g276opfvgsj20k009tn4e.jpg)



名词

Producer： 生产者，发送信息的服务端

Consumer：消费者，订阅消息的客户端

Broker：消息中间件处理节点，一个Kafka节点就是一个broker，一个或者多个Broker可以组成一个Kafka集群

Topic: 主题，可以理解成队列

ConsumerGroup：消费者组，一个 ConsumerGoup 里面包括多个 Consumer，每个 ConsumerGoup 里面只有一个 Consumer 可以消费一个 Topic。基于这个特性，每个 ConsumerGoup 里面只存一个 Consumer 可以实现广播；所有 Consumer 都存在于同一个 ConsumerGoup 内则可以实现单播。

Partition：基于 Kafka 的拓展性，有可能一个很大的 Topic 会存在于不同的 Broker 里面。这时一个 Topic 里面就会存在多个 Partition，Partition 是一个有序的队列，Partition 上每个消息会有一个顺序的 id —— Offset。但是，值得注意的是，Kafka 会保证 Partition 的顺序性，而没有保证 Topic 的顺序性。

Offset：Kafka 的存储文件都是offset顺序存储的，以 offset.kafka 来命名。例如第一个就是 0000.kafka, 第 n 个文件就是 n-1.kafka



Zookeerper：管理多个 Kafka 节点，具有管理集群配置的功能
