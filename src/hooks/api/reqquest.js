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

export const postProds=async(product_type)=>{
    try{
      const post=  axios.post('https://roi-investment.herokuapp.com/api/v2/products/', {
        product_name:"ayojj",
        product_type:product_type,
        desc:"gxjgxjkqw",
        imgUrl:"vjhdv1hm"
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