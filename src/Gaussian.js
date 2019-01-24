

// https://github.com/ollyoechsle/DynaJS/blob/master/web/javascript/lang/math.gaussian.js

function makeGaussian(mean, standardDeviation, maxHeight) {

    mean = defaultTo(mean, 0.0);
    standardDeviation = defaultTo(standardDeviation, 1.0);
    maxHeight = defaultTo(maxHeight, 1.0);

    return function getNormal(x) {
        return maxHeight * Math.pow(Math.E, -Math.pow(x - mean, 2) / (2 * (standardDeviation * standardDeviation)));
    }

    function defaultTo(value, defaultValue) {
        return isNaN(value) ? defaultValue : value;
    }

}

export default makeGaussian
