import axios from "axios";

const fetchProd="https://roi-investment.herokuapp.com/api/v2/products/";
const postProd="https://roi-investment.herokuapp.com/api/v2/products/";


export const AllProd=async()=>{
        try {
          const {data}=await axios(fetchProd)
            return data
        } catch (error) {
           console.log(error)
        }
    
}

export const postProds=async(product_name,product_type,desc,imgUrl)=>{
    try{
      const post=await axios.post(postProd, {
        product_name:product_name,
        product_type:product_type,
        desc:desc,
        imgUrl:imgUrl
      })
      .catch(function (error) {
        console.log(error);
      });
      return post
    }catch(err){

    }
}

export const deleteProduct=async(rm)=>{
  const delApi=`https://roi-investment.herokuapp.com/api/v2/products/${rm}`
    try{
       const del=await axios.delete(delApi)
      console.log(del)
       return del
    }catch(err){
       console.log(err)
    }
}