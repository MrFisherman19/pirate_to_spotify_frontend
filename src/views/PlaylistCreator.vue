<template>
    <v-container>
        <v-btn @click="authorize">Login to spotify</v-btn>
        <v-layout>
            <v-row justify="center" no-gutters>
            <v-col cols="12" lg="5">              
                <v-card class="ma-2" >
                <v-card-title>Create your playlist!</v-card-title>
                <v-card-subtitle>Choose your options:</v-card-subtitle>
                <v-divider></v-divider>
                    <v-flex>
                        <PlaylistImagePicker></PlaylistImagePicker>
                    </v-flex>
                    <v-flex>
                        <PlaylistDataFields :playlistName.sync="playlistName" :playlistDescription.sync="playlistDescription"></PlaylistDataFields>         
                    </v-flex>
                    <v-flex>
                        <TrackFilesPicker 
                            :shouldShow.sync="listShow" 
                            :listLoadingShow.sync="loadingShow" 
                            v-on:findSpotifyTracksByNames="findTracksInSpotify"></TrackFilesPicker>
                    </v-flex>
                    <FinalDialog :shouldShowDialog="showFinalDialog" :status="finalStatus"></FinalDialog>
                </v-card>
            </v-col>
            <v-col v-show="listShow" cols="12" lg="7">
                <v-flex>
                    <TrackList
                        :isPlaylistNameEmpty="this.playlistName.length == 0"
                        :shouldShowLoadingDialog="loadingShow" 
                        :listLoadingShow.sync="loadingShow" 
                        :list="this.spotifyTracks" 
                        v-on:createPlaylistEvent="createPlaylist"></TrackList>
                </v-flex>
            </v-col>
            </v-row>
        </v-layout>
    </v-container>
</template>
<script>
import PlaylistImagePicker from '../components/PlaylistImagePicker'
import PlaylistDataFields from '../components/PlaylistDataFields'
import TrackFilesPicker from '../components/TrackFilesPicker'
import TrackList from '../components/TrackList'
import FinalDialog from '../components/FinalDialog'
import api from '../Api.js'

export default {
name: 'PlaylistCreator',
components: {
    PlaylistImagePicker,
    PlaylistDataFields,
    TrackFilesPicker,
    TrackList,
    FinalDialog
},
data: function () {
    return {
        listShow:false,
        loadingShow:false,
        showFinalDialog:false,
        userTracks:[],
        spotifyTracks:[],
        playlistName:'',
        playlistDescription:'',
        finalStatus:'',
        isPublic: 'true',
        tokenValue: '',
        actualCode: '',
    }
},
mounted() {
    this.tokenValue = window.localStorage.getItem("spotify_access_token");
    window.localStorage.setItem("spotify_authorization_code", this.$route.query.code);
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        api.getToken(window.localStorage.getItem("spotify_authorization_code"))
        .then(data=>{
            this.tokenValue = data.access_token;
            window.localStorage.setItem("spotify_access_token", this.tokenValue);
        });
    }
},
methods: {
    findTracksInSpotify:function(list){
        this.userTracks = list;
        if (this.userTracks.length > 0) {
            api.findTracksInSpotify(JSON.stringify({ userTracks: this.userTracks }), localStorage.getItem("spotify_access_token")).then(data=>{
                this.spotifyTracks = data;
                console.log("find Tracks")
            })
        } else {
            this.spotifyTracks = [];
        }
    },
    createPlaylist:function(){
        api.createPlaylist(JSON.stringify({playlistName: this.playlistName, description: this.description, isPublic: this.isPublic }), this.tokenValue).then(data=>{
            api.addTracksToPlaylist(data.id, this.spotifyTracks, this.tokenValue).then(data=>{
                this.finalStatus = data;
                this.endCreatingProcess();
            })
        })
    },
    authorize:function() {
        sessionStorage.setItem("reloading","true");
        window.location.href="http://localhost:8080/auth"
    },
    endCreatingProcess:function(){
        this.showDialog();
    },
    showDialog:function() {
        this.showFinalDialog = true;
    },
},
watch: {
    spotifyTracks:function() {
        console.log(this.spotifyTracks)
    }
}
}
</script>
<style scoped>

</style>