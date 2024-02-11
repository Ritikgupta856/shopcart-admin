
import Heading from '../Heading'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Dashboard = () => {
  return (
    <div className='py-8 px-10'>
      <Heading title="Dashboard" description="Manage Products"/>

      <Card>
  <CardHeader>
    <CardTitle>Total Products</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>

      
    </div>
  )
}

export default Dashboard
