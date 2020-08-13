import axios from 'axios';

const SERVER_URL = 'http://localtospotifyapp-env.eba-pthqhy3j.eu-central-1.elasticbeanstalk.com'

const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000,
});

export default{
    findTracksInSpotify:(jsonObject, tokenValue)=>instance.post('/findTracks', jsonObject , {headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
    }}).then(response=>{
        return response.data;
    }),
    createPlaylist:(jsonObject, tokenValue)=>instance.post('/createPlaylist', jsonObject, {headers: {
        'Content-Type':'application/json',
        'Authorization': tokenValue
    }}).then(response=>{
        return response.data;
    }),
    addTracksToPlaylist:(playlistId, jsonObject, tokenValue)=>instance.post('/addTracksToPlaylist?playlistId='+playlistId, jsonObject, {headers: {
        'Content-Type':'application/json',
        'Authorization': tokenValue
    }}).then(response=>{
        return response.status;
    }),
    setPlaylistImage:(playlistId, jsonObject, tokenValue)=>instance.put('/setPlaylistImage?playlistId='+playlistId, jsonObject, {headers: {
        'Content-Type':'application/json',
        'Authorization': tokenValue
    }}).then(response=>{
        return response.status;
    }),
    //<------------------Authorization-------------------->
    getAuthCode:()=>instance.get('/auth')
        .then(response=>{return response.data
    }),
    getToken:(codeValue)=>instance.post('/token?codeValue='+codeValue, {headers:{'Content-Type':'application/json'
    }}).then(response=>{
        return response.data;
    })
}