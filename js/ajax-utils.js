(function (global){

    // Set up a namespace
    var ajaxUtils = {};

    // Returns an HTTP request object
    function getRequestObject(){  
        if (window.XMLHttpRequest){         //este es el importante
            return (new XMLHttpRequest());
        }
        else if (window.ActiveXObject){
            // Para browser antiguos
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }
        else{
            // Solo porseaca, nunca pasara tho
            global.alert("Ajax is not supported!");
            return(null);
        }
    }

    
    // AJAX GET request to 'requestUrl'
    ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse){
        var request = getRequestObject(); //utilizamos la funcion anterior
        request.onreadystatechange = function () {
            handleResponse(request, responseHandler, isJsonResponse);
        };
        request.open("GET", requestUrl, true);
        request.send(null); //For POST only
    };

    // Only calls user provided 'responseHandler'
    // function if response is ready
    // and not an error
    function handleResponse(request, responseHandler, isJsonResponse){
        if((request.readyState == 4) && (request.status == 200)){ //estas condiciones siempre seran asi, status=200 es que todo va gucci
            // Default to isJsonResponse = true
            if (isJsonResponse == undefined){
                isJsonResponse = true;
            }
            if (isJsonResponse){
                responseHandler(JSON.parse(request.responseText));
            }
            else{
                responseHandler(request.responseText);
            } 
        } 
    }

    // Expose utility to the global object
    global.$ajaxUtils = ajaxUtils;

})(window);