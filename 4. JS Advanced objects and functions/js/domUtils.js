var UTIL = (function(u, str) {

    var domm = u.domm = u.domm || {}

    var doc = document

    $ = function(DomElement) {
        if(!singleSelector(DomElement)) {
            try {
                return doc.querySelectorAll(DomElement)
            } catch(err) {
                console.log(err)
            }
        }else {
            if(DomElement.indexOf('#') === 0) {
                try{
                    return [doc.getElementById(DomElement.substring(1, DomElement.length))]
                } catch(err) {
                    console.log(err)
                }
            }else if(DomElement.indexOf('.') === 0) {
                try {
                    return doc.getElementsByClassName(DomElement.substring(1, DomElement.length))
                } catch(err) {
                    console.log(err)
                }
            }else {
                return doc.getElementsByTagName(DomElement)
            }
        }
    }

    var singleSelector = function(elem) {
        let arr = elem.split(' ')
        if(arr.length === 1 && str.numStr(elem, '#') <= 1 && str.numStr(elem, '.') <= 1) {
            return true
        }
        return false
    }

    var eventList = function(de, event, funct) {
        try {
            for(i = 0; i < de.length; i++) {
                de[i].addEventListener(event, funct)
            }
        } catch(err) {
            console.log(err)
        }
    }

    var nodesList = function(list, callback) {
        for(let i = 0; i < list.length, i++;) {
            callback(list[i], i)
        }
    }

    // DOM functionalities
    var addClass = function(de, cls) {
        for(i = 0; i < de.length; i++) {
            if(de[i].classList) {
                de[i].classList.add(cls)
            }else {
                de[i].className = ' ' + cls
            }
        }
    }

    var removeClass = function(de, cls) {
        for(i = 0; i < de.length; i++) {
            if(de[i].classList) {
                de[i].classList.remove(cls)
            }else {
                de[i].classList.replace(/\bcls\b/,'')
            }
        }
    }

    var attribute = function(de, name) {
        let arr = []
        if(de.length > 1) {
            for(i = 0; i <= de.length; i++) {
                arr[i] = de[i].getAttribute('data-' + name)
            }
        }else {
            return de[0].getAttribute(`data-${name}`)
        }
    }

    var setHtml = function(de, html) {
        try {
            for(i = 0; i < de.length; i++) {
                return de[i].innerHtml = html
            }
        }catch(err) {
            console.log(err)
        }
    }

    domm.$ = $
    domm.eventList = eventList
    domm.addClass = addClass
    domm.removeClass = removeClass
    domm.attribute = attribute
    domm.setHtml = setHtml
    domm.nodesList = nodesList

    return u

})(UTIL || {}, STR.string)