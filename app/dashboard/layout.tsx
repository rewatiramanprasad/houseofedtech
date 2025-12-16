import Header from '@/components/header'
import { getCurrentUser } from './AuthAction'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  return (
    
      <div>
        <Header  user={user}/>
        {children}
      </div>

  )
}
