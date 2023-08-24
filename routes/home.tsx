import React from "react"
import ListItem from '~components/ListItem';
import List from "~components/List";

type Props = {
  data:{
    name:string,
    url: string,
    messages:string[]
  }[]
}

function Home({data}:Props) {

  if(data.length) {
    return (
      <List>
        { data.map((item, index) => (
            <ListItem name={item.name} key={item.name + index} messages={item.messages} url={item.url}/>
          ))
        }
      </List>
    )
  } else {
    return <div>Loading...</div>
  }

}

export default Home
