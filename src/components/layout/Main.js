import React from 'react';
import { AllProd} from '../../hooks/api/reqquest';
import {AiOutlineShopping} from "react-icons/ai"

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
        <svg
          class="w-10 h-10 md:w-20 md:h-20 lg:w-36 lg:h-36 text-gray-600 "
           fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
             <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"></path></svg>
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
        <svg
          class="w-10 h-10 md:w-20 md:h-20 lg:w-36 lg:h-36 text-gray-600 "
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
          ></path>
        </svg>
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
        <svg
          class="w-10 h-10 md:w-20 md:h-20 lg:w-36 lg:h-36 text-gray-600 "
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
