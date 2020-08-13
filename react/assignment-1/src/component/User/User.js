import React, {component, Component} from 'react'
import withRedBull from '../hoc/withredbull';
import './User.css';


class User extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h2>{ this.props.name } {this.props.wings}</h2>
                <button class='btn' onClick={this.props.flyaway}>Fly</button>
                
            </div>
        );
    }

}

export default withRedBull(User)