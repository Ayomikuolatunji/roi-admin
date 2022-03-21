import React from 'react';
import { AllProd,postProds,deleteProduct,updateProd} from '../../hooks/api/reqquest';
import { Button, Form,Dimmer,Loader,Segment,Image,Message,Table, Header
,Modal } from 'semantic-ui-react';
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
    const [open, setOpen] = React.useState(false)
    const [getId,setGetId]=React.useState("")
    const [updateName,setUpdateName]=React.useState(productName)
    const [updateImg,setupdateImg]=React.useState(productImg)
    const [updateType]=React.useState("Export")
    const [updateDesc,setUpdateDesc]=React.useState(productDesc)

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
                        setupdateImg(result.url.split("?")[0])    
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
        setprods(res.data.products.reverse())
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
            setprods(res.data.products.reverse())
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
      const res=await postProds(productName.toUpperCase(),productType.toUpperCase(), productDesc,productImg)
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
       if(del.status===200){
          getProd()
       }
       console.log(del)
   }
   const onUpdate=async(e)=>{
     e.preventDefault()
      if(!updateName || !updateDesc || !updateImg){
        return console.log("please input all value")
      }
      const res=await updateProd(getId,updateName.toUpperCase(),updateType.toUpperCase(), updateDesc,updateImg)
      console.log(res)
      if(res.status===200){
          getProd()
       setSubLoading(false)
       document.getElementById("myForm").reset(); 
      }
      console.log(getId,productName.toUpperCase(),productType.toUpperCase(), productDesc,updateImg)
      setOpen(false)
   }
  return (
    <div className='sm:p-3 py-2 mx-auto w-11/12'>
      {/* modal */}
      <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content >
      <Form error onSubmit={onUpdate} className="shadow-md sm:p-3" id="myForm">
        <Form.Group widths='equal'>
        <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-first-name'
            label='Product type is automatically set'
            placeholder=''
            value={updateType}
            disabled
            className='text-gray-700'
        />
        <Form.Input
            fluid
            id='form-subcomponent-shorthand-input-last-name'
            label='Product Name'
            placeholder='Product name'
            value={updateName}
            onChange={(e)=>setUpdateName(e.target.value)}
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
              value={updateDesc}
              onChange={(e)=>setUpdateDesc(e.target.value)}
              className="w-11/12"
            />
          </div>
        </Form.Group>
        <Button
          content="Update product"
          labelPosition='right'
          icon='checkmark'
          type="submit"
          positive
        />
    </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
       
      </Modal.Actions>
    </Modal>



        {/* post products */}
    <Form error onSubmit={onSubmit} className="shadow-md sm:p-3 w-full" id="myForm">
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
        <div className='w-full mx-auto sm:flex'>
          <div className='sm:w-1/2 mx-auto w-full'>
            {<Form.Input
              type='file'
                  fluid
                  id='form-subcomponent-shorthand-input-first-name'
                  label='Product Image'
                  onChange={(event)=>{
                    onImageChange(event)
                  }}
                  placeholder='First name'
                 className='input-w mx-auto' 
                 accept=".jpg, .jpeg, .png"
             />}
              {productImg  ? <h1 className='text-green-400 font-extrabold text-xl'>Uploaded SuccessFully</h1> :""}
                  {loading ? <Dimmer active inverted>
                    <Loader size='mini'>Uploading img please wait...</Loader>
                  </Dimmer>
            :""}
          </div>
          <div className='sm:w-1/2 w-full'>
            <Form.TextArea
              id='form-subcomponent-shorthand-input-last-name'
              label='Product Description'
              placeholder='Product description'
              value={productDesc}
              onChange={(e)=>setProdDesc(e.target.value)}
              className="input-w"
            />
          </div>
        </div>
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
        <Table.HeaderCell>Update Product</Table.HeaderCell>
        <Table.HeaderCell>Delete Product</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {(err && "") || (prods.length>0 ? prods.map((prod,index)=>{
            const {_id,imgUrl,product_type,product_name, desc}=prod
            if(product_type.toLowerCase()==="EXPORT".toLowerCase()){
              return <Table.Row key={index}>
              <Table.Cell>
                <Header as='h2' textAlign='center'>
                  {index+1}
                </Header>
              </Table.Cell>
              <Table.Cell singleLine>{product_name.toUpperCase()}</Table.Cell>
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
                 <button onClick={()=>{
                   setOpen(true);
                   setGetId(_id, desc,productName,productImg)
                 }}>update</button>
              </Table.Cell>
              <Table.Cell>
                 <button onClick={()=>{deleteProd(_id)}}>Delete</button>
              </Table.Cell>
            </Table.Row>
            }
            return null
        }): <Table.Row className='text-center bg-red-500 w-full'>
              <Message color='red'>No product is added yet...</Message>
        </Table.Row>)}
    </Table.Body>
  </Table>}
    </div>
  )
}
