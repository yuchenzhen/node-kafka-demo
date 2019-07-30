import * as kafka from 'kafka-node'

const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'})
// import {client} from './KafkaClient'

// const producer = new kafka.HighLevelProducer(client)
const producer = new kafka.Producer(client)

producer.on('ready', function () {
  console.log('Kafka Producer is connected and ready.')

})

// For this demo we just log producer errors to the console.
producer.on('error', function (error) {
  console.error(error)
})

export default producer

const sendRecord = (objData, cb) => {
  const partition = Date.now() % 2 === 0 ? 0 : 1
  const buffer = Buffer.from(JSON.stringify(objData) + '_' + partition)

  // Create a new payload
  const record = [
    {
      topic: `test`,
      // topic: `test_${partition}`,
      messages: buffer,
      attributes: 1, /* Use GZip compression for the payload */
      key: `key_${partition}`
    }
  ]

  // Send record to Kafka and log result/error
  console.info(`[record]:==:>${JSON.stringify(record)}`)
  producer.send(record, cb)
}

let times = 0

setInterval(() => {
  sendRecord({
    msg: `this is message ${++times}!`
  }, (err, data) => {
    if (err) {
      console.log(`err: ${err}`)
    }
    console.log(`data: ${JSON.stringify(data)}`)
  })
}, 1000)
