import { FButton, FItem } from 'ferrum-design-system';
import React, { useEffect } from 'react'
import { jsonTemplate } from './ExampleJson'

const RenderStep = (props: any) => {  

  const getElement = (inputElement: any) => { 
    switch (inputElement.type) {
      case 'h1': return (<h1 className='f-mb-1 primary-color'>
        {inputElement.content}
      </h1>)

      case 'h2': return (<h2 className='f-mb-1 primary-color'> 
        {inputElement.content}
      </h2>)

      case 'h3': return (<h3 className='f-mb-1'>
        {inputElement.content}
      </h3>)

      case 'h4': return (<h4 className='f-mb-1'>
        {inputElement.content}
      </h4>)

      case 'h5': return (<h5 className='f-mb-1'>
        {inputElement.content}
      </h5>)

      case 'h6': return (<h6 className='f-mb-1'>
        {inputElement.content}
      </h6>)

      case 'list': return (<>
        <h4>{inputElement.title}</h4>
        {inputElement.items.length && inputElement.items.map((item: any, index: any) => (
          <FItem key={index}>
            <span className='f-pr--3'><img src="/ferrum/check.svg" /></span>
            {item}
          </FItem>
        ))}
      </>)

      case 'submit': return (
        <FButton title={inputElement.content}
          className="w-100 f-mt-2 font-size-22"
          postfix={<img src="/ferrum/Get_Started.svg" />}
          onClick={() => console.log('hi')}
        />)
    }
  }

  return (
    <>
      {getElement(props.element)}
    </>
  )
}

export default RenderStep