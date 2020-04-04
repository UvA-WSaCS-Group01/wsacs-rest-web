const table = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
class Code{
    constructor(){
        this.keys = new Array();
    }

    getSmallestIndex(){
        // TODO: make smarter
        if (this.keys.length == 0)  return 0;
        this.keys.sort((a, b) => a - b);
        return this.keys[this.keys.length - 1] + 1;
    }

    encode(number){
        // max possible number: 9007199254740981
        // can lead to 145277407334531 + 1 long string -> fails for me 
        const N = table.length;
        let code = "";
        let baseval = number;

        while (baseval > 0) {
            let remainder = baseval % N;
            baseval = Math.floor(baseval / N);
            code = table[remainder] + code;
        }
        if (code == "") return "0";
        return code;
    }

    decode(code){
        var i;
        let id = 0;
        const N = table.length;

        for (i = 0; i < code.length; i++ ) {
            let value = table.indexOf(code[i]);
            id += value * Math.pow(N, (code.length - 1) - i)
        }

        return id
    }
}
module.exports = { Code };