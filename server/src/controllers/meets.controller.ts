import { Request, Response } from "express"
import { HttpCode } from "../constants/statusCodes"
import { addMessage, getMeet, meetMessages, newMeet } from '../services/meets.service';
import { meetingAndParticipants } from "../app";

export const createMeet = async (req: Request, res: Response) => {
  try {
    const meetId = await newMeet();

    // --| Initialise the meeting
    meetingAndParticipants.set(meetId, [])

    res.status(HttpCode.CREATED).json({ meetId, message: 'Created meet successfully' });
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message })
  }
}

export const confirmMeet = async (req: Request, res: Response) => {
  try {
    const { meetId } = <{ meetId: string }>req.params;
    const confirmed = await getMeet(meetId);

    if (!confirmed) return res.status(HttpCode.NOT_FOUND).json({ message: 'Invalid meet Id, please check and try again' });

    res.status(HttpCode.OK).json({ message: 'Welcome to the meet' });
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message })
  }
}

export const addMessageToMeet = async (req: Request<{}, {}, {text: string, meetId: string, senderId: string}>, res: Response) => {
  try {
    const _message = req.body;

    const message = await addMessage(_message);

    // --| Send message to all users in the meet
    const participants = meetingAndParticipants.get(_message.meetId)
    participants?.forEach(({ socket }) => {
      socket.emit('message', message);
    })

    return res.status(HttpCode.CREATED).json({ data: message, message: 'Message added to meet successfully' });
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message })
  }
}

export const getMeetMessages = async (req: Request, res: Response) => {
  try {
    const { meetId } = <{ meetId: string }>req.params;
    const messages = await meetMessages(meetId);

    if (!messages) return res.status(HttpCode.NOT_FOUND).json({ message: 'Meet with the provided id not found' });

    res.status(HttpCode.OK).json({ message: 'Welcome to the meet', data: messages });
  } catch (error) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message })
  }
}