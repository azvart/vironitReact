const common={
    getInitialsFromName: (name:any)=>{
        const letters = String(name)
        .split(' ')
        .map((i)=>i.charAt(0));
        return letters.join('');
    }
}


export default common;
 
