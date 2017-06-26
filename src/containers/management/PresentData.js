import React, { Component } from 'react';
export class PresentDataHeader extends Component {
    render(){
      return(
        <div style={styles.body}>
          <div style={styles.bodyOne}>
            <div style={styles.label}>{(this.props.label)?this.props.label:<span>{'\u00A0'}</span>}</div>
          </div>
        </div>
      )
    }
}
export class PresentDataBody extends Component {
    render(){
      return(
        <div style={styles.body}>
          <div style={styles.bodyWidth100}>
            <div style={styles.label}>{(this.props.label)?this.props.label:<span>{'\u00A0'}</span>}</div>
          </div>
          <div style={styles.bodyOne}>
            <div style={styles.label}>{(this.props.value)?this.props.value:<span>{'\u00A0'}</span>}</div>
          </div>
        </div>
      )
    }
}
export class PresentDataHead extends Component {
    constructor(props){
      super(props);
      this.state = {
          styleLeft:(this.props.styleLeft)?this.props.styleLeft:styles.bodyWidth100,
          styleRight:(this.props.styleRight)?this.props.styleRight:styles.bodyOne
      };
    }
    render(){
      return(
        <div style={styles.body}>
          <div style={this.props.styleLeft}>
            <div style={styles.label}>{(this.props.label)?this.props.label:<span>{'\u00A0'}</span>}</div>
          </div>
          <div style={this.props.styleRight}>
            <div style={styles.label}>{(this.props.value)?this.props.value:<span>{'\u00A0'}</span>}</div>
          </div>
        </div>
      )
    }
}
export class PresentData extends Component {
    constructor(props){
      super(props);
      this.state = {
          styleLeft:(this.props.styleLeft)?this.props.styleLeft:styles.bodyWidth100,
          styleRight:(this.props.styleRight)?this.props.styleRight:styles.bodyOne
      };
    }
    render(){
      return(
        <div>
          <div style={styles.body}>
            <div style={this.state.styleLeft}>
              <div style={styles.label}>{this.props.label}</div>
            </div>
            <div style={this.state.styleRight}>
              <div style={styles.value}>{(this.props.value)?this.props.value:<span>{'\u00A0'}</span>}</div>
            </div>
          </div>
          {
            (this.props.optional)?
            <div style={styles.body}><div style={styles.label}>{this.props.optional}</div></div>:
            ''
          }
        </div>
      )
    }
}
export class PresentDataForm extends Component {
    constructor(props){
      super(props);
      this.state = {
          styleLeft:(this.props.styleLeft)?this.props.styleLeft:styles.bodyWidth100,
          styleRight:(this.props.styleRight)?this.props.styleRight:styles.bodyOne
      };
    }
    render(){
      return(
        <div>
          <div style={styles.body}>
            <div style={this.state.styleLeft}>
              <div style={styles.label}>{this.props.label}</div>
            </div>
            <div style={this.state.styleRight}>
              <div style={styles.valueForm}>{(this.props.value)?this.props.value:<span>{'\u00A0'}</span>}</div>
            </div>
          </div>
          {
            (this.props.optional)?
            <div style={styles.body}><div style={styles.label}>{this.props.optional}</div></div>:
            ''
          }
        </div>
      )
    }
}
export class PresentDataS extends Component {
    render(){
      return(
        <div>
          <div style={styles.bodyS}>
            <div style={{width:65}}>
              <div style={styles.labelS}>{this.props.label}</div>
            </div>
            <div style={styles.bodyOne}>
              <div style={styles.valueS}>{(this.props.value)?this.props.value:<span>{'\u00A0'}</span>}</div>
            </div>
          </div>
          {
            (this.props.optional)?
            <div style={styles.bodyS}><div style={styles.label}>{this.props.optional}</div></div>:
            ''
          }
        </div>
      )
    }
}
export class PresentDataSF extends Component {
    render(){
      return(
        <div>
          <div style={styles.bodyS}>
            <div style={{width:65}}>
              <div style={styles.labelS}>{this.props.label}</div>
            </div>
            <div style={styles.bodyOne}>
              <div style={styles.valueSF}>{(this.props.value)?this.props.value:<span>{'\u00A0'}</span>}</div>
            </div>
          </div>
          {
            (this.props.optional)?
            <div style={styles.bodyS}><div style={styles.label}>{this.props.optional}</div></div>:
            ''
          }
        </div>
      )
    }
}
var styles = {
  header: {
    display:'flex',
    // padding:'10px 0px'
  },
  headerLeft: {
    flex:1,
    display:'flex'
  },
  headerRight: {
    flex:1,
    display:'flex'
  },
  body: {
    display:'flex',
    // padding:'10px 0px'
  },
  bodyS: {
    display:'flex',
    fontSize:'10px'
  },
  bodyTwo:{
    flex:2
  },
  bodyThree: {
    flex:3
  },
  bodyOne: {
    flex:1
  },
  bodyWidth100Right: {
    width:120,
    textAlign:'right'
  },
  bodyWidth100: {
    width:100,
    textAlign:'left',
  },
  label:{
    padding:10, backgroundColor:'rgb(236, 240, 241)', color:'#000000',width:'100%',borderBottom:'1px solid #fcfcfc', height:'100%',
    boxSizing: 'border-box'
  },
  value:{
    padding:10, backgroundColor:'#00bcd4', color:'#ffffff',flex:1, marginRight:0,borderBottom:'1px solid #fcfcfc',height:'100%',
    boxSizing: 'border-box'
  },
  valueForm:{
    padding:10, backgroundColor:'rgb(236, 240, 241)', color:'#222222',flex:1, marginRight:0,borderBottom:'1px solid #fcfcfc',height:'100%',
    boxSizing: 'border-box'
  },
  labelS:{
    padding:4, backgroundColor:'rgb(236, 240, 241)', color:'#000000',width:'100%',borderBottom:'1px solid #fcfcfc', height:'100%'
  },
  valueS:{
    padding:4, backgroundColor:'#00bcd4', color:'#ffffff',flex:1, marginRight:0,borderBottom:'1px solid #fcfcfc',height:'100%'
  },
  valueSF:{
    padding:4, backgroundColor:'rgb(236, 240, 241)', color:'#ffffff',flex:1, marginRight:0,borderBottom:'1px solid #fcfcfc',height:'100%'
  },
  taskSubject: {
    padding:12, backgroundColor:'rgb(236, 240, 241)', color:'#000000',borderBottom:'1px solid #fcfcfc', marginRight:1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height:40
  },
  taskHeader: {
    padding:12, backgroundColor:'#00bcd4', color:'#ffffff',borderBottom:'1px solid #fcfcfc', marginRight:1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height:40
  },
  taskFooter: {
    padding:12, backgroundColor:'#00bcd4', color:'#ffffff',borderBottom:'1px solid #fcfcfc',
    // marginRight:1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    height:40
  },
  btnStyle: {
    backgroundColor:'rgb(52, 152, 219)',
    padding:10,
    color:'#ffffff',
    cursor:'pointer',
    userSelect: 'none'
  },
  btnStyleCancel: {
    backgroundColor:'rgb(243, 156, 18)',
    marginLeft:5,
    padding:10,
    color:'#ffffff',
    cursor:'pointer',
    userSelect: 'none'
  }
}
