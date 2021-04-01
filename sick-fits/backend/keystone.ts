import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { createAuth } from '@keystone-next/auth'
import { password } from '@keystone-next/fields';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';



const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long are you signed in?
  secret: process.env.COOKIE_SECRET,
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password']
  }
})

export default withAuth(config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true
    },
  },
  // @ts-ignore
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    async onConnect(keystone) {
      if(process.argv.includes('--seed-data')){
        await insertSeedData(keystone); 
      }
    }
  },
  lists: createSchema({
    User,
    Product,
    ProductImage,

  }),
  ui: {
    //show UI only for users who pass test
    isAccessAllowed: ({ session }) => {
      //!! creates a boolean
      return !!session?.data;
    },
  },
  session: withItemData(statelessSessions(sessionConfig), {
    User: 'id name email'
  })
}))