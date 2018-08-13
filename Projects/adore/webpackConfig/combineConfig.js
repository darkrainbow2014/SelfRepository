module.exports = combineConfig;

/**
 * 负责合并webpack的config,Object实现覆盖,List则会append
 * @param {Object} originObject object1
 * @param {Object} incomingObject object2
 * @return {Object}
 */
function combineConfig(originObject, incomingObject) {
    for (const key in incomingObject) {
        const originValue = originObject[key];
        const incomingValue = incomingObject[key];
        if (sameType(originValue, incomingValue)) {
            if (isObject(incomingValue)) {
                combineConfig(originValue, incomingValue);
            } else if (isArray(incomingValue)) {
                originObject[key] = originValue.concat(incomingValue);
            } else {
                originObject[key] = incomingValue;
            }
        } else {
            originObject[key] = incomingValue;
        }
    }
    return originObject;
}

/**
 * 判断两个instance是否相同是相同类型
 * @param {Object} a
 * @param {Object} b
 * @return {boolean}
 */
function sameType(a, b) {
    return a && b && a.constructor === b.constructor;
}

/**
 * 判断instance是否是Object(json)
 * @param {Object} instacne
 * @return {boolean}
 */
function isObject(instacne) {
    const objectConstructor = {}.constructor;
    return instacne && instacne.constructor === objectConstructor;
}

/**
 * 判断instance是否是Array
 * @param {Object} instacne
 * @return {boolean}
 */
function isArray(instacne) {
    const arrayConstructor = [].constructor;
    return instacne && instacne.constructor === arrayConstructor;
}