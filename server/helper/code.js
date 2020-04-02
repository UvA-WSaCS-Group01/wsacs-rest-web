const table = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

module.exports = {
    encode: function(number){
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
    },

    decode: function(code) {
        var i;
        let id = 0;
        const N = table.length;

        for (i = 0; i < code.length; i++ ) {
            let value = table.indexOf(code[i]);
            id += value * Math.pow(N, (code.length - 1) - i)
        }

        return id
    }

};