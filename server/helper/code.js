const table = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
class Code{
    constructor(){
        this.numericId = 0;
    }

    getAutoincrementedId(keys){
        let id = this.encode(this.numericId);
        while (keys.includes(id)) {
            if (this.numericId == Number.MAX_SAFE_INTEGER) throw new Error("Reached Id limit");
            this.numericId++;
            id = this.encode(this.numericId);
        }
        return id;
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