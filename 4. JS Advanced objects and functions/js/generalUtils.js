var GEN = (function(g) {

    var gen = g.gen = g.gen || {}

    var getDom = function(funct) {
        document.addEventListener('DOMContentLoaded', function() {
            if(typeof funct === 'function') funct()
        })
    }

    gen.getDom = getDom

    return g
})(GEN || {})