import app from "./src/app.js";
import connectDB from './src/config/database.js';
import { config } from './src/config/config.js';
await connectDB();
app.listen(config.port, () => console.log(`Running on ${config.port}`));
//# sourceMappingURL=server.js.map