import React, {Component} from 'react';
import '../index.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F7AA14',
        margin: '25px',
        padding: theme.spacing(2,2),
        textAlign: 'center',
        verticalAlign: 'middle',
    },
    flex:{
        display: 'flex',
        alignItems: 'center'
    },
    photoAndChats:{
        width: '20%',
        height: '300px',
    },
    desc:{
        width: '80%',
        padding: '50px 0',
    },
    title:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        padding: '25 px 0'
    },
    img:{
        borderRadius: '50%',
        border: '2px solid #2A82B9',
        width: '100%',
        height: 'auto',
        maxWidth: '256px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
    },
    cardRoot: {
        minWidth: 275,
        minHeight: '200px',
        height: 'auto',
    },
    cardTitle: {
        fontSize: 14,
    },
    backHome:{
        width: '100%',
        minWidth: 'auto',
        textAlign: 'right',
    }
}));

const defaultDesc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
    " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim " +
    "ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea" +
    " commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit" +
    " esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat" +
    " non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const defaultRole = "Student"

class EditableText extends Component{
    state = {
        value: "Some text here",
        isInEditMode: false
    }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    updateComponentValue = () =>{
        this.setState({
            isInEditMode: false,
            value: this.refs.theTextInput.value
        })
    }

    renderEditView = () => {
        return <div>
            <input
                type={"text"}
                defaultValue={this.state.value}
                ref="theTextInput"
            />
            <div>
            <button onClick={this.changeEditMode}>X</button>
            <button onClick={this.updateComponentValue}>OK</button>
        </div></div>
    }

    renderDefaultView = () => {
        return <div className={"dev-sandbox"}>
            {this.state.value}
            <div><button onClick={this.changeEditMode}>EDIT</button>
        </div>
        </div>

    }

    render() {
        return this.state.isInEditMode ? this.renderEditView() :
            this.renderDefaultView()
    }
}


const Test = () => {
    return (
        <div className = 'dev-sandbox'>
            <EditableText/>
        </div>
    );
}

export default Test;