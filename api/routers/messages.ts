import express from "express";
import fileDb from "../fileDb";

const messageRouter = express.Router();

messageRouter.get('/', async (req, res) => {
  const messages = await fileDb.getAllMessages();
  res.send(messages);
});


export default messageRouter;