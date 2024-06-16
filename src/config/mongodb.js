/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

// Khởi tạo một đối tượng trelloDatabaseInstance ban đầu là null (vì chúng ta chưa connect)
let trelloDatabaseInstance = null

// Khởi tạo một đối tượng mongoClientInstance để connect tới MongoDB
let mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Kết nối tới database
export const CONNECT_DB = async () => {
  // Goi ket noi toi MongoDB atlas voi URI da khai bao trong than cua mongoClientInstance
  await mongoClientInstance.connect()

  // Ket noi thanh cong thi lay ra Database theo ten va gan nguoc no lai vao bien trelloDatabaseInstance o tren cua chung ta
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Dong ket noi toi Database khi can
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

// Function GET_DB khong (async) nay co nhiem vu export ra cai Trello Database Instance khi da connect thanh cong toi MongoDB de chung ta su dung o nhieu noi khac nhau trong code
// Luu y phai dam bao chi luon goi GET_DB khi da connect thanh cong toi MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}
