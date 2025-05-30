import { RequestHandler } from "express";
import prisma from "../db/prisma.js";

export const sendMessage: RequestHandler = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // Get the recipient ID from the URL parameters
    const senderId = req.user.id; // Get the sender ID from the request object

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,

        body: message,
        conversationId: conversation.id,
      },
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }
    res.status(201).json(newMessage);
  } catch (error: any) {
    console.error("Error sending message:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages: RequestHandler = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // Get the recipient ID from the URL parameters
    const senderId = req.user.id; // Get the sender ID from the request object
    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChatId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      res.status(404).json([]);
      return;
    }

    res.status(200).json(conversation.messages);
  } catch (error: any) {
    console.error("Error getting messages:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserForSidebar: RequestHandler = async (req, res) => {
  try {
    const authUserId = req.user.id; // Get the authenticated user ID from the request object
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId, // Exclude the authenticated user from the results
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    });

    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error getting user sidebar:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
