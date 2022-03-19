import React from 'react';
import { Header, Rating, Table } from 'semantic-ui-react'
import { AllProd } from '../../hooks/api/reqquest';

export default function Export() {

    React.useEffect(()=>{
       const getProd=async()=>{
           try {
            const res=await AllProd()
            console.log(res)
           } catch (error) {
               console.log("erro")
           }
       }
       getProd()
    }, [])
  return (
    <div className='p-3'>
            <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell singleLine>Evidence Rating</Table.HeaderCell>
        <Table.HeaderCell>Effect</Table.HeaderCell>
        <Table.HeaderCell>Efficacy</Table.HeaderCell>
        <Table.HeaderCell>Consensus</Table.HeaderCell>
        <Table.HeaderCell>Comments</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
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
          <a href='#'>18 studies</a>
        </Table.Cell>
        <Table.Cell>
          Creatine supplementation is the reference compound for increasing
          muscular creatine levels; there is variability in this increase,
          however, with some nonresponders.
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
    </div>
  )
}
