/**
 *
 * @param value
 * @returns {*}
 */
export const stringCorrection = (value) => {
    if (value == null) {
        return;
    }
    return value.replace(/\r?\n/g, '\r\n');
};

