import { Access } from 'payload/config'

export const allowUserAdmin: Access = ({ req: { user } }) => {
  
  if(user?.roles?.includes('admin'))
    return true;
  
    return {
      
    }
}