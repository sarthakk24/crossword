import { Request, Response, NextFunction } from 'express'
import Logger from '../../../loaders/logger'
import { DBInstance } from '../../../loaders/database'

export const handleSubmit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.body.aaruushId) {
            throw new Error('aaruushId is required')
        }

        if (!req.body.timeTaken) {
            throw new Error('Time taken by user is required')
        }

        if (!req.body.name) {
            throw new Error('Name is required')
        }

        if (!req.body.email) {
            throw new Error('Email is required')
        }

        if (!req.body.regNum) {
            throw new Error('Registration number is required')
        }

        const data = {
            aaruushId: req.body.aaruushId,
            timeTaken: req.body.timeTaken,
            name: req.body.name,
            email: req.body.email,
            regNum: req.body.regNum,
            timeStamp: new Date(),
        }

        const db = await DBInstance.getInstance()

        const collection = await db.getCollection('crossword')

        const userExists = await collection.findOne({
            aaruushId: req.body.aaruushId,
        })

        if (userExists) {
            throw new Error('User already submitted')
        }

        await collection.insertOne(data)
        res.status(201).json({
            success: true,
            message: 'Submitted successful',
        })
    } catch (err) {
        Logger.error(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}
