var MAINAPP = (function(app) {
    var jsonObj = {}

    var loadJSON = function(path) {
        var xObj = new XMLHttpRequest()
        xObj.overrideMimeType('application/json')
        xObj.open('GET', path)
        xObj.onreadystatechange = function() {
            if(xObj.readyState == 4) {
                app.jsonObj = JSON.parse(xObj.responseText)
            }
        }
        xObj.send()
    }
    app.jsonObj = jsonObj
    app.loadJSON = loadJSON

    return app
})(MAINAPP || {})