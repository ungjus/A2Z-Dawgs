import React from "react"
import Image from 'next/image'

import ReactMarkdown from "react-markdown"

const Rules = (): JSX.Element => {

    const content = `
We set some ground rules when we started doing challenge.

1. The first letter of the resturant must start with the Letter you are completing.
    - For example, The Cheesecake Factory would could as T not C.
2. Must go in order.
    - For example, after doing C, you have to go to D and cant skip to F.
3. Only dinner applies. 
    - Getting lunch, drinks, and dessert might make this challenge finish too quickly.
4. Take pictures of the food!
    - We wanna see what you ate :D

Try for yourself!

<p align="center"> ![Ramen Bear](ramen.png) </p>

`

    return (
        <div className="flex flex-col justify-center text-left m-auto pt-2">
            <h2 className="font-bold text-5xl pt-8 m-auto mb-5">A-Z Rules</h2>
            <article className="prose lg:prose-md m-auto text-wrap">
                <ReactMarkdown children={content} className="m-auto"/>
            </article>
            <Image
                src="/ramen.png"
                width={300}
                height={300}
                alt="Ramen bear"
                className="m-auto"
                />
        </div>

    )
  }
  
  export default Rules