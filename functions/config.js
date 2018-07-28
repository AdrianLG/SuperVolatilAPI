var developmentConfig = {
    mysqlConnection: {
        host: '107.180.54.179',
        user: 'supervolatil',
        password: 'volatil$2018',
        database: 'anubiscorp_db_godaddy'
    },
    authorizedAdministrators: [
        {
            id: 'supervolatil@anubiscorp.com.mx',
            uid: 'aZg1mISsYRSTjRv6FfuO5B9FNBp2'
        },
        {
            id: 'alogo.anubiscorp@gmail.com',
            uid: 'PENbmiTg4VXJJzGuL9lcWRx8HPO2'
        }
    ]
};

var productionConfig = developmentConfig;

module.exports = productionConfig;