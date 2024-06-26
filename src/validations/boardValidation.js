/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'

const createNew = async (req, res, next) => {
  /**
   * Note: Mac dinh chung ta khong can phai custom message o phia BackEnd lam gi vi de cho FrontEnd tu validate va custom message phia FE cho deo
   * BackEnd chi can validate dam bao du lieu chuan xac, va tra ve message mac dinh tu thu vien la duoc
   * Quan trong: Viec Validate du lieu la BAT BUOC phai co phia BackEnd vi day la diem cuoi de luu tru du lieu vao Database
   * Va thong thuong trong thuc te, dieu tot nhat cho he thong la hay luon Validate du lieu o ca phia FrontEnd va BackEnd
   */
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (haoquang)',
      'string.empty': 'Title is not allowed to be empty (haoquang)',
      'string.min': 'Title length must be at least 3 characters long (haoquang)',
      'string max': 'Title length must be less than or equal to 5 characters long (haoquang)',
      'string.trim': 'Title must not have leading or trailing whitespace (haoquang) '
    }),
    description: Joi.string().required().min(3).max(255).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })
  try {
    // Chi dinh abortEarly: false de truong hop co nhieu loi validation thi tra ve tat ca loi (video 52)
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate du lieu xong xuoi hop le thi cho request di tieo sang Controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew
}
