<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="auto">
                <v-avatar size="150">
                    <v-img :src="defaultImageUrl"></v-img>
                </v-avatar>   
                <v-btn class="ma-1" fab small @click="chooseImage"><v-icon>mdi-brush</v-icon></v-btn>
            </v-col>
        </v-row>
        <template>
            <v-dialog v-model="showDialog" width="400">
                <v-card>
                    <v-card-title>Choose image</v-card-title>
                    <v-card-subtitle>Image must be in JPEG format and up to 250KB</v-card-subtitle>
                    <v-row no-gutters>
                        <v-col>
                            <v-card tile outlined class="ma-1 mr-0">
                            <v-card-text class="text-center text-h6">Internet</v-card-text>
                            <div class="imageContainer">
                                <v-img width="125" src="../assets/internet.png"></v-img>
                            </div>
                            <v-card-actions class="justify-center">
                                <v-text-field :rules="[rules.fileFormat]" label="Image url" placeholder="https://imagesite/image.jpeg" v-model="userImageUrl" v-on:change="setImageFromUrl" color="#23D061" class="pb-1"></v-text-field>
                            </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-dialog>
        </template>
    </v-container>
</template>
<script>
export default {
    name: 'PlaylistImagePicker',
    props:['defaultImage'],
    data() {
        return {
            showDialog: false,
            internetSource: false,
            fileFromComputer: [],
            defaultImageUrl: this.defaultImage,
            userImageUrl:'',
            rules: {
                fileFormat: value => {
                const pattern = /\.(jpeg|jpg)$/
                return pattern.test(value) || 'Image have to be in JPEG format!'
            },
        },
        }
    },
    methods: {
        chooseImage:function() {
            this.showDialog = true;
        },
        setImageFromLocal:function() {
            if (this.checkImageSize(this.fileFromComputer)) {
                this.showDialog = false;
                this.$emit('update:playlistImage', this.userImageUrl);
            }
        },
        setImageFromUrl:function() {
            let image = new Image();
            image.src = this.userImageUrl;
            if (this.rules.fileFormat === true) {
                this.defaultImageUrl = this.userImageUrl;
                this.$emit('update:playlistImage', this.userImageUrl);
                this.showDialog = false;
            }
        },
        checkImageSize:function(image) {
            return image.size < 250000;
        }
    }
}
</script>
<style scoped>
    .imageContainer {
        width:125px;
        margin: 0 auto;
    }
</style>