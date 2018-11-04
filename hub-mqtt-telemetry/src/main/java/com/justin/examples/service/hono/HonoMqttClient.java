package com.justin.examples.service.hono;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.util.Objects;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManagerFactory;

import org.apache.log4j.Logger;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

/**
 * MQTTv3 Client based on Eclipse Paho
 *
 */
public class HonoMqttClient {
	private static final Logger logger = Logger.getLogger(HonoMqttClient.class);

  private static final URL CERTIFICATE_LOCATION =
      HonoMqttClient.class.getResource("/certificate/iothub.crt");

	private static SSLSocketFactory buildSslSocketFactory(final URL certificateUrl) {
		try {

			final CertificateFactory certFactory = CertificateFactory.getInstance("X.509");

			final InputStream certificateInputstream = new BufferedInputStream(Objects.requireNonNull(certificateUrl).openStream());
			Certificate certificate;
			try {
				certificate = certFactory.generateCertificate(certificateInputstream);
			} finally {
				certificateInputstream.close();
			}

			// Create a KeyStore containing our trusted CAs
			final KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
			keyStore.load(null, null);
			keyStore.setCertificateEntry("ca", certificate);

			// Create a TrustManager that trusts the CAs in our KeyStore
			final TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
			tmf.init(keyStore);

			// Create an SSLContext that uses our TrustManager
			final SSLContext context = SSLContext.getInstance("TLS");
			context.init(null, tmf.getTrustManagers(), null);
			return context.getSocketFactory();

		} catch (NoSuchAlgorithmException | KeyStoreException | KeyManagementException | CertificateException | IOException e) {
			logger.error("Error building ssl socket factory", e);
		}

		return null;
	}
	private final String mqttHostUrl;
	private final String clientId;
	private MqttClient mqttClient = null;

	private MqttConnectOptions connOpts = null;

	public HonoMqttClient(final String mqttHostUrl, final String clientId, final String authId, final String password) {
		this.mqttHostUrl = Objects.requireNonNull(mqttHostUrl);
		this.clientId = Objects.requireNonNull(clientId);

		try {
			logger.info(String.format("Creating Hub Client for [%s] with Client Id [%s]", mqttHostUrl, clientId));
			mqttClient = new MqttClient(mqttHostUrl, clientId, new MemoryPersistence());

			connOpts = new MqttConnectOptions();
			connOpts.setUserName(authId);
			connOpts.setPassword(password.toCharArray());
			connOpts.setSocketFactory(buildSslSocketFactory(CERTIFICATE_LOCATION));
		} catch (final MqttException e) {
			logger.error("Exception connecting to Hono", e);
			throw new RuntimeException(e);
		}
	}

	public void connect() {
		try {
			logger.info("Connecting to Hono.");
			final IMqttToken token = mqttClient.connectWithResult(connOpts);

			token.setActionCallback(new IMqttActionListener() {
				@Override
				public void onFailure(final IMqttToken arg0, final Throwable arg1) {
					logger.error("Failed to connect to Hono [" + mqttHostUrl + ", " + clientId + "]", arg1);
				}

				@Override
				public void onSuccess(final IMqttToken arg0) {
					logger.info("Connected to Hono [" + mqttHostUrl + ", " + clientId + "]");
				}
			});
			logger.info("Hono Client CONNECTED.");
		} catch (final MqttException e) {
			throw new RuntimeException(e);
		}
	}

	public boolean isConnected() {
		return mqttClient != null && mqttClient.isConnected();
	}

	public void send(final String topic, final String message) {
		if (mqttClient != null) {
			if (mqttClient.isConnected()) {
				try {
					logger.info(String.format("Sending topic [%s] message [%s]", topic, message));
					mqttClient.publish(topic, message.getBytes(), 0, false);
					logger.info(String.format("Send done."));
				} catch (final MqttException e) {
					logger.error("MQTT Client has error in sending message.", e);
				}
			} else {
				logger.error("Mqtt Client is not connected.");
				throw new RuntimeException("MQTT Client is not connected.");
			}
		} else {
			logger.error("Mqtt Client is not initialized.");
			throw new RuntimeException("MQTT Client is not initialized.");
		}
	}
}

