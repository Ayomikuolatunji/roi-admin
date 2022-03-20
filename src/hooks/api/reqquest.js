import axios from "axios";

const fetchProd="https://roi-investment.herokuapp.com/api/v2/products/";
const postProd=""

export const AllProd=async()=>{
        try {
          const {data}=await axios(fetchProd)
            return data
        } catch (error) {
           console.log(error)
        }
    
}

export const postProds=async(product_name,product_type,imgUrl,desc)=>{
    try{
      const post=await axios({
          method:"POST",
          headers:{
             "content-type":"application/json" 
          },
          data:JSON.stringify({
              product_name,
              product_type,
              desc,
              imgUrl,
          })
      })
    }catch(err){

    }
}