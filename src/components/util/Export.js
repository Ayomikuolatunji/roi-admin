import React from 'react';
import { Header,Table } from 'semantic-ui-react'
import { AllProd,postProds,deleteProduct} from '../../hooks/api/reqquest';
import { Button, Form,Dimmer,Loader,Segment,Image} from 'semantic-ui-react';
import axios from "axios";



export default function Export() {
    const [err,setErr]=React.useState(false);
    const [prods,setprods]=React.useState([]);
    const [productType]=React.useState("Export")
    const [productName,setProdName]=React.useState('')
    const [productDesc,setProdDesc]=React.useState('')
    const [productImg,setProdImg]=React.useState('')
    const [loading,setloading]=React.useState(false)
    const [prodLoading,setProloading]=React.useState(true)
    const [subLoading,setSubLoading]=React.useState(false)

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
                   console.log(response)
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
      setProloading(true)
      try {
        const res=await AllProd()
        // console.log(res.data.products)
        setprods(res.data.products)
        prodLoading(false);
      } catch (error) {
          setErr(error.message)
          setProloading(false)
      }
    }
    let abort=React.useRef(true)
    React.useEffect(()=>{
      if(abort.current){
        const getProd=async()=>{
          setProloading(true)
          try {
            const res=await AllProd()
            // console.log(res.data.products)
            setprods(res.data.products)
            prodLoading(false);
          } catch (error) {
              setErr(error.message)
              setProloading(false)
          }
        }
        getProd()
      }
      return()=>{
        abort.current=false
      }
    },[prodLoading])
    // submit 
   const onSubmit=async(e)=>{
       e.preventDefault()
       if(!productName || !productDesc ){
         return console.log("please input all value")
       }
      const res=await postProds(productName,productType, productDesc,productImg)
       console.log(res)
       if(res.status===201){
        getProd()
        setProdDesc("")
        setProdName("")
        setloading(false)
        setProdImg("")
        setSubLoading(false)
        document.getElementById("myForm").reset(); 
       }
   }
   const deleteProd=async(rm)=>{
       const del=await deleteProduct(rm)
       console.log(del)
   }
  return (
    <div className='p-3 mx-auto w-10/12'>
        {/* post products */}
    <Form error onSubmit={onSubmit} className="shadow-md sm:p-3" id="myForm">
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
            onChange={(e)=>setProdName(e.target.value)}
        />
        </Form.Group>
        <Form.Group className='w-100'>
          <div className='w-1/2'>
            {<Form.Input
              type='file'
                  fluid
                  id='form-subcomponent-shorthand-input-first-name'
                  label='Product Image'
                  onChange={(event)=>{
                    onImageChange(event)
                  }}
                  placeholder='First name'
                 className='w-11/12' 
                 accept=".jpg, .jpeg, .png"
             />}
              {productImg  ? <h1 className='text-green-400 font-extrabold text-xl'>Uploaded SuccessFully</h1> :""}
                  {loading ? <Dimmer active inverted>
                    <Loader size='mini'>Uploading img please wait...</Loader>
                  </Dimmer>
            :""}
          </div>
          <div className='w-1/2'>
            <Form.TextArea
              id='form-subcomponent-shorthand-input-last-name'
              label='Product Description'
              placeholder='Product description'
              value={productDesc}
              onChange={(e)=>setProdDesc(e.target.value)}
              className="w-11/12"
            />
          </div>
        </Form.Group>
       {/* {err ? <Message
        error
        content='You can only sign up for an account once with a given e-mail address.'
        /> : ""} */}
        <Button type="submit">{subLoading?"Request sent...": "Submit"}</Button>
    </Form>
        {/* lists prodducts */}
   {prodLoading ?  <Segment>
      <Dimmer active>
        <Loader size='big'>Loading all exports products</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>: <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Index</Table.HeaderCell>
        <Table.HeaderCell singleLine>Product</Table.HeaderCell>
        <Table.HeaderCell>Image</Table.HeaderCell>
        <Table.HeaderCell>Products Type</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell>Delete Product</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {(err && "") || (prods?.map((prod,index)=>{
            const {id,imgUrl,product_type,product_name, desc}=prod
            if(product_type==="Export"){
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
              <Table.Cell>
                 <button onClick={()=>{deleteProd(id)}}>Delete</button>
              </Table.Cell>
            </Table.Row>
            }
            return null
        }))}
    </Table.Body>
  </Table>}
    </div>
  )
}
