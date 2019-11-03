FROM openjdk:8-jre
LABEL maintainer Justin Nguyen <justin.dan.nguyen@gmail.com>
EXPOSE 80
ENTRYPOINT ["java", "-jar", "/usr/share/justin.jar"]

ARG JAR_FILE
ADD target/xdk-api-0.0.1-SNAPSHOT.jar /usr/share/justin.jar