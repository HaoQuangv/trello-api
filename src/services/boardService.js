/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters'
const createNew = async (reqBody) => {
  try {
    // Xu ly logic du lieu tuy dac thu du an
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Goi toi tang Model de xu ly luu ban ghi newBoard vao trong Database
    // ...

    // Lam them cac xu ly logic khac voi cac Colection khac tuy dac thu du an...vv
    // Ban email. notification ve cho admin khi co 1 cai board moi duoc tao

    // Tra ket qua ve, trong service luon phai co return
    return newBoard
  } catch (error) {throw error}
}

export const boardService = {
  createNew
}