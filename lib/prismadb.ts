//Next.js hot preloading // evety code change -> code update and 
//reruns and in that case Prisma creates a bunch of this new Prisma
//client instances -> make an err
//so this is trick make it ok //save Prisma client on global file and
//global file done effected hot preloading.
import { PrismaClient } from "@prisma/client";
const client = global.prismadb ||  new PrismaClient();
if(process.env.NODE_ENV == "production") global.prismadb = client;

export default client;
