import { CollectionConfig } from 'payload/types'
import { allowUserAdmin } from '../access/allowUserAdmin'


const Chats: CollectionConfig = {
  slug: 'chats',
  access: {
    create: () => true,
    read: allowUserAdmin,
  },
  fields: [
    {
      name: 'chat',
      type: 'textarea',
      required: true,
    },
    {
      name: 'account',
      type: 'relationship',
      relationTo: 'accounts',
    },
    {
      name: 'destination',
      type: 'relationship',
      relationTo: 'accounts',
    },
  ],
}

export default Chats
