import { Message } from "@prisma/client";
import { prisma } from "../config/client";
import { generateMeetingId } from "../helpers/generateMeetingId"
import { string } from "zod";

export const newMeet = async () => {
  // --| Generate meeting id in the form XXX-XXX-XXX
  const id = await generateMeetingId;

  // --| Create meeting
  await prisma.meets.create({
    data: { id }
  });

  return id;
}

export const getMeet = async (meetId: string) => {
  const meet = await prisma.meets.findUnique({
    where: {
      id: meetId
    }
  });

  if (!meet) return null;

  return meet;
}

export const getMeetMessagesAndParticipants = async (meetId: string) => {
  const messagesAndParticipants = await prisma.meets.findMany({
    where: {
      id: meetId,
    }, include: {
      messages: true,
      participants: true
    }
  });

  return messagesAndParticipants
}

export const meetMessages = async (meetId: string) => {
  const messages = await prisma.meets.findUnique({
    where: {
      id: meetId
    }, 
    include: {
      messages: {
        include: {
          sender: {
            select: {
              username: true
            }
          }
        }
      }
    }
  });

  return messages;
}

export const addMessage = async (message: Omit<Message, "id" | "createdAt">) => {
  const newMessage = await prisma.message.create({
    data: {
      text: message.text,
      senderId: message.senderId,
      meetId: message.meetId 
    }, 
    include: {
      sender: {
        select:{
          username: true
        }
      }
    }
  });


  return newMessage;
}