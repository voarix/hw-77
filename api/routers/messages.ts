import express from "express";
import fileDb from "../fileDb";
import { MessageWithoutId } from "../types";
import { imagesUpload } from "../multer";

const messageRouter = express.Router();

messageRouter.get('/', async (req, res) => {
  const messages = await fileDb.getAllMessages();
  res.send(messages);
});

messageRouter.post('/', imagesUpload.single('image') , async (req, res) => {

  if (!req.body.description.trim()) {
    res.status(400).send({error: "Message description is failed"});
    return;
  }

  const newMessage: MessageWithoutId = {
    author: req.body.author.trim() || 'Anonymous',
    description: req.body.description.trim(),
    image: req.file ? 'images/' + req.file.filename : null,
  };

  const savedNewMessage = await fileDb.addNewMessage(newMessage);
  res.send(savedNewMessage);
});

export default messageRouter;