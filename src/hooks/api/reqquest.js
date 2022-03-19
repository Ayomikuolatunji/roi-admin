import axios from "axios";

const fetchProd="https://roi-investment.herokuapp.com/api/v2/products/";

export const AllProd=async()=>{
        try {
          const res=await axios(fetchProd)
            console.log(res)
            return res
        } catch (error) {
           console.log(error)
        }
    
}