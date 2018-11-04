package com.justin.examples;

import org.apache.log4j.Logger;

import com.justin.examples.model.MemUsage;
import com.justin.examples.service.hono.HonoDataService;

/**
 * Example App that uses the Hono Data Service by sending random data to Eclipse Hono MQTT Connector
 */
public class PcApp {

  private static final Logger LOGGER = Logger.getLogger(PcApp.class);

  /**************************************************************************/
  /* Configuration Section */
  /* Adjust according to your Endpoint Configuration */
  /**************************************************************************/

  // Hono MQTT Endpoint
  private static final String MQTT_ENDPOINT = "ssl://mqtt.bosch-iot-hub.com:8883";

  // Your Tenant
  private static final String HONO_TENANT = "t9ac40ab98d154c3ea2bd38104fc97ace";

  // Your DeviceId
  private static final String DEVICE_ID = "pc01";

  // Device authentication ID
  private static final String AUTH_ID = "pc01@t9ac40ab98d154c3ea2bd38104fc97ace";

  // Ditto Namespace
  private static final String DITTO_NAMESPACE = "com.justin.examples";

  // Device authentication Password
  private static final String PASSWORD = System.getenv("DEVICE_PASSWORD");

  private static final long SEND_INTERVAL_IN_SECONDS = 2;

  public static void main(final String... args) {
    final HonoDataService honoDataService = new HonoDataService(MQTT_ENDPOINT, HONO_TENANT,
        DITTO_NAMESPACE, DEVICE_ID, AUTH_ID, PASSWORD);

    while (true) {
      honoDataService.publishMemUsage(DEVICE_ID, readMemUsage());
      try {
        Thread.sleep(SEND_INTERVAL_IN_SECONDS * 1000);
      } catch (final InterruptedException e) {
        LOGGER.error(e);
      }
    }
  }

  private static MemUsage readMemUsage() {
    final Runtime runtime = Runtime.getRuntime();
    final long free = runtime.freeMemory();
    final long total = runtime.totalMemory();
    final float usage = total - free;

    final MemUsage memUsage = new MemUsage();
    memUsage.setFree(free);
    memUsage.setTotal(total);
    memUsage.setPercentUsage(usage / total * 100);
    return memUsage;
  }
}
