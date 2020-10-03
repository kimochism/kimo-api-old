class QueryBuilderService {

    getQuery(name, param, condition = 'like') {
        if (!param) {
            return '';
        }

        const list = param.split(',');

        const variable = condition === 'like' ? '%?%' : '?';
        const query = this.queryBuilder(`${name} ${condition} '${variable}'`, 'OR', list);

        if (query.trim()) {
            return `(${query.trim()})`;
        }

        return '';
    }

    queryBuilder(operation, condition, values) {

        if (!values) {
            return '';
        }

        let query = '';
        for (let i = 0; i < values.length; i++) {
            const tempQuery = `${operation}`.replace('?', values[i].trim());
            query += ` ${tempQuery}`;
            if (i < values.length - 1) {
                query += ` ${condition}`;
            }
        }
        return query;
    }

    getBooleanQuery(value) {
        if (value == 'true' || value == true) {
            return true
        }
        return false;
    }

}

module.exports = QueryBuilderService;
