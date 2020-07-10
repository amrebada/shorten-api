import mongoose from "mongoose";
import config from "../config";

class DatabaseInit {
  connect() {
    return new Promise((resolve, reject) => {
      mongoose.connect(config.MONGO_URL, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}

export default new DatabaseInit();
