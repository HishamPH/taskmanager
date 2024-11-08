import createServer from "./framework/config/server";
import { connectDB } from "./framework/config/connectDB";
import { server } from "./framework/services/socketIo";
import { config } from "dotenv";
config();
const port = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    await createServer();
    server?.listen(port, async () => {
      console.log(`server is running at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
