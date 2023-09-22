import { Request, Response, NextFunction } from 'express'
import Logger from '../../../loaders/logger'
import crosswordLayoutGenerator from 'crossword-layout-generator'

export const handleCreate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = [
            {
                clue: 'that which is established as a rule or model by authority, custom, or general consent',
                answer: 'standard',
            },
            {
                clue: 'a machine that computes',
                answer: 'computer',
            },
            {
                clue: 'the collective designation of items for a particular purpose',
                answer: 'equipment',
            },
            {
                clue: 'an opening or entrance to an inclosed place',
                answer: 'port',
            },
            {
                clue: 'a point where two things can connect and interact',
                answer: 'interface',
            },
        ]

        const layout = crosswordLayoutGenerator.generateLayout(data)

        const result = {
            across: {},
            down: {},
        }

        layout.result.forEach((entry) => {
            const { orientation, position, clue, answer, startx, starty } =
                entry
            const formattedEntry = {
                clue,
                answer,
                row: starty - 1,
                col: startx - 1,
            }

            if (orientation === 'across') {
                result.across[position] = formattedEntry
            } else if (orientation === 'down') {
                result.down[position] = formattedEntry
            }
        })

        res.status(201).json({
            success: true,
            message: 'Crossword created added successful',
            data: result,
        })
    } catch (err) {
        Logger.error(err)
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}
