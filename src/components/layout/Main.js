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
        <div className="grid  lg:grid-cols-2 gap-5 w-full p-4 grid-cols-1">
          <div className="bg-red-100 py-2 rounded-md ">
            <div className="flex">
              <div>
              <h2 className="text-base md:text-2xl lg:text-5xl px-2 whitespace-no-wrap text-gray-600">TOTAL EXPORTS PODUCTS</h2>
              <h2 className="ltext-base md:text-2xl lg:text-5xl px-4 py-2 lg:px-8 text-gray-600">{newProd(prods,"EXPORT").length}</h2>
              </div>
              <div className="flex justify-center items-center">
              <AiOutlineShopping className=' text-7xl'/>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 py-2 rounded-md ">
            <div className="flex">
              <div>
              <h2 className="text-base md:text-2xl lg:text-5xl px-2 whitespace-no-wrap text-gray-600">TOTAL LOCAL PRODUCTS</h2>
              <h2 className="ltext-base md:text-2xl lg:text-5xl px-4 py-2 lg:px-8 text-gray-600">{newProd(prods,"LOCAL").length}</h2>
              </div>
              <div className="flex justify-center items-center">
              <AiOutlineShopping className=' text-7xl'/>
              </div>
            </div>
          </div>
          <div className="bg-yellow-100 py-2 rounded-md ">
            <div className="flex">
              <div>
              <h2 className="text-base md:text-2xl lg:text-5xl px-2 whitespace-no-wrap text-gray-600">TOTAL REAL ESTATE PRODUCTS</h2>
              <h2 className="ltext-base md:text-2xl lg:text-5xl px-4 py-2 lg:px-8 text-gray-600">{newProd(prods,"ESTATE").length}</h2>
              </div>
              <div className="flex justify-center items-center">
              <AiOutlineShopping className=' text-7xl'/>
              </div>
            </div>
          </div>
          <div className="bg-green-100 py-2 rounded-md ">
            <div className="flex">
              <div>
              <h2 className="text-base md:text-2xl lg:text-5xl px-2 whitespace-no-wrap text-gray-600">TOTAL MINERAL RESOURCES PRODUCTS</h2>
              <h2 className="ltext-base md:text-2xl lg:text-5xl px-4 py-2 lg:px-8 text-gray-600">{newProd(prods,"MINERAL").length}</h2>
              </div>
              <div className="flex justify-center items-center">
                <AiOutlineShopping className=' text-7xl'/>
              </div>
            </div>
          </div>
        </div>
        <div className="pie sm:w-1/2 mx-auto mt-12">
          <h1 className='text-center text-yellow-500 font-extrabold text-4xl'>Product Pie Chats</h1>
        <Pie  data={data(newProd(prods,"EXPORT").length, newProd(prods,"LOCAL").length,newProd(prods,"ESTATE").length,newProd(prods,"MINERAL").length,newProd(prods,"LOCAL").length)}/>
      </div>
    </div>
  )
}
