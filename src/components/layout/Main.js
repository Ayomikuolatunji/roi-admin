import React from 'react';
import { AllProd} from '../../hooks/api/reqquest';
import {AiOutlineShopping} from "react-icons/ai"
import { Pie } from 'react-chartjs-2';
import {data} from "../../hooks/PIE.jsx"

export default function Main() {
  const [prods,setprods]=React.useState([]);
  const [prodLoading,setProloading]=React.useState(true);
  let abort=React.useRef(true)
  React.useEffect(()=>{
    if(abort.current){
      const getProd=async()=>{
        setProloading(true)
        try {
          const res=await AllProd()
          // console.log(res.data.products)
          setprods(res.data.products.reverse())
          prodLoading(false);
        } catch (error) {
            
            setProloading(false)
        }
      }
      getProd()
    }
    return()=>{
      abort.current=false
    }
  },[prodLoading])
  const newProd=(prods,prod)=>{
    const arr=[]
    prods.map(pro=>{
      if(pro.product_type===prod){
          return arr.push(pro)
      }else{
        return []
      }
    })

    return arr;
}
  return (
    <div className='sm:p-3 py-2 mx-auto w-11/12'>
      <div className="pie">
        <Pie  data={data}/>
      </div>
<div class="grid  lg:grid-cols-2 gap-5 w-full p-4 grid-cols-1">
  <div class="bg-green-200 py-2 rounded-md ">
    <div class="flex">
      <div>
      <h2 class="text-base md:text-2xl lg:text-5xl px-2 whitespace-no-wrap text-gray-600">TOTAL EXPORTS PODUCTS</h2>
      <h2 class="ltext-base md:text-2xl lg:text-5xl px-4 py-2 lg:px-8 text-gray-600">{newProd(prods,"EXPORT").length}</h2>
      </div>
      <div class="flex justify-center items-center">
       <AiOutlineShopping className=' text-7xl'/>
      </div>
    </div>
  </div>
  <div class="bg-yellow-200 py-2 rounded-md ">
    <div class="flex">
      <div>
      <h2 class="text-base md:text-2xl lg:text-5xl px-2 whitespace-no-wrap text-gray-600">TOTAL LOCAL PRODUCTS</h2>
      <h2 class="ltext-base md:text-2xl lg:text-5xl px-4 py-2 lg:px-8 text-gray-600">{newProd(prods,"LOCAL").length}</h2>
      </div>
      <div class="flex justify-center items-center">
      <AiOutlineShopping className=' text-7xl'/>
      </div>
    </div>
  </div>
  <div class="bg-red-200 py-2 rounded-md ">
    <div class="flex">
      <div>
      <h2 class="text-base md:text-2xl lg:text-5xl px-2 whitespace-no-wrap text-gray-600">TOTAL REAL ESTATE PRODUCTS</h2>
      <h2 class="ltext-base md:text-2xl lg:text-5xl px-4 py-2 lg:px-8 text-gray-600">{newProd(prods,"ESTATE").length}</h2>
      </div>
      <div class="flex justify-center items-center">
      <AiOutlineShopping className=' text-7xl'/>
      </div>
    </div>
  </div>
  <div class="bg-blue-200 py-2 rounded-md ">
    <div class="flex">
      <div>
      <h2 class="text-base md:text-2xl lg:text-5xl px-2 whitespace-no-wrap text-gray-600">TOTAL MINERAL RESOURCES PRODUCTS</h2>
      <h2 class="ltext-base md:text-2xl lg:text-5xl px-4 py-2 lg:px-8 text-gray-600">{newProd(prods,"MINERAL").length}</h2>
      </div>
      <div class="flex justify-center items-center">
         <AiOutlineShopping className=' text-7xl'/>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
