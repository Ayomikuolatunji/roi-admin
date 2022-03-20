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
      const post=  axios.post(postProd, {
        product_name:product_name,
        product_type:product_type,
        desc:desc,
        imgUrl:imgUrl
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(post)
      return post
    }catch(err){

    }
}