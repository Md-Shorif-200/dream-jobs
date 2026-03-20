import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/features/auth/Server/auth.queries";



const page = async () => {

    const user =  await getCurrentUser();

     console.log(user)
  return (
    <div>
         <Button>Click me</Button>
          <h1>{user?.name} </h1>
    </div>
  )
}

export default page