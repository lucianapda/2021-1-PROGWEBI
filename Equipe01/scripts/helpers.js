

function getUrlParameter(parameterName) {
    let url = window.location.href;

    if (!url.includes("?"))
        return null;

    url = url.split("?")[1];

    parameters = url.split("=");
    return parameters.map((parameter, index) => {
        if (parameter == parameterName)
            return parameters[index + 1];
    });
}

function redirect(path) {
    window.location = ROOT_URL + "/" + path;
}