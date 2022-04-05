import React, { useEffect } from 'react'

const WistiaRenderer = (props: any) => {
  console.log(props, 'rpos')

  useEffect(() => {
    const script1 = document.createElement("script");
    const script2 = document.createElement("script");

    script1.src = props.video[0];
    script1.async = true;

    script2.src = props.video[1];
    script2.async = true;
 
    document.body.appendChild(script1);
    document.body.appendChild(script2);
  }, [])

  return (
    <div>
      <div className={`${props.video[2]} videoFoam=true f-mb-1`} />
    </div>
  )
}

export default WistiaRenderer