import {promises as fs} from 'fs';
import {existsSync} from "node:fs";
import {Message, MessageWithoutId} from "./types";
import * as crypto from "node:crypto";

const filename = './db.json';
let data: Message[] = [];

const fileDb = {
  async init() {
    try {
      if (!existsSync(filename)) {
        await fs.writeFile(filename, JSON.stringify([]));
      } else {
        const fileContent = await fs.readFile(filename);
        data = JSON.parse(fileContent.toString()) as Message[];
      }
    } catch (e) {
      data = [];
      console.error(e);
    }
  },
  async getAllMessages() {
    await fileDb.init();
    return data.reverse();
  },
  async addNewMessage(messageToAdd: MessageWithoutId) {
    const newMessage = {id: crypto.randomUUID(), ...messageToAdd};
    data.push(newMessage);
    await this.save();
    return newMessage;
  },
  async save () {
    return fs.writeFile(filename, JSON.stringify(data));
  }
};

export default fileDb;