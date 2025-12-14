const careerService = require('../services/careerService');
const response = require('../utils/response');

// --- 1. Search by Name Controller ---
exports.searchByName = async (req, res) => {
    try {
        // Extract query param: ?name=Value
        const { name } = req.query; 

        // Validation: Ensure the parameter exists
        if (!name) {
            return response.error(res, 400, 'Query param ?name= is required');
        }

        // Call Service
        const data = await careerService.fetchByFilter('name', name);

        // Handle empty results
        if (!data || data.length === 0) {
            return response.success(res, 200, 'No data found for this name', []);
        }

        // Return success response
        return response.success(res, 200, 'Data found successfully', {
            filter: 'name',
            query: name,
            total: data.length,
            results: data
        });
    } catch (error) {
        // Handle Server/External API errors
        return response.error(res, 502, 'Failed to fetch data', error.message);
    }
};

// --- 2. Search by NIM Controller ---
exports.searchByNim = async (req, res) => {
    try {
        const { nim } = req.query;

        if (!nim) {
            return response.error(res, 400, 'Query param ?nim= is required');
        }

        const data = await careerService.fetchByFilter('nim', nim);

        if (!data || data.length === 0) {
            return response.success(res, 200, 'No data found for this NIM', []);
        }

        return response.success(res, 200, 'Data found successfully', {
            filter: 'nim',
            query: nim,
            total: data.length,
            results: data
        });
    } catch (error) {
        return response.error(res, 502, 'Failed to fetch data', error.message);
    }
};

// --- 3. Search by YMD Controller ---
exports.searchByYmd = async (req, res) => {
    try {
        const { ymd } = req.query;

        if (!ymd) {
            return response.error(res, 400, 'Query param ?ymd= is required');
        }

        const data = await careerService.fetchByFilter('ymd', ymd);

        if (!data || data.length === 0) {
            return response.success(res, 200, 'No data found for this YMD', []);
        }

        return response.success(res, 200, 'Data found successfully', {
            filter: 'ymd',
            query: ymd,
            total: data.length,
            results: data
        });
    } catch (error) {
        return response.error(res, 502, 'Failed to fetch data', error.message);
    }
};