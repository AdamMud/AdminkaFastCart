// const Dashboard = () => {
//   return <div>Dashboard</div>;
// };

// export default Dashboard;


import img3 from '../../shared/images/div.MuiBox-root.png'
import img1 from '../../shared/images/div.MuiBox-root (2).png'
import img2 from '../../shared/images/iconly-glass-discount.svg fill.png'
import Cart1 from '../../components/cart1'
import { LineChart } from '@mui/x-charts/LineChart';
import Cart2 from '../../components/component';
import img4 from '../../shared/images/div.MuiBox-root (3).png'
import { useState } from 'react';

import img5 from '../../shared/images/Image (21).png'
import img6 from '../../shared/images/Image (22).png'
import img7 from '../../shared/images/Image (23).png'
import img8 from '../../shared/images/Image (24).png'
import img9 from '../../shared/images/Image (25).png'



export default function Dashboard() {

  let [user,setUser]=useState([
    {status:true, name:"Jagarnath S.",date:"24.05.2023",price:"124.97",id:"1"},
    {status:false, name:"Anand G.",date:"23.05.2023",price:"55.42",id:"2"},
    {status:true, name:"Kartik S.",date:"23.05.2023",price:"89.90",id:"3"},
    {status:true, name:"Rakesh S.",date:"22.05.2023",price:"144.94",id:"4"},
    {status:true, name:"Anup S.",date:"22.05.2023",price:"124.97",id:"5"},
    {status:true, name:"Jimmy P.",date:"22.05.2023",price:"124.97",id:"6"},
  ])


  let [product,setProduct]=useState([
    {name:"Men Grey Hoodie",img:{img5},price:"49.90",unit:"204",id:"1"},
    {name:"Men Grey Hoodie",img:{img6},price:"49.90",unit:"204",id:"2"},
    {name:"Men Grey Hoodie",img:{img7},price:"49.90",unit:"204",id:"3"},
    {name:"Men Grey Hoodie",img:{img8},price:"49.90",unit:"204",id:"4"},
    {name:"Men Grey Hoodie",img:{img9},price:"49.90",unit:"204",id:"5"}
  ])


  return (<>


    <section className='flex mt-[60px] justify-between flex-col lg:flex-row'>
      <aside>

        <div className='flex gap-[10px]f flex-wrap gap-[10px] '>
          <Cart1 img={img1} name="Sales" style={{ backgroundColor: "#FEF3F2" }} price="152k" />
          <Cart1 img={img2} name="Sales" style={{ backgroundColor: "#FFFAEB" }} price="152k" />
          <Cart1 img={img3} name="Sales" style={{ backgroundColor: "#F0FDF9" }} price="152k" />
        </div>
        <div className='flex flex-col justify-start items-start  mt-[40px]'>
          <h1 className='ml-[10px]'>Sales Revenue</h1>
          <LineChart xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]} series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5], },]} height={400} />
  
        </div>
      </aside>
      <div className='lg:w-[400px] border flex flex-col justify-between border-[gray] rounded-[10px] lg:h-[526px] p-[20px]'>
        <div className='flex justify-between font-semibold items-center'>
          <h1 className='text-[20px]'>Top selling products</h1>
          <h1>See All {"->"}</h1>
        </div>

        <div className='flex flex-col gap-[20px]'>
          <Cart2 img={img4} name="Healthcare Erbology" des="in Accessories" price="13,153" des2="in sales"/>
          <Cart2 img={img4} name="Healthcare Erbology" des="in Accessories" price="13,153" des2="in sales"/>
          <Cart2 img={img4} name="Healthcare Erbology" des="in Accessories" price="13,153" des2="in sales"/>
          <Cart2 img={img4} name="Healthcare Erbology" des="in Accessories" price="13,153" des2="in sales"/>
          <Cart2 img={img4} name="Healthcare Erbology" des="in Accessories" price="13,153" des2="in sales"/>
          <Cart2 img={img4} name="Healthcare Erbology" des="in Accessories" price="13,153" des2="in sales"/>
        </div>


      </div>
    </section>

  


<section className="flex justify-between flex-col lg:flex-row mt-[50px] gap-[20px]">
  {/* Левая карточка с таблицей */}
  <div className=" shadow-sm border  border-gray-200 rounded-lg p-5 lg:w-[560px]">
    <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
    <table className="w-full text-left">
      <thead>
        <tr className="text-gray-500 text-sm border-b">
          <th className="pb-2">Name</th>
          <th className="pb-2">Date</th>
          <th className="pb-2">Amount</th>
          <th className="pb-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {user.map((e) => (
          <tr key={e.id} className="border-b last:border-0">
            <td className="py-3 font-medium">{e.name}</td>
            <td className="py-3">{e.date}</td>
            <td className="py-3">{e.price}</td>
            <td className="py-3">
              {e.status === true ? (
                <span className="px-3 py-1 rounded-md text-sm font-medium bg-[#C4F8E2] text-[#06A561]">
                  Paid
                </span>
              ) : (
                <span className="px-3 py-1 rounded-md text-sm font-medium bg-[#E6EAF9] text-[#6B7280]">
                  Pending
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Правая пустая карточка */}
   <div className=" shadow-sm border border-gray-200 rounded-lg p-5 lg:w-[560px]">
    <h2 className="text-lg font-semibold mb-4">Top Products by Units Sold </h2>
    <table className="w-full text-left">
      <thead>
        <tr className="text-gray-500 text-sm border-b">
          <th className="pb-2">Name</th>
          <th className="pb-2">Price</th>
          <th className="pb-2">Units</th>
        
        </tr>
      </thead>
      <tbody>
        {product.map((e) => (
          <tr key={e.id} className="border-b last:border-0">
            <td className="py-3 font-medium">
              <img src={e.img} alt="" />
              <h1>{e.name}</h1>
            </td>
            <td className="py-3">{e.price}</td>
            <td className="py-3">{e.unit}</td>
      
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>




  </>)
}



