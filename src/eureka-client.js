import Eureka from 'eureka-js-client'

// example configuration
export const eurekaClient = new Eureka({
  // application instance information
  instance: {
    app: 'godreamer',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: { $: 3333, '@enabled': true },
    vipAddress: 'servicediscovery.catalog.com',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    // eureka server host / port
    host: '192.168.42.168',
    port: 8761,
    servicePath: '/eureka/apps',
  },
})
