import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');      body{
        padding:0;
        margin:0;
        font-family: "Poppins", sans-serif;
        background-color: #eee;
      }

`
export default function App({ Component, pageProps }) {
  return (

    <>
    <GlobalStyle/>
    <CartContextProvider><Component {...pageProps} /></CartContextProvider>
    
    </>
  
  )
 
   


}
