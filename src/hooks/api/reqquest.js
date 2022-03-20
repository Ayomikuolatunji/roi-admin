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