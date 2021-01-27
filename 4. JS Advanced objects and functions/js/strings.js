var STR = (function(s) {

    var sub = s.string = s.string || {}

    var numStr = function(str, char) {
        return (str.split(char).length - 1)
    } 

    var breakString = function(str, del) {
        var strR = str.split(del)
        return strR.map(value => {
            return value.trim()
        })
    }

    sub.numStr = numStr
    sub.breakString = breakString

    return s

})(STR || {})