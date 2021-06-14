module.exports {
  ssl: {
    enable: true,
    privateKeyPath: '/etc/letsencrypt/live/sneaky-shop.ml/privkey.pem',
    certificatePath: '/etc/letsencrypt/live/sneaky-shop.ml/cert.pem',
    chainFilePath: '/etc/letsencrypt/live/sneaky-shop.ml/chain.pem',
  },
  database: {
    host: 'localhost',
    user: 'root',
    password: 'FronG12345A',
    database: 'shop',
    port: '3306',
  },
}
