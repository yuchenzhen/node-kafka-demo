import * as kafka from 'kafka-node'

const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'})
const offset = new kafka.Offset(client)

const topics = [
  {
    topic: 'test'
  }
]
const options = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024
  // encoding: "buffer"
}
// { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

const consumer = new kafka.Consumer(client, topics, options)
export default consumer

// 处理消息
consumer.on('message', function (message) {

  // Read string into a buffer.
  console.info(`[message]:==:>${JSON.stringify(message)}`)
  // const buf = new Buffer(String(message.value), 'binary')
  const decodedMessage = message // JSON.parse(buf.toString())

  console.log('decodedMessage: ', decodedMessage)
})

// 消息处理错误
consumer.on('error', function (err) {
  console.log('error', err)
})

consumer.on('offsetOutOfRange', function (topic) {
  console.info(`[offsetOutOfRange]:==:>${topic}`)
  topic.maxNum = 2
  offset.fetch([topic], function (err, offsets) {
    if (err) {
      return console.error(err)
    }
    let min = Math.min.apply(null, offsets[topic.topic][topic.partition])
    consumer.setOffset(topic.topic, topic.partition, min)
  })
})

process.on('SIGINT', function () {
  consumer.close(true, function () {
    console.log('consumer colse!')
    process.exit()
  })
})
