package com.justin.examples.service.hono;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import com.google.gson.Gson;
import com.justin.examples.model.MemUsage;
import com.justin.examples.service.IDataService;

/**
 * Data Service Implementation that sends device data to Eclipse Hono MQTT Endpoint
 *
 */
public class HonoDataService implements IDataService {

  private final String mqttHostUrl;
  private final String honoTenant;
  private final String dittoNamespace;
  private final String authId;
  private final String deviceId;
  private final String password;
  private final Map<String, HonoMqttClient> deviceClients = new HashMap<>();
  private final Gson gson = new Gson();

  public HonoDataService(final String mqttHostUrl, final String honoTenant,
      final String dittoNamespace, final String deviceId, final String authId,
      final String password) {
    this.mqttHostUrl = Objects.requireNonNull(mqttHostUrl);
    this.honoTenant = Objects.requireNonNull(honoTenant);
    this.dittoNamespace = Objects.requireNonNull(dittoNamespace);
    this.deviceId = Objects.requireNonNull(deviceId);
    this.authId = Objects.requireNonNull(authId);
    this.password = Objects.requireNonNull(password);
  }

  @Override
  public void publishMemUsage(final String resourceId, final MemUsage data) {
    getConnectedHonoClient(resourceId).send("telemetry",
        gson.toJson(wrap(data, "memUsage")));
  }

  private HonoMqttClient getConnectedHonoClient(final String resourceId) {
    HonoMqttClient client = deviceClients.get(resourceId);
    if (client == null) {
      client = new HonoMqttClient(mqttHostUrl, resourceId, authId, password);
      deviceClients.put(resourceId, client);
    }

    if (!client.isConnected()) {
      client.connect();
    }

    return client;
  }

  private <T> Map<String, Object> wrap(final T properties, final String featureName) {
    final Map<String, Object> value = new HashMap<>();
    value.put("properties", properties);

    final Map<String, Object> headers = new HashMap<>();
    headers.put("response-required", Boolean.FALSE);

    final Map<String, Object> wrapper = new HashMap<>();
    wrapper.put("topic", dittoNamespace + "/" + deviceId + "/things/twin/commands/modify");
    wrapper.put("path", "/features/" + featureName);
    wrapper.put("value", value);
    wrapper.put("headers", headers);

    return wrapper;
  }
}
