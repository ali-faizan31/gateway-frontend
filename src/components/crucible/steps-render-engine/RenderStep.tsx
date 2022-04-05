import { FButton, FInputText, FItem } from 'ferrum-design-system';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { jsonTemplate } from './ExampleJson'
import ModalRenderer from './ModalRenderer';
import WistiaRenderer from './WistiaRenderer';

const RenderStep = ({ element }: any) => {
  

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

      case 'p': return (<p className='f-mb-1'>
        {inputElement.content}
      </p>)

      case 'custom-text-field': return <div className='f-mb-1'>
        <p className='custom-font-size-16'> {inputElement.label}</p>
        <FInputText
          placeholder={inputElement.content}
          prefix={<img src="" />}
          postfix={<strong className='primary-color f-pr-1' onClick={() => console.log("max")}> Max </strong>}
        />
        <p className='primary-color custom-font-size-16'> You have ---- available</p>
      </div>

      case 'custom-video-wystia': return <WistiaRenderer video={inputElement.content} />

      case 'custom-modal-approved': return (
        <ModalRenderer content={inputElement.content} style={inputElement.style} type="approved"
          onHide={() => console.log('hi')}
        />)

      case 'custom-modal-confirming': return (
        <ModalRenderer content={inputElement.content} style={inputElement.style} type="confirming"
          onHide={() => console.log('hi')}
        />)

      case 'custom-modal-submitted': return (
        <ModalRenderer content={inputElement.content} style={inputElement.style} type="submitted"
          onHide={() => console.log('hi')}
        />)

      case 'ul': return (<>
        <h4>{inputElement.title}</h4>
        {inputElement.content.length && inputElement.content.map((item: any, index: any) => (
          <FItem key={index}>
            <span className='f-pr--3'><img src={`/ferrum/${inputElement.style}.svg`} /></span>
            {item}
          </FItem>
        ))}
      </>)

      case 'button': return (
        <FButton title={inputElement.content}
          className="w-100 f-mt-2 font-size-22"
          postfix={<img src={`/ferrum/${inputElement.style}.svg`} />}
          onClick={() => console.log('hi')}
        />)


    }
  }

  return (
    <>
      {getElement(element)}
    </>
  )
}

export default RenderStep