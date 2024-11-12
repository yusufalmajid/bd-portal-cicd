
export default function ({ i18n, $toast, store }, inject) {
    const truncate = (str, length, right) => { // add elipsis to longtext
        if (str.length > length) {
            if (right) {
                var cS = str.substr(str.length - length)
                return '...' + cS
            }
            var nS = str.substr(0, length);
            return nS + '...';
        }
        return str;
    }

    const fn = (value, decimalPlaces = 0, forcedDecimals = 0) => { // format 1234500 to 1,234,500.00
        let full = value.toString().split('.')
        let decimals = full[1]
        if (decimals && decimals.length > decimalPlaces) {
            decimalPlaces = decimals.length
        }
        let formatted = new Intl.NumberFormat('id-ID', {minimumFractionDigits: 0}).format(value)
        // if (typeof forcedDecimals == 'number') {
        //     const formattedFull = formatted.split('.')
        //     const fNumerals = formattedFull[0]
        //     let fDecimals = formattedFull[1]
        //     if (fDecimals) {
        //         if ( fDecimals.length > forcedDecimals) {
        //             fDecimals = fDecimals.substring(0, forcedDecimals)
        //         }
        //         else {
        //             const shorted = forcedDecimals - fDecimals.length
        //             for (let i = 0; i < shorted; i++) {
        //                 fDecimals += '0'
        //             }
        //         }
        //     }
        //     else {
        //         fDecimals = ''
        //         for (let i = 0; i < forcedDecimals.length; i++) {
        //             fDecimals += '0'
        //         }
        //     }
        //     return `${fNumerals}.${fDecimals}`
        // }
        return formatted
    }

    const formatDateObj = (date) => {
        if (typeof date == 'string' || typeof date == 'number') {
            return new Date(date)
        }
        return date
    }

    const fds = (date) => { // format date style to chosen language. Only shows year, month and date
        let dateObj = formatDateObj(date)
        if (dateObj && isNaN(dateObj.getTime())) { // not valid date object
            return ''
        }
        const options = { year: 'numeric', month: '2-digit', day: '2-digit'}

        const formatted = new Intl.DateTimeFormat('en-GB', options).format(dateObj)
        return formatted
    }

    const fdmny = (date) => { // format date style to chosen language. Only shows year, month and date
        let dateObj = formatDateObj(date)
        if (dateObj && isNaN(dateObj.getTime())) { // not valid date object
            return ''
        }
        const options = { year: 'numeric', month: 'long'}

        const formatted = new Intl.DateTimeFormat('en-GB', options).format(dateObj)
        return formatted
    }

    const fdl = (date) => { // format date style to chosen language. Shows full date and time
        let dateObj = formatDateObj(date)
        if (dateObj && isNaN(dateObj.getTime())) { // not valid date object
            return ''
        }
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true}
        
        const formatted = new Intl.DateTimeFormat('en-GB', options).format(dateObj)
        return formatted.replace(",", "").replace(" 0:", " 12:").toUpperCase()
    }

    const randomId = (length = 4, isSymbol = false) => {
        var chars = '0123456789ABCDEFGHJKMNOPQRSTUVWXYZabcdefghkmnopqrstuvwxyz';
        var symbol = "@#$&!"
        var str = '';
        for (var i = 0; i < length; i++) {
            // if(i == Math.floor(length/2)) {
            //     str += symbol.charAt(Math.floor(Math.random() * symbol.length))
            // }
            str += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        if(isSymbol) str += symbol.charAt(Math.floor(Math.random() * symbol.length));
        return str;
    }

    const getPlatform = () => {
        var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
        var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isiOS) {
            return 'iOS'
        } else if (isAndroid) { // android
            return 'Android'
        } else { // web iframe
            return 'Desktop'
        }
    }

    const strip = (str) => {
        if (typeof str != 'string') return str
        // var linkRegex = new RegExp(/(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2,}))(:[0-9]{1,5})?(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)/gi);
        str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
        /*  var linkMatches = str.match(linkRegex);
         if (linkMatches && linkMatches.length > 0) {
             linkMatches.forEach(l => {
                 var rl = l;
                 if (l.indexOf('//') < 0)  rl = '//' + l;
                 str = str.replace(l, `<a href="${rl}" target="_blank">${l}</a>`);
             });
         } */
        return str
    }

    const fdlTimeZone = (date, timezone = null, second = false, time = true) => { // format date style to give timezone. Shows full date and time
        let dateObj = formatDateObj(date)
        if (dateObj && isNaN(dateObj.getTime())) { // not valid date object
            return ''
        }
        var options = { year: 'numeric', month: '2-digit', day: '2-digit' }
        if (time) {
            options = { ...options, hour: '2-digit', minute: 'numeric', hour12: true }
        }
        if (timezone) {
            options = { ...options, timeZone : timezone }
        }
        if (second) {
            options = { ...options, second: 'numeric' }
        }

        const formatted = new Intl.DateTimeFormat('en-GB', options).format(dateObj)
        return formatted.replace(",", "").replace(" 0:", " 12:").toUpperCase()
    }

    const formatError = (err, isTable) => {
        var e = {}

        if(isTable) {
            let rErr = err[Object.keys(err)[0]][0]
            $toast(false, rErr)

            return rErr
        }

        if (typeof err == 'string') {
            $toast(false, err)
        } else {
            Object.keys(err).forEach((v, k) => {
                if (typeof err[v] == 'string') {
                    e[v] = err[v]
                } else {
                    e[v] = err[v][0]
                }
            });
        }

        return e
    }

    const formatNum = (num, dec, round) => {
        num = parseFloat(num);
        if(round) {
            num = num.toFixed(dec);
        }
        num += '';
        var splitNumber = num.split('.');
        var firstNumber = splitNumber[0];
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(firstNumber)) {
            firstNumber = firstNumber.replace(rgx, '$1' + ',' + '$2');
        }
        if (splitNumber[1]) {
            var secondNumber = splitNumber[1];
            if(!dec && dec!=0) {
                dec = secondNumber.length;
            }
        } else {
            var secondNumber = "00000000";
        }
        if(!dec) {
            dec=0;
        }
        var splitSecondNumber = (""+secondNumber).split("");
        if (splitSecondNumber.length < dec) {
            for (var i = splitNumber[1].length; i < dec; i++) {
                splitSecondNumber.push("0");
            }
        }
        var decimalNumber = [];
        splitSecondNumber.forEach(function(v, k){
            if (k < dec) {
                var pushTheNumber = v;
                decimalNumber.push(pushTheNumber);
            }
        });
        var joinSecondNumber = decimalNumber.join("");
        if (dec == 0) {
            var actualNumber = firstNumber;
        } else {
            var actualNumber = firstNumber + "." + joinSecondNumber;
        }
        return actualNumber;
    }

    const nFormatter = (num, digits = 0) => {
        if (isNaN(num)) return "0"

        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" },
        ]
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
        var item = lookup.slice().reverse().find(item => {
            return num >= item.value
        })
        // return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0"
        return item ? formatNum(formatNum((num / item.value), digits).replace(",", "").replace(rx, "$1")) + item.symbol : "0"
    }

    const encryptTxt = (text) => {
        if(!text) {
            return ''
        }
        text=text.toString()
        const salt = 'stlry';
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
        const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    
        return text.split('')
          .map(textToChars)
          .map(applySaltToChar)
          .map(byteHex)
          .join('');
    };

    const decryptTxt = (encoded) => {
        if(!encoded) {
            return ''
        }
        encoded=encoded.toString()
        const salt = 'stlry';
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
        
        return encoded.match(/.{1,2}/g)
          .map(hex => parseInt(hex, 16))
          .map(applySaltToChar)
          .map(charCode => String.fromCharCode(charCode))
          .join('');
    };

    const btnDisable = async (elem, text = false) => {
        const button = document.querySelector(elem);
        button.disabled = true;
        if (text) {
            button.innerHTML = text;
        } 
        // else {
        //     button.innerHTML = `<div class="spinner-border spinner-border-sm text-white" role="status">
        //                             <span class="visually-hidden">Loading...</span>
        //                         </div>`;
        // }
    }

    const btnEnable = async (elem, text = false) => {
        const button = document.querySelector(elem);
        button.disabled = false;
        if (text) {
            button.innerHTML = text;
        } 
        // else {
        //     button.innerHTML = text;
        // }
    }

    const keyboardClick = (e) => {
        if (["Space", "Enter"].indexOf(e.code) > -1) {
            e.target.click();
        }
        return true
    }

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            $toast(true, "Copied: " + text);
        } catch ($e) {
            $toast(false, 'Cannot copy: ' + $e);
        }
    }

    const isValidUrl = (url) => {
        try {
            new URL(url);
        } catch (e) {
            return false;
        }
        return true;
    }

    const createFilter = (filter) => {
        filter = { ...filter }

        for (let f in filter) {
            if (!String(filter[f]).trim()) delete filter[f]
        }

        return filter
    }

    const noNumInput = (input) => {
        return String(input).replaceAll(/[0-9]/g, "")
    }

    const numInput = (input) => {
        return String(input).replaceAll(/[^0-9]/g, "")
    }

    const csvExport = (arrayOfJson, filename, customHeader) => {
        // convert JSON to CSV
        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(arrayOfJson[0])
        let csv = arrayOfJson.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        if(customHeader) {
            if(customHeader.length) {
                if(typeof customHeader[0] == 'string') {
                    csv.unshift(customHeader.join(','))
                }else if(typeof customHeader[0] == 'object') {
                    customHeader.slice().reverse().map((v,k) => {
                        csv.unshift(v.join(','))
                    })
                }
            }
        }else{
            csv.unshift(header.join(','))
        }
        csv = csv.join('\r\n')
        // console.log(csv)
      
        // Create link and download
        var link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
        link.setAttribute('download', (filename || 'export')+'.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportDownload = (filedata, filename = 'export', extension = 'xlsx') => {
        if (!filedata) return

        // Create link and download
        var link = document.createElement('a');
        link.setAttribute('href', filedata);
        link.setAttribute('download', filename + '.' + extension);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const checkSideBarPermission = (perm, permList) => {
        // return true
        if (!perm || !permList || !permList.length) return false

        let perms = store.state.user.permission_list // permList.filter(i => ["1", "2"].indexOf(String(i.level)) > -1)
        if (perms.length) {
            let target = perms.filter(i => String(i.name) == perm)
            if (target.length) {
                return true
            }
        }

        return false
    }

    const getSideBarPermissionId = (perm, permList) => {
        // return 1
        if (!perm || !permList || !permList.length) return null

        let perms = store.state.user.permission_list // permList.filter(i => ["1", "2"].indexOf(String(i.level)) > -1)
        if (perms.length) {
            let target = perms.filter(i => String(i.name) == perm)
            if (target.length) {
                return target[0].id || null
            }
        }

        return null
    }

    const checkPerm = (perm) => {
        return true;
        if (!perm) return false

        let permList = store.state.user.permission_list
        // console.log(permList)
        let finalTarget = permList.filter(i => String(i.name) == perm)
        if (finalTarget.length) {
            return true
        }

        return false
    }

    const decimalInput = (input, decimal = 2, allowNegative = false) => {
        let regex = new RegExp(`^\-?[0-9]+\.?[0-9]{0,${decimal}}`, "g")
        input = input.match(regex)

        if (input && input.length) {
            return allowNegative ? input[0] : (Number(input[0]) >= 0 ? input[0] : "0")
        }

        return ""
    }

    const dateOptionsFormat = (date, options = { year: 'numeric', month: '2-digit', day: '2-digit' }, format = "en-GB") => { // format date style to give timezone. Shows full date and time
        let dateObj = formatDateObj(date)
        if (dateObj && isNaN(dateObj.getTime())) { // not valid date object
            return ''
        }

        return new Intl.DateTimeFormat(format, options).format(dateObj)
    }

    function ordinalSuffix(i) {
        let j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return i + "st";
        }
        if (j === 2 && k !== 12) {
            return i + "nd";
        }
        if (j === 3 && k !== 13) {
            return i + "rd";
        }
        return i + "th";
    }

    inject('formatDateObj', formatDateObj)
    inject('fdmny', fdmny)
    inject('fds', fds)
    inject('fdl', fdl)
    inject('fn', fn)
    inject('truncate', truncate)
    inject('randomId', randomId)
    inject('getPlatform', getPlatform)
    inject('strip', strip)
    inject('formatNum', formatNum)
    inject('nFormatter', nFormatter)
    inject('formatError', formatError)
    inject('encryptTxt', encryptTxt)
    inject('decryptTxt', decryptTxt)
    inject('btnDisable', btnDisable)
    inject('btnEnable', btnEnable)
    inject('copyToClipboard', copyToClipboard)
    inject('keyboardClick', keyboardClick)
    inject('isValidUrl', isValidUrl)
    inject('createFilter', createFilter)
    inject('noNumInput', noNumInput)
    inject('numInput', numInput)
    inject('csvExport', csvExport)
    inject('exportDownload', exportDownload)
    inject('fdlTimeZone', fdlTimeZone)
    inject('checkSideBarPermission', checkSideBarPermission)
    inject('getSideBarPermissionId', getSideBarPermissionId)
    inject('checkPerm', checkPerm)
    inject('decimalInput', decimalInput)
    inject('dateOptionsFormat', dateOptionsFormat)
    inject('ordinalSuffix', ordinalSuffix)
};
