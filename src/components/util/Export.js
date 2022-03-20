import React from 'react';
import { Header, Rating, Table } from 'semantic-ui-react'
import { AllProd,postProds} from '../../hooks/api/reqquest';
import { Button, Form, Message } from 'semantic-ui-react'

export default function Export() {
    const [err,setErr]=React.useState("");
    const [prods,setprods]=React.useState([]);
    const [productType]=React.useState("Export")
    const [productName,setProdName]=React.useState('')
    const [productDesc,setProdDesc]=React.useState('')
    const [productImg,setProdImg]=React.useState('')

    React.useEffect(()=>{
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
       postProds(productType)
       getProd()
    }, [])
  return (
    <div className='p-3'>
        {/* post products */}
    <Form error>
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
            placeholder='Last name'
            value={productName}
        />
        </Form.Group>
        <Form.Group widths='equal'>
        <Form.Input
           type='file'
            fluid
            id='form-subcomponent-shorthand-input-first-name'
            label='Product Image'
            placeholder='First name'
        />
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
        <Button>Submit</Button>
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
