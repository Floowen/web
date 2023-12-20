import { CollectionConfig } from 'payload/types'

const Accounts: CollectionConfig = {
  slug: 'accounts',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    }
  ],
}

export default Accounts
