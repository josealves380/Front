import React from "react";

type props = {
  data_status: string;
  x: string;
}
export default class Grafic extends React.Component {
  
  constructor(props: props ){
    super(props);

    this.state = {squares: Array(100).fill(null) }
    } 
}
