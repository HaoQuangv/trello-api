/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  try {
    // Xu ly logic du lieu tuy dac thu du an
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Goi toi tang Model de xu ly luu ban ghi newBoard vao trong Database
    const createdBoard = await boardModel.createNew(newBoard)

    // Lay ban ghi board sau khi goi (tuy muc dich du an ma co can buoc nay hay khong)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId.toString())
    // ...

    // Lam them cac xu ly logic khac voi cac Colection khac tuy dac thu du an...vv
    // Ban email. notification ve cho admin khi co 1 cai board moi duoc tao

    // Tra ket qua ve, trong service luon phai co return
    return getNewBoard
  } catch (error) {throw error}
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }

    // B1: Deep Clone board ra môt cái moi de xu ly, không änh huöng tói board ban däu, tuy muc dich vè sau mà có cân clone deep hay không. (video 63 se giai thich)
    // https://www.javascripttutorial.net/javascript-primitive-vs-reference-values/
    const resBoard = cloneDeep(board)

    //B2: Dua card ve dung column cua no
    resBoard.columns.forEach(column => {
      // Cach dung equals nay la boi vi chúng ta hieu ObjectId trong MongoDB có support method equals
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
      // Cach khac don gian là convert ObjectId vè string bäng ham tostring() cua JavaScript
      //column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    //B3: Xoa mang cards khoi board ban dau
    delete resBoard.cards

    return resBoard
  } catch (error) {throw error}
}

export const boardService = {
  createNew,
  getDetails
}