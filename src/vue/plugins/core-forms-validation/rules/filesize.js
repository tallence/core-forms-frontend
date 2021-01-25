/**
 * additional validator for file uploads: the uploaded file has a minimum file size
 *
 * @type {{params: [{cast: function(*=): number, name: string}], validate: file_size_min.validate}}
 */
export const file_size_min = {
    validate: function (files, _a) {
        let size = _a.size;
        if (isNaN(size)) {
            return false;
        }
        let nSize = size * 1024;
        if (!Array.isArray(files)) {
            return files.size >= nSize;
        }
        for (let i = 0; i < files.length; i++) {
            if (files[i].size < nSize) {
                return false;
            }
        }
        return true;
    },
    params: [
        {
            name: 'size',
            cast: function (value) {
                return Number(value);
            }
        }
    ]
};
