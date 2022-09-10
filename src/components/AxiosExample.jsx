import { useEffect } from "react"
import { useState } from "react"
import { getRandomUser } from "../services/axiosService"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {Stack,Button, Divider, Box, Typography } from '@mui/material';

const AxiosExample = () => { //https://api.chucknorris.io/jokes/random

    const [joke, setJoke] = useState(null);
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [totalLikes, setTotalLikes] = useState(0);
    const [totalDislikes, setTotalDislikes] = useState(0);

    useEffect(() => {
        obtainJoke();
    }, []);


    const obtainJoke = () => {
        getRandomUser()
            .then((response) => {
                if(response.status === 200){
                    setJoke(response.data.value)
                }
            })
            .catch((error) => {
                alert(`Somethin went wrong: ${error}`);
            })
    }

    const clickLike = () => {
        setLike(1)
        setDislike(0)
        like < 1 && setTotalLikes((prev)=> prev+1)
        dislike > 0 && setTotalDislikes((prev)=> prev-1)
    }

    const clickDislike = () => {
        setDislike(1)
        setLike(0)
        dislike < 1 && setTotalDislikes((prev)=> prev+1)
        like > 0 && setTotalLikes((prev)=> prev-1)
    }
    const clickNewJoke = () => {
        
        obtainJoke()
        setLike(0)
        setDislike(0)
    }

    return (
        <div>
            <Box sx={{ my: 3, mx: 1 }}>
                <h2>Chiste Random de Chuck Norris</h2>
                <Typography color="primary">{joke}</Typography>               
            </Box>
            <Stack sx={{ my: 2, mx: 2 }} spacing={2} direction="row"  >
            <Button onClick={clickLike} color="success" startIcon={<ThumbUpIcon />}>{like}</Button>
            <Button onClick={clickDislike} color="error" startIcon={<ThumbDownIcon />}>{dislike}</Button>
            <Button onClick={clickNewJoke} variant="contained" color="secondary">New Joke</Button>
            </Stack>
            <Divider sx={{ my: 3, mx: 1, width:"340px" }} />
            <Stack sx={{ my: 5, mx: 2 }} spacing={2} direction="row" >
                <Button variant="contained" color="success">Total Likes: {totalLikes}</Button>
                <Button variant="contained" color="error">Total Dislikes: {totalDislikes}</Button>
            </Stack>
        </div>

    )
}

export default AxiosExample