// import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from '../components/VideoPlayer';
import Sidebar from '../components/Sidebar';
import Notifications from '../components/Notifications';
import { SocketContext } from '../Context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import './Register.css'
import Navbar from '../components/Navbar';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        // border: '2px solid black',

        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
    image: {
        marginLeft: '15px',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingTop: '50px',
    },
}));


function Video() {

    const [users, setUsers] = useState([])

    const { callUser } = useContext(SocketContext);
    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const res = await axios.get('http://localhost:5000/api/auth/');
                setUsers(res.data);
                console.log(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers()
    }, [])

    const callUserFunc = async (id) => {
        // fetch users current tokenId
        try {
            const res = await axios.get('http://localhost:5000/api/token/' + id);
            callUser(res.data.tokenId);
            console.log(res.data.tokenId)
        } catch (error) {
            console.log(error);
        }
        // then use the call fucntion from contest 


    }


    const classes = useStyles();
    return (
        <div>
            <Navbar />
            <div className={classes.wrapper}>
                {/* <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography variant="h2" align="center">Video Chat</Typography>
            </AppBar> */}
                <VideoPlayer />
                <Sidebar>
                    <Notifications />
                </Sidebar>
                <div className='callusers'>
                    <h2>Users</h2>
                    {users.map((val, ind) => {

                        return <button key={ind} className="call_btn" onClick={() => callUserFunc(val._id)}>{val.username}</button>
                    }
                    )}
                </div>
            </div>
        </div>
    )
}
export default Video;