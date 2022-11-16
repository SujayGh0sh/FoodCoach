import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from '../components/VideoPlayer';
import Sidebar from '../components/Sidebar';
import Notifications from '../components/Notifications';
import { ContextProvider } from '../Context';
import { useEffect, useState } from 'react';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',

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
    },
}));


function Video() {

    const [users, setUsers] = useState([])

    const [call, setcall] = useState("")

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

    const callUser = async (id) => {
        // fetch users current tokenId
        try {
            const res = await axios.get('http://localhost:5000/api/token/' + id);
            setcall(res.data.tokenId);
            console.log(res.data.tokenId)
        } catch (error) {
            console.log(error);
        }
        // then use the call fucntion from contest 


    }


    const classes = useStyles();
    return (
        <ContextProvider>
            <div className={classes.wrapper}>
                <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography variant="h2" align="center">Video Chat</Typography>
                </AppBar>
                <VideoPlayer />
                <Sidebar>
                    <Notifications />
                </Sidebar>
                <div>
                    {users.map((val, ind) => {

                        return <button onClick={() => callUser(val._id)}>{val.username}</button>
                    }
                    )}
                </div>
            </div>
        </ContextProvider>)
}
export default Video;