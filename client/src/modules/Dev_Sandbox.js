import React from 'react';
import '../index.css';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";



const Test = () => {

    return (
        <div>
            <div className={'login-box'}>
                <div style={{height: '8%'}}></div>
                <div>
                    <Typography variant={'h4'}>BRUIN CHAT</Typography>
                    <div style={{paddingTop:20}}><TextField
                        id="outlined-full-width"
                        label="Name"
                        style={{ margin: 8 }}
                        placeholder="Joe"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    /></div>
                    <div><TextField
                        id="outlined-full-width"
                        label="Username"
                        style={{ margin: 8 }}
                        placeholder="Username"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    /></div>
                    <div><TextField
                        id="outlined-full-width"
                        label="Email"
                        style={{ margin: 8 }}
                        placeholder="joe@ucla.edu"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    /></div>
                    <div style={{paddingBottom:15}}><TextField
                         id="outlined-full-width"
                         label="Password"
                         style={{ margin: 8 }}
                         placeholder="************"
                         margin="normal"
                         InputLabelProps={{
                             shrink: true,
                         }}
                         variant="outlined"
                         type={"password"}
                    /></ div>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        backgroundColor: '#daa522',
                        width: '40%',
                        height: '10%',
                        borderRadius: 20
                    }}
                ><h2>SIGN UP</h2></Button>
                <div><Link
                    href={'/login'}
                    style={{
                        backgroundColor:'inherit',
                        color: '#3287BE',
                        paddingTop: 7
                    }}
                >back to login</Link>
                </div>
            </div>
        </div>
    );
}

export default Test;