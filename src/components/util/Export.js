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
            return   <Table.Row key={index}>
            <Table.Cell>
              <Header as='h2' textAlign='center'>
                A
              </Header>
            </Table.Cell>
            <Table.Cell singleLine>Power Output</Table.Cell>
            <Table.Cell>
              <Rating icon='star' defaultRating={3} maxRating={3} />
            </Table.Cell>
            <Table.Cell textAlign='right'>
              80% <br />
              <p >18 studies</p>
            </Table.Cell>
            <Table.Cell>
              Creatine supplementation is the reference compound for increasing
              muscular creatine levels; there is variability in this increase,
              however, with some nonresponders.
            </Table.Cell>
          </Table.Row>
        }) && err}
    </Table.Body>
  </Table>
    </div>
  )
}
