const axios = require('axios');

const EXTERNAL_URL = 'http://ogienurdiana.com/career/ecc694ce4e7f6e45a5a7912cde9fe131';

exports.fetchByFilter = async (field, value) => {
    try {
        // 1. FETCH LANGSUNG (REALTIME)
        const response = await axios.get(EXTERNAL_URL, { timeout: 10000 });
        
        let body = response.data;
        
        if (typeof body === 'string') {
            try { body = JSON.parse(body.trim()); } catch (e) { return []; }
        }

        const rawStringData = body.DATA;
        if (!rawStringData) return [];

        // 2. PARSING )
        const rows = rawStringData.split(/\r?\n/);
        const formattedData = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].trim();
            if (!row) continue;
            
            const columns = row.split('|');
            
            if (columns.length >= 3) {
                formattedData.push({
                    ymd: columns[0].trim(),
                    nim: columns[1].trim(),
                    name: columns[2].trim()
                });
            }
        }

        // 3. FILTERING
        if (!value) return formattedData;

        const searchInput = value.toString().toLowerCase().trim();

        return formattedData.filter(item => {
            const itemValue = item[field];
            if (!itemValue) return false;
            
            return itemValue.toString().toLowerCase().includes(searchInput);
        });

    } catch (error) {
        console.error("External API Error:", error.message);
        throw new Error('Gagal mengambil data dari server eksternal (Realtime Fetch Failed).');
    }
};