import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Login } from "./login/Login";
import { Co } from "./Signup/Co";
import { Sign } from "./Signup/Sign";
import { Witness } from "./Signup/info/Witness";
import { Member } from "./Signup/info/Member";
import { Judge } from "./Signup/info/Judge";
import { Homemem } from "./Member/Homemem";
import Homewit from "./Witness/Homewit";
import MemEdit from "./Member/MemEdit";
import WitEdit from "./Witness/WitEdit";
import HomeJud from "./judge/HomeJud";
import JudEdit from "./judge/JudEdit";
import { AUjud } from "./judge/AUjud";
import { Cjud } from "./judge/Cjud";
import { Conjud } from "./judge/Conjud";
import { Conwit } from "./Witness/Conwit";
import { Cwit } from "./Witness/Cwit";
import AUwit from "./Witness/AUwit";
import { Conmem } from "./Member/Conmem";
import { Cmem } from "./Member/Cmem";
import AUmem from "./Member/AUmem";
import { Paymem } from "./Member/Paymem";
import { PaymentWit } from "./components/payment/PaymentWit";
import Profilemem from "./Member/Profilemem";
import Witpro from "./Witness/Witpro";
import ProJud from "./judge/ProJud";
import Searchmem from "./Member/Searchmem";
import Searchwit from "./Witness/Searchwit";
import Searchjud from "./judge/Searchjud";
import Chatmem from "./Member/Chatmem";
import Chatjud from "./judge/Chatjud";
import Chatwit from "./Witness/Chatwit";
import Video from "./components/Video";
import VideoWit from "./Witness/VideoWit";
import MemVideo from "./Member/MemVideo";
import VideoJud from "./judge/VideoJud";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/sign" element={<Sign />}></Route>
        <Route path="/Co" element={<Co />}></Route>

        {/* Member*/}
        <Route path="/mem" element={<Member />}></Route>
        <Route path="/home" element={<Homemem />}></Route>
        <Route path="/memedit" element={<MemEdit />}></Route>
        <Route path="/searchmem" element={<Searchmem />}></Route>

        <Route path="/promem/:accountID" element={<Profilemem/>}></Route>
        
        <Route path="/aumem" element={<AUmem />}></Route>
        <Route path="/cmem" element={<Cmem />}></Route>
        <Route path="/conmem" element={<Conmem />}></Route> 
        <Route path="/paymem" element={<Paymem/>}></Route> 
        <Route path="/chatmem" element={<Chatmem/>}></Route>
        <Route path="/videomem" element={<MemVideo/>}></Route>


        {/* Witness*/}
        <Route path="/wit" element={<Witness />}></Route>
        <Route path="/homewit" element={<Homewit />}></Route>
        <Route path="/witedit" element={<WitEdit />}></Route>
        <Route path="/auwit" element={<AUwit />}></Route>
        <Route path="/cwit" element={<Cwit />}></Route>
        <Route path="/conwit" element={<Conwit />}></Route>        
        <Route path="/paywit" element={<PaymentWit/>}></Route>
        <Route path="/prowit/:accountID" element={<Witpro/>}></Route>
        <Route path="/searchwit" element={<Searchwit />}></Route>
        <Route path="/chatwit" element={<Chatwit/>}></Route>
        <Route path="/videowit" element={<VideoWit/>}></Route>

        {/* Judge*/}
        <Route path="/judge" element={<Judge />}></Route>
        <Route path="/homejud" element={<HomeJud/>}></Route>
        <Route path="/judedit" element={<JudEdit/>}></Route>
        <Route path="/aujud" element={<AUjud />}></Route>
        <Route path="/cjud" element={<Cjud />}></Route>
        <Route path="/conjud" element={<Conjud />}></Route>
        <Route path="/projud/:accountID" element={<ProJud/>}></Route>
        <Route path="/searchjud" element={<Searchjud />}></Route>
        <Route path="/chatjud" element={<Chatjud/>}></Route>
        <Route path="/videojud" element={<VideoJud/>}></Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
