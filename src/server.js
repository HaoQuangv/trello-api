/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  // Enable req.body json data
  app.use(express.json())
  //Use APIs_V1
  app.use('/v1', APIs_V1)

  //Middleware xu ly loi tap trung
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hi ${ env.AUTHOR }, Back-end Server is running successfully at Host: ${ env.APP_HOST } and Port: ${ env.APP_PORT }`)
  })

  // Thuc hien cac tac vu clean up truoc khi dung server
  //Doc them o day: https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB Cloud Atlas!')
  })
}

// Chi khi ket noi toi Database thanh cong thi moi Start Server Back-end len
// Immidiately Invoked Function Expression (IIFE)/ Anonymous Async Function(IIFE)
(async () => {
  try {
    console.log('1. Connecting to MongoDB Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Clous Atlas!')

    // Khoi dong Server Back-end sau khi Connect Database thanh cong
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// Chi khi ket noi toi Database thanh cong thi moi Start Server Back-end len
// console.log('1. Connecting to MongoDB Atlas...')
// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB Clous Atlas!'))
//   .then(() => START_SERVER())
//   .catch( error => {
//     console.error(error)
//     process.exit(0)
//   })
