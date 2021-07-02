import login from "./login.js";
import getplaylists from "./getplaylists.js";
import getuserid from "./getuserid.js";
import getfeaturedplaylists from "./getfeaturedplaylists.js";
import search from "./search.js";

let access_token="";
let query=[...window.location.href];
if(query[44]=='#')
{
    query[44]='?';
    query=query.join('');
    location.replace(query);
}
query=window.location.search;
console.log(query);
if(query.length>0)
{
    const params=new URLSearchParams(query);
    access_token=(params.has('access_token'))?params.get('access_token'):"";
}
const client_id="47f71a1149fb4bff8d697e6618b5f041";
const client_secret="05fc90a155764a549f45131e8c05db1f";
const grant_type="authorization_code";
let user_id="";

if(access_token.length>0)
{
    setTimeout(()=>{
        location.replace(`https://pavan-172.github.io/SpotifyPlaylist/`);
    },3600000);
    document.getElementById('wait').hidden=true;
    document.getElementById('login').hidden=true;
    document.getElementById('content').hidden=false;
    document.getElementById('myplaylists').onclick=async()=>{
        let data=await getuserid(access_token);
        user_id=data.id;
        let url=`https://api.spotify.com/v1/me/playlists?access_token=${access_token}&limit=9&offset=0`;
        getplaylists(url,access_token,user_id,"myplaylist");
        
    }
    document.getElementById('featuredplaylist').onclick=()=>{
        getfeaturedplaylists(access_token,user_id,"featuredplaylist");
    }
    document.getElementById('tracksbutton').onclick=()=>{
        search(access_token,user_id);
    }
    document.getElementById('myplaylists').click();

    

}
else
{
    let redirect_uri="https://pavan-172.github.io/SpotifyPlaylist/";
    let scope="user-read-playback-position user-read-private user-read-email user-library-read user-library-modify user-top-read playlist-read-collaborative playlist-modify-public playlist-modify-private ugc-image-upload user-follow-read user-follow-modify user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played";
    redirect_uri=encodeURIComponent(redirect_uri);
    scope=encodeURIComponent(scope);
    document.getElementById('login').hidden=true;
    document.getElementById('content').hidden=true;
    document.getElementById('wait').hidden=false;
    login(redirect_uri,'token',client_id,scope);
}