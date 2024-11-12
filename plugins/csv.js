export default function ({$api}, inject) {
    const getData = async(api) => {
        let list = []
        const res = await $api(api, {limit: 500, page: 1})
        if (!res.status) {
            return {
                status: false
            }
        }
        list = res.data
        if (res.pagination.last_page != 1) {
            for (let p = 2; p <= res.pagination.last_page; p++) {
                let cres = await $api(api, {limit: 500, page: p})
                if (cres.status) {
                    list = [...list, ...cres.data]
                }
            }
        }
        return {
            status: true,
            data: list
        }
    }

    const csv = async (opt) => {
        var info = opt.rows
        info.unshift(opt.columns);
        const replacer = (k, v) => v === null ? '' : v;
        const header = Object.keys(info[0]);
        let csv = info.map(o => header.map(fn => JSON.stringify(o[fn], replacer)).join(','));
        csv = csv.join('\r\n');
        var downloadLink = document.createElement('a');
        var blob = new Blob(["\ufeff", csv]);
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = opt.filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

    }

    const exportCSV = async (api, opt) => {
        const listData = await getData(api)
        if (!listData.status) {
            return false
        }

        let rows = []
        listData.data.forEach(l => {
            let rowArray = []
            opt.rows.forEach(f => {
                rowArray.push(l[f])
            })
            rows.push(rowArray)
        })

        csv({
            columns: opt.columns,
            rows: rows,
            filename: opt.filename
        })
        return true
    }

    inject('csv', exportCSV);
}
