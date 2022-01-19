let s = "saa ()   ss sada"
        for (let i = 0; i < s.length; i++) {
            if(s.charAt(i) ===" "){
            s = s.slice(0,i)
            return
        }
        }
    console.log(s);