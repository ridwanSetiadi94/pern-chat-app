// This file contains global type definitions for the application.
type ConversationType = {
  id: string;
  fullName: string;
  profilePic: string;
};

type MessageType = {
  id: string;
  body: string;
  senderId: string;
  createdAt: string;
  shouldShake?: boolean; // Optional property to indicate if the message should shake
};
