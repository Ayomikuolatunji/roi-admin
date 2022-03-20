import React from 'react';
import { Header, Rating, Table } from 'semantic-ui-react'
import { AllProd,postProds} from '../../hooks/api/reqquest';
import { Button, Form, Message } from 'semantic-ui-react';
import axios from "axios";



export default function Export() {
    const [err,setErr]=React.useState("");
    const [prods,setprods]=React.useState([]);
    const [productType]=React.useState("Export")
    const [productName,setProdName]=React.useState('')
    const [productDesc,setProdDesc]=React.useState('')
    const [productImg,setProdImg]=React.useState('')
    const [loading,setloading]=React.useState(false)
    console.log(productImg)


    const onImageChange =async(event) => {
        setloading(true)
        try{
            if (event.target.files && event.target.files[0]) {
                const fileUpload=event.target.files[0];
                 const response = await axios({
                   method: 'GET',
                   headers:{
                     "Content-Type":"image/jpeg"
                   },
                      url:"https://f13m9bw38h.execute-api.eu-west-3.amazonaws.com/default/ROi-img"
                   })
                       // PUT request: for upload url to S3
                   const result = await fetch(response.data.uploadURL, {
                           method: 'PUT',
                           body:fileUpload
                   })
                    if(result.status===200) {
                        setloading(false)
                        setProdImg(result.url.split("?")[0])
                    }
                   }
            }catch(error){
              console.log(error)
            }

     }
     const getProd=async()=>{
      try {
       const res=await AllProd()
       // console.log(res.data.products)
       setprods(res.data.products)
      } catch (error) {
          console.log("erro")
          setErr(error.message)
      }
  }
    React.useEffect(()=>{
       getProd()
    }, [])
   const onSubmit=(e)=>{
       e.preventDefault()
       if(productName || productDesc || productImg){
         return console.log("please input all value")
       }
       postProds(productName,productType, productDesc,productImg)
   }
  return (
    <div className='p-3'>
        {/* post products */}
    <Form error onSubmit={onSubmit}>
        <Form.Group widths='equal'>
        <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-first-name'
            label='Product type is automatically set'
            placeholder=''
            value={productType}
            disabled
            className='text-gray-700'
        />
        <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-last-name'
            label='Product Name'
            placeholder='Product name'
            value={productName}
        />
        </Form.Group>
        <Form.Group widths='equal'>
        <Form.Input
            type='file'
                fluid
                id='form-subcomponent-shorthand-input-first-name'
                label='Product Image'
                onChange={onImageChange}
                placeholder='First name'
            />
            {productImg ? "Uplaoded successfully" :""}
        <Form.TextArea
            fluid
            id='form-subcomponent-shorthand-input-last-name'
            label='Product Description'
            placeholder='Product description'
            value={productDesc}
        />
        </Form.Group>
        {/* <Message
        error
        header='Action Forbidden'
        content='You can only sign up for an account once with a given e-mail address.'
        /> */}
        <Button type="submit">Submit</Button>
    </Form>
        {/* lists prodducts */}
    <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Index</Table.HeaderCell>
        <Table.HeaderCell singleLine>Product</Table.HeaderCell>
        <Table.HeaderCell>Image</Table.HeaderCell>
        <Table.HeaderCell>Products Type</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {prods?.map((prod,index)=>{
            const {imgUrl,product_type,product_name, desc}=prod
            return <Table.Row key={index}>
            <Table.Cell>
              <Header as='h2' textAlign='center'>
                {index+1}
              </Header>
            </Table.Cell>
            <Table.Cell singleLine>{product_name}</Table.Cell>
            <Table.Cell>
              <img src={imgUrl} alt={product_name} className="w-24 h-24"/>
            </Table.Cell>
            <Table.Cell>
              {product_type}
            </Table.Cell>
            <Table.Cell>
              {desc}
            </Table.Cell>
          </Table.Row>
        })}
    </Table.Body>
  </Table>
    </div>
  )
}
