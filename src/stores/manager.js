import { ref } from "vue";
import { defineStore } from "pinia";

const manager = defineStore("manager", function(){
    const token = ref("");
    function setToken(data){
        token.value = data;
    }
    
    const id = ref("");
    function setId(data){
        id.value = data;
    }

    const name = ref("");
    function setName(data){
        name.value = data;
    }

    const picture = ref("");
    function setpicture(data){
        picture.value = data;
    }

    const isLogedin = ref(false);
    function setLogedin(data){
        isLogedin.value = data;
    }

    return {token, setToken, id, setId, name, setName, picture, setpicture, isLogedin, setLogedin};
},
{
    persist:{
        storage: sessionStorage,
        paths: ["token", "id", "name", "picture", "isLogedin"]
    }
});

export default manager;