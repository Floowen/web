import { CollectionConfig } from 'payload/types'
import { allowUserAdmin } from '../access/allowUserAdmin'

const Groups: CollectionConfig = {
  slug: 'groups',
  access: {
    create: () => true,
    read: allowUserAdmin,
    update: ()=>  true,
    delete: ()=>  true,
  },
  fields: [
    {
      name: 'groupname',
      label: 'Group Name',
      type: 'text',
      required: true,
    },
    {
      name: 'members',
      label: 'Members',
      type: 'relationship',
      relationTo: 'accounts',
      hasMany: true,
    },
    {
      name: 'chats',
      label: 'Chats',
      type: 'relationship',
      relationTo: 'chats',
      hasMany: true,
    }
  ],
  
}

export default Groups
