import React from 'react';
import { Header, Rating, Table } from 'semantic-ui-react'
import { AllProd } from '../../hooks/api/reqquest';

export default function Export() {
    const [err,setErr]=React.useState("")
    const [prods,setprods]=React.useState([])

    React.useEffect(()=>{
       const getProd=async()=>{
           try {
            const res=await AllProd()
            console.log(res.data.products)
            setprods(res.data.products)
           } catch (error) {
               console.log("erro")
               setErr(error.message)
           }
       }
       getProd()
    }, [])
  return (
    <div className='p-3'>

        {/* post products */}
        {/* prodducts */}
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
              <img src={imgUrl} alt={product_name} />
            </Table.Cell>
            <Table.Cell textAlign='right'>
              80% <br />
              <p >18 studies</p>
            </Table.Cell>
            <Table.Cell>
              {desc}
            </Table.Cell>
          </Table.Row>
        }) && err}
    </Table.Body>
  </Table>
    </div>
  )
}
